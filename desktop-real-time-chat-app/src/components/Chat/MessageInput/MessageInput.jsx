import React, { useState, useContext, useRef } from 'react';
import './MessageInput.css';
import authContext from '../../../authContext';
import { useMutation } from '@tanstack/react-query';
import { useChatroom } from '../../../hooks/useChatroom';

const MessageInput = ({ chatId, selectedUser }) => {
  const [message, setMessage] = useState('');
  const { user } = useContext(authContext);
  
  // Use the enhanced chatroom hook that includes registerTempMessage
  const { registerTempMessage } = useChatroom(chatId);
  
  // Use a ref to track if we've already optimistically updated for a message
  const optimisticUpdateRef = useRef(new Set());
  
  // Create a mutation for sending messages
  const sendMessageMutation = useMutation({
    mutationFn: async (messageData) => {
      const token = sessionStorage.getItem('token');
      
      const response = await fetch('http://localhost:3000/api/sendmessage', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(messageData),
      });
      
      if (!response.ok) {
        throw new Error('Failed to send message');
      }
      
      return response.json();
    },
    onMutate: async (newMessage) => {
      // Generate a unique ID for this message
      const tempId = `temp-${Date.now()}`;
      
      // Check if we've already added this message optimistically
      if (optimisticUpdateRef.current.has(newMessage.message)) {
        return { skipOptimisticUpdate: true };
      }
      
      // Add message to our tracking set
      optimisticUpdateRef.current.add(newMessage.message);
      
      // Create a temporary message with the current user's data
      const optimisticMessage = {
        _id: tempId, // Temporary ID until server responds
        message: newMessage.message,
        userId: user?._id,
        time: new Date().toISOString(), // For UI display
        user: {
          _id: user?._id,
          firstName: user?.firstName || '',
          lastName: user?.lastName || '',
          name: user?.name || '',
          avatar: user?.avatar || '/default-avatar.png'
        }
      };
      
      // Register this temporary message with the chat hook so it can be matched later
      registerTempMessage(tempId, optimisticMessage);
      
      // Clean up our tracking set after a delay (in case of quick repeated submissions)
      setTimeout(() => {
        optimisticUpdateRef.current.delete(newMessage.message);
      }, 2000);
      
      return { tempId };
    },
    onError: (err, newMessage, context) => {
      console.error('Error sending message:', err);
    },
    onSuccess: (data) => {
    }
  });

  const handleInputChange = (e) => {
    setMessage(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Don't send empty messages or when already loading
    if (!message.trim() || sendMessageMutation.isLoading) return;
    
    const messageContent = message.trim();
    setMessage('');
    
    const messageData = {
      groupId: chatId,
      userId: user?._id,
      message: messageContent
    };
    
    // Send the message using the mutation
    sendMessageMutation.mutate(messageData);
  };
  
  // Disable the input if we don't have a valid chat yet
  const isInputDisabled = !chatId && !selectedUser;
  
  return (
    <div className="message-input-container">
      <form onSubmit={handleSubmit} className="message-input-wrapper">
        <button type="button" className="attachment-btn">
          <img src="/images/attachment.png" alt="Attach file" />
        </button>
        <input 
          type="text" 
          placeholder={isInputDisabled ? "Select a chat to start messaging..." : "Type your message..."} 
          className="message-input"
          value={message}
          onChange={handleInputChange}
          disabled={isInputDisabled || sendMessageMutation.isLoading}
        />
        <button 
          type="submit" 
          className="send-btn"
          disabled={isInputDisabled || !message.trim() || sendMessageMutation.isLoading}
        >
          <img src="/images/send.png" alt="Send message" />
          Send
        </button>
      </form>
    </div>
  );
};

export default MessageInput;