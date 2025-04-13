import React from 'react';
import './MessageInput.css';

const MessageInput = () => {
  return (
    <div className="message-input-container animate-slide-up">
      <div className="message-input-wrapper">
        <button className="attachment-btn">
          <span className="action-icon">📎</span>
        </button>
        
        <div className="input-area">
          <input
            type="text"
            placeholder="Type your message..."
            className="message-input"
          />
          <div className="input-actions">
            <button className="action-btn">
              <span className="action-icon">😊</span>
            </button>
            <button className="action-btn">
              <span className="action-icon">🎤</span>
            </button>
          </div>
        </div>

        <button className="send-button">
          <span className="action-icon">📤</span>
        </button>
      </div>
    </div>
  );
};

export default MessageInput; 