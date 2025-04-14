import React from 'react';
import './MessageInput.css';

const MessageInput = () => {
  return (
    <div className="message-input-container">
      <div className="message-input-wrapper">
        <button className="attachment-btn">
          <img src="/images/attachment.png" alt="Attach file" />
        </button>
        <input 
          type="text" 
          placeholder="Type your message..." 
          className="message-input" 
        />
        <button className="send-btn">
          <img src="/images/send.png" alt="Send message" />
          Send
        </button>
      </div>
    </div>
  );
};

export default MessageInput; 

