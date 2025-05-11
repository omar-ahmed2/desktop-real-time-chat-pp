import React from 'react';
import './Header.css';
import GroupCreation from '../../Groups/groupCreation';

const Header = ({ selectedUser }) => {
  return (
    <div className="chat-header">
      <div className="header-left animate-fade-in">
        <div className="team-info">
          {/* تأكد من أن الـ selectedUser موجود وبه قيمة */}
          {selectedUser ? (
            <>
              <h2 className="team-name">{selectedUser.name}</h2>
              <div className="online-users">
                <div className="avatar-stack">
                  {/* عرض صورة المستخدم */}
                  {selectedUser.profilePic ? (
                    <img
                      src={selectedUser.profilePic} // استخدام الصورة من البيانات
                      alt={selectedUser.name}
                      className="avatar"
                    />
                  ) : (
                    <div className="avatar-placeholder">No Image</div> // في حالة مفيش صورة
                  )}
                </div>
                <span className="online-count">Online</span>
              </div>
            </>
          ) : (
            <span>Select a user</span> // في حالة ما مفيش مستخدم مختار
          )}
        </div>
      </div>
      <GroupCreation />
    </div>
  );
};

export default Header;
