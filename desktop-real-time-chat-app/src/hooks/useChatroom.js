import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query';
import { useEffect, useRef, useCallback, useContext } from 'react';
import getSocket from '../socket';
import AuthContext from '../authContext';

const fetchChatroom = async (ids) => {
  const token = sessionStorage.getItem('token');

  // Don't make API calls for invalid IDs
  if (!ids) return null;

  const body = Array.isArray(ids) ? { ids } : { id: ids };

  const res = await fetch('http://localhost:3000/api/fetchchat', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) throw new Error('Failed to fetch chat room');
  return res.json();
};

export const useChatroom = (chatId) => {
  const queryClient = useQueryClient();
  const socketListenerActive = useRef(false);
  const previousChatId = useRef(chatId);
  const processedMessages = useRef(new Set()); // Track processed message IDs
  const tempMessageMap = useRef(new Map()); // Track temporary messages to real messages
  
  // Get current user from auth context for improved message handling
  const { user } = useContext(AuthContext);
  
  // Create a stable mutation function reference that won't change on renders
  const updateChatData = useMutation({
    mutationFn: (newData) => {
      // Update the query data without triggering a refetch
      queryClient.setQueryData(['chatRoom', chatId], (oldData) => {
        if (!oldData) return newData;
        
        // Filter out any messages we've already processed
        const uniqueNewMessages = newData.newMessages.filter(message => {
          // Skip if we've already processed this message ID
          if (message._id && processedMessages.current.has(message._id)) {
            return false;
          }
          
          // If this message matches a temporary message we added optimistically,
          // we'll want to replace the temp message rather than add a new one
          let isReplacementForTemp = false;
          let tempIdToReplace = null;
          
          // Check all temp messages to find a match based on content + user + time proximity
          for (const [tempId, tempMsg] of tempMessageMap.current.entries()) {
            if (tempMsg.userId === message.userId && 
                tempMsg.message === message.message && 
                Math.abs(new Date(tempMsg.time) - new Date(message.time)) < 10000) { // Within 10 seconds
              isReplacementForTemp = true;
              tempIdToReplace = tempId;
              break;
            }
          }
          
          // If we found a match, add the ID to processed set but still return true so we replace it
          if (isReplacementForTemp && tempIdToReplace) {
            // Add server message ID to processed set
            if (message._id) {
              processedMessages.current.add(message._id);
              
              // Store the mapping from temp ID to server ID
              tempMessageMap.current.set(tempIdToReplace, message);
              
              // Clean up the mapping after some time
              setTimeout(() => {
                tempMessageMap.current.delete(tempIdToReplace);
              }, 10000);
            }
          }
          
          // Also check for exact content/time-based duplication with existing messages
          const isDuplicate = oldData.chat?.some(existingMsg => 
            (existingMsg._id === message._id) ||
            (!isReplacementForTemp && // Skip this check if we already found it's a replacement
             existingMsg.message === message.message && 
             existingMsg.userId === message.userId &&
             Math.abs(new Date(existingMsg.time) - new Date(message.time)) < 5000) // Within 5 seconds
          );
          
          if (isDuplicate && !isReplacementForTemp) {
            // It's a duplicate and not a replacement for a temp message
            if (message._id) {
              processedMessages.current.add(message._id);
            }
            return false;
          }
          
          // If we get here and it's not a replacement, add to processed set
          if (!isReplacementForTemp && message._id) {
            processedMessages.current.add(message._id);
            
            // Clean up the set after some time to prevent memory leaks
            setTimeout(() => {
              processedMessages.current.delete(message._id);
            }, 10000); // Clear after 10 seconds
          }
          
          return true;
        });
        
        if (uniqueNewMessages.length === 0) {
          return oldData; // No changes needed
        }
        
        // Process new messages to ensure they have proper user data
        const processedUniqueMessages = uniqueNewMessages.map(message => {
          // If the message doesn't have full user data
          if (!message.user || typeof message.user !== 'object') {
            // If we can identify the sender as the current user
            if (message.userId === user?._id || message.sender === user?._id) {
              return {
                ...message,
                user: {
                  _id: user._id,
                  firstName: user.firstName || '',
                  lastName: user.lastName || '',
                  name: user.name || '',
                  avatar: user.avatar || '/default-avatar.png'
                }
              };
            }
            // If we can find the user in participants
            else if (oldData.participants) {
              const otherUser = oldData.participants.find(
                participant => participant._id === message.userId || participant._id === message.sender
              );
              
              if (otherUser) {
                return {
                  ...message,
                  user: {
                    _id: otherUser._id,
                    firstName: otherUser.firstName || '',
                    lastName: otherUser.lastName || '',
                    name: otherUser.name || '',
                    avatar: otherUser.avatar || '/default-avatar.png'
                  }
                };
              }
            }
          }
          return message;
        });
        
        // Replace any temporary messages with their real server equivalents
        let newChat = [...(oldData.chat || [])];
        
        if (uniqueNewMessages.some(m => tempMessageMap.current.has(m._id))) {
          // Find and replace temporary messages with their permanent versions
          newChat = newChat.map(existingMessage => {
            // If this is a temporary message that we now have a server version for
            const serverMessage = tempMessageMap.current.get(existingMessage._id);
            if (serverMessage) {
              return serverMessage; // Replace with the server message
            }
            return existingMessage; // Keep existing message as is
          });
        } else {
          // Just append the new messages
          newChat = [...newChat, ...processedUniqueMessages];
        }
        
        return {
          ...oldData,
          chat: newChat
        };
      });
    }
  });
  
  // Register a temporary message (called from MessageInput.jsx)
  const registerTempMessage = useCallback((tempId, messageData) => {
    tempMessageMap.current.set(tempId, messageData);
  }, []);
  
  // Create a stable callback that won't change on renders
  const handleNewMessage = useCallback((data) => {
    if (data.chatId === chatId && data.newMessages?.length) {
      // Use the mutation to update data without causing additional renders
      updateChatData.mutate({ newMessages: data.newMessages });
    }
  }, [chatId, updateChatData]);
  
  // Set up socket listeners for the specific chat - with improved deps
  useEffect(() => {
    if (!chatId) return;
    
    // Skip setting up a new listener if we already have one for this chatId
    if (socketListenerActive.current && previousChatId.current === chatId) {
      return;
    }
    
    const socket = getSocket();
    
    // Remove previous listeners if chatId changed
    if (previousChatId.current && previousChatId.current !== chatId) {
      socket.off('new_message');
      // Clear processed messages when changing chats
      processedMessages.current.clear();
      tempMessageMap.current.clear();
    }
    
    // Listen for new messages
    socket.on('new_message', handleNewMessage);
    socketListenerActive.current = true;
    previousChatId.current = chatId;
    
    // Clean up listeners
    return () => {
      socket.off('new_message', handleNewMessage);
      socketListenerActive.current = false;
    };
  }, [chatId, handleNewMessage]);
  
  // Return both the query and the function to register temporary messages
  const result = useQuery({
    queryKey: ['chatRoom', chatId],
    queryFn: () => fetchChatroom(chatId),
    enabled: !!chatId, // Only run the query if we have a chatId
    staleTime: 30000, // Increase stale time to reduce refetches
    refetchOnWindowFocus: false, // Don't refetch when window regains focus
    refetchOnMount: 'if-needed', // Only refetch on mount if data is stale
    refetchOnReconnect: false, // Don't refetch on reconnect
    retry: false, // Don't retry failed requests automatically
  });
  
  return {
    ...result,
    registerTempMessage
  };
};