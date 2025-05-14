import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query';
import { useEffect, useRef, useCallback } from 'react';
import getSocket from '../socket';

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
  
  // Create a stable mutation function reference that won't change on renders
  const updateChatData = useMutation({
    mutationFn: (newData) => {
      // Update the query data without triggering a refetch
      queryClient.setQueryData(['chatRoom', chatId], (oldData) => {
        if (!oldData) return newData;
        return {
          ...oldData,
          chat: [...(oldData.chat || []), ...newData.newMessages]
        };
      });
    }
  });
  
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
  
  return useQuery({
    queryKey: ['chatRoom', chatId],
    queryFn: () => fetchChatroom(chatId),
    enabled: !!chatId, // Only run the query if we have a chatId
    staleTime: 30000, // Increase stale time to reduce refetches
    refetchOnWindowFocus: false, // Don't refetch when window regains focus
    refetchOnMount: 'if-needed', // Only refetch on mount if data is stale
    refetchOnReconnect: false, // Don't refetch on reconnect
    retry: false, // Don't retry failed requests automatically
  });
};