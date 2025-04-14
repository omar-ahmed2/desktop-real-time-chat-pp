import React from 'react';
import './Header.css';

const Header = () => {
  return (
    <div className="chat-header">
      <div className="header-left animate-fade-in">
        <div className="team-info">
          <h2 className="team-name">Design Team</h2>
          <div className="online-users">
            <div className="avatar-stack">
              <img src="/images/picProfile.png" alt="User 1" className="avatar" />
              <img src="/images/picProfile.png" alt="User 2" className="avatar" />
              <img src="/images/picProfile.png" alt="User 3" className="avatar" />
            </div>
            <span className="online-count">12 members</span>
          </div>
        </div>
      </div>

      <div className="header-right animate-fade-in">
        <div className="action-buttons">
          <button className="action-btn">
            <span className="action-icon"><img src="/images/minifav.png" /></span>
          </button>
          <button className="action-btn">
            <span className="action-icon"><img src="/images/search.png" /></span>
          </button>
          <button className="action-btn">
            <span className="action-icon"><img src="/images/video.png" /></span>
          </button>
          <button className="action-btn">
            <span className="action-icon"><img src="/images/call.png" /></span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header; 