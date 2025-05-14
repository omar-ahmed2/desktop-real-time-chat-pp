import './Header.css';

const Header = ({ selectedUser, onBackClick, showBackButton }) => {
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
      {/* Show back button only on mobile when viewing a chat */}
      {showBackButton && (
        <button 
          onClick={onBackClick}
          className="back-button animate-fade-in"
          aria-label="Back to chats list"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5M12 19l-7-7 7-7"/>
          </svg>
        </button>
      )}
      
      <div className={`header-left animate-fade-in ${showBackButton ? 'with-back-button' : ''}`}>
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