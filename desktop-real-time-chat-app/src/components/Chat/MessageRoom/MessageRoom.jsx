import React, { useEffect, useRef, memo, useMemo, useCallback } from "react";
import "./MessageRoom.css";
import { useChatroom } from "../../../hooks/useChatroom";
import authContext from "../../../authContext";
import { useContext } from "react";

// Individual message component to prevent full list rerenders
const MessageItem = memo(({ message, isOwnMessage, displayName, messageTime, index }) => {
  return (
    <div
      className={`message-item ${
        isOwnMessage ? "own-message" : ""
      } animate-fade-in`}
      style={{ animationDelay: `${0.2 + index * 0.1}s` }}
    >
      {!isOwnMessage && message.user && (
        <img
          src={message.user.avatar || "/default-avatar.png"}
          alt={displayName}
          className="message-avatar"
          loading="lazy"
        />
      )}
      <div className="message-content">
        {!isOwnMessage && message.user && (
          <div className="message-user">{displayName}</div>
        )}
        <div className="message-bubble">{message.message}</div>
        <div className="message-time">{messageTime}</div>
      </div>
    </div>
  );
});

// Message list component with stricter memoization
const MessageList = memo(({ messages, currentUserId }) => {
  // Pre-process messages once to derive all needed data
  const processedMessages = useMemo(() => {
    return messages.map((message, index) => {
      const isOwnMessage = message.user?._id === currentUserId;
      
      const displayName = message.user ? (
        message.user.firstName && message.user.lastName
          ? `${message.user.firstName} ${message.user.lastName}`
          : message.user.name || "Unknown User"
      ) : "Unknown User";
      
      const messageTime = new Date(message.time).toLocaleTimeString([], { 
        hour: '2-digit', 
        minute: '2-digit'
      });
      
      return {
        message,
        isOwnMessage,
        displayName,
        messageTime,
        id: message._id || `message-${index}`,
        index
      };
    });
  }, [messages, currentUserId]);
  
  return (
    <>
      {processedMessages.map(({ message, isOwnMessage, displayName, messageTime, id, index }) => (
        <MessageItem
          key={id}
          message={message}
          isOwnMessage={isOwnMessage}
          displayName={displayName}
          messageTime={messageTime}
          index={index}
        />
      ))}
    </>
  );
});

// Main MessageRoom component with optimized rendering
const MessageRoom = memo(({ selectedChatId, setSelectedUser }) => {
  // Get current user from auth context
  const { user } = useContext(authContext);
  
  // Extract the current user ID for stable comparison
  const currentUserId = useMemo(() => user?._id, [user?._id]);
  
  // Stable chatId reference to prevent unnecessary hook executions
  const chatId = useMemo(() => selectedChatId, [selectedChatId]);
  
  // Fetch chat data using the custom hook
  const {
    data: chatData,
    isLoading,
    error,
  } = useChatroom(chatId);
  
  // Memoize the messages array to prevent unnecessary re-renders
  const messages = useMemo(() => chatData?.chat || [], [chatData?.chat]);
  
  // Update the selected user in the parent component when chat data changes
  useEffect(() => {
    if (!chatData || isLoading) return;
    
    // Find the other user in the chat (not the current user)
    if (chatData.participants && chatData.participants.length > 0) {
      const otherUser = chatData.participants.find(
        participant => participant._id !== currentUserId
      );
      
      if (otherUser) {
        setSelectedUser({
          _id: otherUser._id,
          firstName: otherUser.firstName || '',
          lastName: otherUser.lastName || '',
          name: otherUser.name || '',
          avatar: otherUser.avatar || '/default-avatar.png'
        });
      }
    }
  }, [chatData, isLoading, currentUserId, setSelectedUser]);
  
  const scrollRef = useRef(null);
  const messageCountRef = useRef(0);
  
  // Scroll handler with stable reference
  const scrollToBottom = useCallback(() => {
    if (!scrollRef.current) return;
    
    const scrollElement = scrollRef.current;
    scrollElement.scrollTop = scrollElement.scrollHeight;
  }, []);
  
  // Only scroll if message count has increased
  useEffect(() => {
    const newMessageCount = messages.length;
    
    if (scrollRef.current && !isLoading && newMessageCount > 0 && 
        (messageCountRef.current === 0 || newMessageCount > messageCountRef.current)) {
      messageCountRef.current = newMessageCount;
      scrollToBottom();
    }
  }, [messages.length, isLoading, scrollToBottom]);

  if (isLoading) {
    return <div className="message-list loading">Loading messages...</div>;
  }

  if (error) {
    return <div className="message-list error">Error loading messages: {error.message}</div>;
  }

  if (!messages.length) {
    return <div className="message-list empty">No messages in this conversation yet.</div>;
  }

  return (
    <div className="message-list" ref={scrollRef}>
      <div className="messages-container">
        <MessageList 
          messages={messages} 
          currentUserId={currentUserId} 
        />
      </div>
    </div>
  );
});

export default MessageRoom;