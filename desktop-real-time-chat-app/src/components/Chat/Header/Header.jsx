import React from 'react';
import './Header.css';

const Header = ({ selectedUser }) => {
  if (!selectedUser) {
    return (
      <div className="chat-header">
        <div className="header-left animate-fade-in">
          <div className="team-info">
            <span>Select a user to start chatting</span>
          </div>
        </div>
      </div>
    );
  }

  // Display the user's full name or fallback to username
  const displayName = selectedUser.firstName && selectedUser.lastName 
    ? `${selectedUser.firstName} ${selectedUser.lastName}`
    : selectedUser.name || 'Unknown User';
  
  return (
    <div className="chat-header">
      <div className="header-left animate-fade-in">
        <div className="team-info">
          <h2 className="team-name">{displayName}</h2>
          <div className="online-users">
            <div className="avatar-stack">
              {selectedUser.avatar ? (
                <img
                  src={selectedUser.avatar}
                  alt={displayName}
                  className="avatar"
                />
              ) : (
                <div className="avatar-placeholder">
                  {displayName.charAt(0)}
                </div>
              )}
            </div>
            <span className="online-count">Online</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;