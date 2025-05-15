import './Sidebar.css';
import { useNavigate, useLocation } from 'react-router-dom';
import AuthContext from '../../../authContext';
import { useContext } from 'react';
import MediaQuery from 'react-responsive';

const Sidebar = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { id: 2, icon: <div className="icon-container"><img src="/images/messages.png" /></div>, label: 'Messages', path: '/chat' },
    { id: 3, icon: <div className="icon-container"><img src="/images/groups.png" /></div>, label: 'Groups', path: '/groups' },
    { id: 5, icon: <div className="icon-container"><img src="/images/contacts.png" /></div>, label: 'Contacts', path: '/contacts' },
  ];

  const handleNavigation = (path) => {
    if(path == "/messages"){path = "/chat"}
    navigate(path);
  };

  const handleProfileClick = () => {
    navigate('/profile');
  };

  return (
    <div className="left-sidebar animate-slide-right">
      <div className="sidebar">
        <MediaQuery minWidth={1225}>
          <div className="sidebar-header animate-fade-in">
            <div className="logo-chatty">
              <img src="/images/logo2.png" alt="Logo" className="logo-chatty" /><span className="logo-text-chatty">Chatty</span>
            </div>
          </div>
        </MediaQuery>
        <nav className="nav-menu" >
          {menuItems.map((item, index) => {
            const isActive = location.pathname.startsWith(item.path);
            return (
              <div
                key={item.id}
                className={`nav-item${isActive ? ' active' : ''} animate-slide-right`}
                style={{ animationDelay: `${0.2 + index * 0.1}s` }}
                onClick={() => handleNavigation(item.path)}
              >
                <div className='nav-icon-container'><span className="nav-icon">{item.icon}</span></div>
                <span className="nav-label">{item.label}</span>
                {isActive && <div className="active-indicator" />}
              </div>
            );
          })}
        </nav>

        <div className="sidebar-footer animate-fade-in">
          <div 
            className="user-profile" 
            onClick={handleProfileClick}
            style={{ cursor: 'pointer' }}
          >
            <img
              src={user.avatar}
              alt="User"
              className="user-avatar"
            />
            <div className="user-info">
              <span className="user-name">{`${user.firstName} ${user.lastName}`}</span>
              <span className="user-status">Online</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
