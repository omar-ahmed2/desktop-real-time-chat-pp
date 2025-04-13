import React from 'react';
import './Sidebar.css';

const Sidebar = () => {
  const menuItems = [
    { id: 1, icon: '🏠', label: 'Dashboard', active: false },
    { id: 2, icon: '💬', label: 'Messages', active: true },
    { id: 3, icon: '👥', label: 'Groups', active: false },
    { id: 4, icon: '⭐', label: 'Favourites', active: false },
    { id: 5, icon: '📅', label: 'Calendar', active: false },
    { id: 6, icon: '📁', label: 'Files', active: false },
  ];

  return (
    <div className="sidebar">
      <div className="sidebar-header animate-fade-in">
        <div className="logo">
          <span className="logo-icon">💬</span>
          <span className="logo-text">ChatApp</span>
        </div>
      </div>

      <nav className="sidebar-nav">
        {menuItems.map((item, index) => (
          <div 
            key={item.id}
            className={`nav-item ${item.active ? 'active' : ''} animate-slide-right`}
            style={{ animationDelay: `${0.2 + index * 0.1}s` }}
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
            src="https://via.placeholder.com/40" 
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