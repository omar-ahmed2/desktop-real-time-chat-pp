import React from 'react';
import './Sidebar.css';
import { useNavigate } from 'react-router-dom';

const Sidebar = () => {
  const navigate = useNavigate();

  const menuItems = [
    { id: 2, icon: <img src="/images/i chats.png" style={{ transform: 'scale(0.7)' }} />, label: 'Messages', path: '/messages', active: true },
    { id: 3, icon: <img src="/images/i group.png" style={{ transform: 'scale(0.7)' }} />, label: 'Groups', path: '/groups', active: false },
    { id: 5, icon: <img src="/images/i chats.png" style={{ transform: 'scale(0.7)' }} />, label: 'Calendar', path: '/calendar', active: false },
    { id: 7, icon: <img src="/images/settings.png" style={{ transform: 'scale(0.7)' }} />, label: 'Settings', path: '/settings', active: false },
  ];

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <div className="sidebar">
      <div className="sidebar-header animate-fade-in">
        <div className="logo">
          <span className="logo-icon">💬</span>
          <span className="logo-text">Chatty</span>
        </div>
      </div>

      <nav className="sidebar-nav">
        {menuItems.map((item, index) => (
          <div
            key={item.id}
            className={`nav-item ${item.active ? 'active' : ''} animate-slide-right`}
            style={{ animationDelay: `${0.2 + index * 0.1}s` }}
            onClick={() => handleNavigation(item.path)}
          >
            <span className="nav-icon">{item.icon}</span>
            <span className="nav-label">{item.label}</span>
            {item.active && <div className="active-indicator" />}
          </div>
        ))}
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
  );
};

export default Sidebar;
