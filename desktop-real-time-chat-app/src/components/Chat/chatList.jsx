import React, { useContext, useMemo, memo, useCallback } from 'react';
import { useState } from 'react';
import { useChatList } from '../../hooks/useChatList';
import authContext from "../../authContext";

// Optimize styles by using tailwind directly
const ChatItem = memo(({ chatData, onSelectUser, isHolding, handleMouseDown, handleMouseUp, handleMouseLeave }) => {
  const { _id, displayUser, lastMessage } = chatData;
  
  // Prepare display name based on the data structure coming from the backend
  const displayName = displayUser.firstName && displayUser.lastName 
    ? `${displayUser.firstName} ${displayUser.lastName}`
    : displayUser.name || "Unknown User";
  
  return (
    <div
      key={_id}
      onMouseDown={() => handleMouseDown(_id)}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
      onTouchStart={() => handleMouseDown(_id)}
      onTouchEnd={handleMouseUp}
      onClick={() => onSelectUser(_id)} // Pass just the ID to the parent component
      className={`hover:bg-gray-200 transition duration-300 flex items-center gap-3 p-2 cursor-pointer ${
        isHolding ? 'bg-gray-400' : 'bg-white text-black'
      }`}
    >
      <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
        {displayUser.avatar ? (
          <img 
            src={displayUser.avatar} 
            alt={displayName}
            loading="lazy" 
            className="w-full h-full object-cover"
            width="48"
            height="48"
          />
        ) : (
          <div className="w-full h-full bg-gray-300 flex items-center justify-center text-gray-600">
            {displayName.charAt(0)}
          </div>
        )}
      </div>
      <div className="overflow-hidden flex-grow">
        <h4 className="text-base font-medium m-0 truncate">{displayName}</h4>
        <p className="text-sm text-gray-500 m-0 truncate">
          {lastMessage?.content || "Start a conversation"}
        </p>
      </div>
    </div>
  );
});

// Main ChatList component with improved virtualization approach
const ChatList = memo(({ onSelectUser, searchTerm = '' }) => {
  const { user } = useContext(authContext);
  const [holdingChatId, setHoldingChatId] = useState(null);
  const { data: chatList, isLoading, error } = useChatList();
  
  const handleMouseDown = useCallback((id) => setHoldingChatId(id), []);
  const handleMouseUp = useCallback(() => setHoldingChatId(null), []);
  const handleMouseLeave = useCallback(() => setHoldingChatId(null), []);
  
  // Memoize the processed and filtered chat list
  const processedChats = useMemo(() => {
    if (!chatList || !user?._id) return [];
    
    // Create a map to track unique chats by participant ID
    const uniqueChats = new Map();
    
    // Process the chat list to prevent duplicate entries
    chatList.forEach(chat => {
      // Filter out the current user to get the other participant(s)
      const otherParticipants = chat.participants.filter(
        participant => {
          // Convert to string for safe comparison
          const participantId = participant._id?.toString();
          const userId = user._id?.toString();
          return participantId !== userId;
        }
      );
      
      // If there are other participants, use the first one as the key for this chat
      if (otherParticipants.length > 0) {
        const otherUser = otherParticipants[0];
        const otherUserId = otherUser._id?.toString();
        
        if (otherUserId) {
          if (!uniqueChats.has(otherUserId) || 
              (chat.lastMessage?.time > uniqueChats.get(otherUserId).lastMessage?.time)) {
            uniqueChats.set(otherUserId, {
              ...chat,
              displayUser: otherUser
            });
          }
        }
      }
    });
    
    // Convert the map to an array
    const chats = Array.from(uniqueChats.values());
    
    // Filter based on search term if provided
    if (searchTerm && searchTerm.trim() !== '') {
      const normalizedSearchTerm = searchTerm.toLowerCase().trim();
      return chats.filter(chat => {
        const displayName = chat.displayUser.firstName && chat.displayUser.lastName 
          ? `${chat.displayUser.firstName} ${chat.displayUser.lastName}`.toLowerCase()
          : (chat.displayUser.name || '').toLowerCase();
        
        return displayName.includes(normalizedSearchTerm);
      });
    }
    
    return chats;
  }, [chatList, user?._id, searchTerm]);
  
  if (isLoading) {
    return <div className="p-4 text-center">Loading conversations...</div>;
  }
  
  if (error) {
    return <div className="p-4 text-red-500">Error loading chats: {error.message}</div>;
  }
  
  if (!chatList || processedChats.length === 0) {
    // Show different message based on whether we're filtering or not
    return (
      <div className="p-4 text-gray-500 text-center">
        {searchTerm ? `No results for "${searchTerm}"` : "No conversations yet"}
      </div>
    );
  }
  
  return (
    <div className="h-[550px] overflow-y-auto overscroll-contain">
      {processedChats.slice(0, 15).map(chatData => (
        <ChatItem
          key={chatData._id}
          chatData={chatData}
          onSelectUser={onSelectUser}
          isHolding={holdingChatId === chatData._id}
          handleMouseDown={handleMouseDown}
          handleMouseUp={handleMouseUp}
          handleMouseLeave={handleMouseLeave}
        />
      ))}
      {processedChats.length > 15 && (
        <div className="lazy-load-container">
          {processedChats.slice(15).map(chatData => (
            <ChatItem
              key={chatData._id}
              chatData={chatData}
              onSelectUser={onSelectUser}
              isHolding={holdingChatId === chatData._id}
              handleMouseDown={handleMouseDown}
              handleMouseUp={handleMouseUp}
              handleMouseLeave={handleMouseLeave}
            />
          ))}
        </div>
      )}
    </div>
  );
});

export default ChatList;