import React from 'react';
import './Sidebar.css';
import { useNavigate, useLocation } from 'react-router-dom';

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();


  const menuItems = [
    { id: 2, icon: <div className="icon-container"><img src="/images/i chats.png" /></div>, label: 'Messages', path: '/chat' },
    { id: 3, icon: <div className="icon-container"><img src="/images/i group.png" /></div>, label: 'Groups', path: '/groups' },
    { id: 5, icon: <div className="icon-container" style={{ marginLeft: '-2px' }}><svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="#9c27b0" strokeWidth="0"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"></path></svg></div>, label: 'Contacts', path: '/contacts' },
    { id: 7, icon: <div className="icon-container"><img src="/images/settings.png" /></div>, label: 'Settings', path: '/settings' },
  ];

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <div className="left-sidebar animate-slide-right">
      <div className="sidebar">
        <div className="sidebar-header animate-fade-in">
          <div className="logo">
            <span className="logo-text">💬Chatty</span>
          </div>
        </div>

        <nav className="sidebar-nav">
          {menuItems.map((item, index) => {
            const isActive = location.pathname.startsWith(item.path);
            return (
              <div
                key={item.id}
                className={`nav-item${isActive ? ' active' : ''} animate-slide-right`}
                style={{ animationDelay: `${0.2 + index * 0.1}s` }}
                onClick={() => handleNavigation(item.path)}
              >
                <span className="nav-icon">{item.icon}</span>
                <span className="nav-label">{item.label}</span>
                {isActive && <div className="active-indicator" />}
              </div>
            );
          })}
        </nav>

        <div className="sidebar-footer animate-fade-in">
          <div className="user-profile">
            <img
              src="/images/picProfile.png"
              alt="User"
              className="user-avatar"
            />
            <div className="user-info">
              <span className="user-name">John Doe</span>
              <span className="user-status">Online</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
