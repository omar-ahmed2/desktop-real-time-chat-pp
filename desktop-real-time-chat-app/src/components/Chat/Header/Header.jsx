import React from 'react';
import './Header.css';
import GroupCreation from '../../Groups/groupCreation';

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
        <GroupCreation />
    </div>
  );
};

export default Header; 