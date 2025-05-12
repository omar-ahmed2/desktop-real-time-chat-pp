import React from 'react';
import { chatUsers } from '../../data/mockdata'; // users data
import { useState } from 'react'; // for holding the state of the chat list

const containerStyle = {
  flex : "1" , // Fixed height for the scrollable area
  overflowY: 'scroll',
 // Vertical scrolling enabled
};

const chatUserStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-start',
  padding: '3px',
  transform: 'scale(0.9)',
  cursor: 'pointer',
};

const profilePicStyle = {
  width: '50px',
  height: '50px',
  borderRadius: '50%',
  marginRight: '10px',
  objectFit: 'cover',
};

const ChatList = ({ users, setMessage, onSelectUser }) => {
  const [holdingUserId, setHoldingUserId] = useState(null);

  const handleMouseDown = (id) => setHoldingUserId(id);
  const handleMouseUp = () => setHoldingUserId(null);
  const handleMouseLeave = () => setHoldingUserId(null);

  return (
    <div style={containerStyle}>
      {users.map(user => {
        const isHolding = holdingUserId === user.id;

        return (
          <div
            key={user.id}
            onMouseDown={() => handleMouseDown(user.id)}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseLeave}
            onTouchStart={() => handleMouseDown(user.id)}
            onTouchEnd={handleMouseUp}
            onClick={() => onSelectUser(user.id)} // هنا، استدعاء دالة onSelectUser
            className={`hover:bg-[#d1d5db] transition duration-300 flex items-center gap-3 p-2 cursor-pointer ${isHolding ? ' !bg-[#9ca3af]' : 'bg-white text-black'}`}
          >
            <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
              <img src={user.profilePic} alt={user.name} style={profilePicStyle} />
            </div>
            <div className="overflow-hidden">
              <h4 className="text-base font-medium m-0 truncate">{user.name}</h4>
              <p className="text-sm text-gray-500 m-0 truncate">{user.lastMessage}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ChatList;
