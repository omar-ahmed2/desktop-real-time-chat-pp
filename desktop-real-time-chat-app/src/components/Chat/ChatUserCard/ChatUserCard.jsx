import React from 'react';
import './ChatUserCard.css';

const ChatUserCard = () => {
  return (
    <div className="chat-user-card">
      <div className="user-header animate-fade-in">
        <img
          src="https://via.placeholder.com/80"
          alt="Sarah Parker"
          className="user-avatar"
        />
        <h3 className="user-name">Sarah Parker</h3>
        <span className="user-status">Online</span>
      </div>

      <div className="user-info-section animate-fade-in">
        <h4 className="section-title">Info</h4>
        <div className="info-item">
          <span className="info-label">Email</span>
          <span className="info-value">sarah.parker@example.com</span>
        </div>
        <div className="info-item">
          <span className="info-label">Role</span>
          <span className="info-value">UI/UX Designer</span>
        </div>
        <div className="info-item">
          <span className="info-label">Team</span>
          <span className="info-value">Design Team</span>
        </div>
      </div>

      <div className="shared-files animate-fade-in">
        <h4 className="section-title">Shared Files</h4>
        <div className="file-list">
          <div className="file-item">
            <span className="file-icon">📄</span>
            <div className="file-info">
              <span className="file-name">Design System.fig</span>
              <span className="file-size">24.5 MB</span>
            </div>
          </div>
          <div className="file-item">
            <span className="file-icon">📄</span>
            <div className="file-info">
              <span className="file-name">Brand Guidelines.pdf</span>
              <span className="file-size">12.8 MB</span>
            </div>
          </div>
        </div>
      </div>

      <div className="action-buttons animate-fade-in">
        <button className="profile-action-btn">
          <span className="action-icon">📞</span>
          Call
        </button>
        <button className="profile-action-btn">
          <span className="action-icon">📧</span>
          Email
        </button>
      </div>
    </div>
  );
};

export default ChatUserCard; 