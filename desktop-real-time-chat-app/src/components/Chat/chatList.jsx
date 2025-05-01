
import React from 'react';
import './ChatLayout'; // Import your CSS file for styling
import {chatUsers} from '../../data/mockdata';
const containerStyle = {
  height: '100%',          // Fixed height for the scrollable area
  overflowY: 'auto',      // Vertical scrolling enabled

};

const chatUserStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-start',
  padding: '3px',
  transform: 'scale(0.9)',
  cursor: 'pointer'
  
};

const profilePicStyle = {
  width: '50px',
  height: '50px',
  borderRadius: '50%',
  marginRight: '10px',
  objectFit: 'cover',
};
const ChatList = ({ setMessage }) => {
  return (
    <div style={containerStyle}>
      {chatUsers.map(user => (
    <div
      key={user.id}
      className="hover:bg-blue-500 transition duration-300 flex items-center gap-3 p-2 cursor-pointer"
      onClick={() => setMessage(user.id)}
    >
      <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
        {user.profilePic}
      </div>
      <div className="overflow-hidden">
        <h4 className="text-base font-medium m-0 truncate">{user.name}</h4>
        <p className="text-sm text-gray-500 m-0 truncate">{user.lastMessage}</p>
      </div>
    </div>
  ))}
    </div>
  );
};

export default ChatList;
