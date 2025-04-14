// ChatList.js
import React from 'react';
import {chatUsers} from '../../data/mockdata';
const containerStyle = {
  height: '200px',          // Fixed height for the scrollable area
  overflowY: 'scroll',      // Vertical scrolling enabled

  // padding: '10px',
};

const chatUserStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-start',
  padding: '3px',
  transform: 'scale(0.9)'
};

const profilePicStyle = {
  width: '50px',
  height: '50px',
  borderRadius: '50%',  // Makes the image circular
  marginRight: '10px',
};

const ChatList = () => {
  return (
    <div style={containerStyle}>
      {chatUsers.map(user => (
        <div key={user.id} style={chatUserStyle}>
          <span className='pright'>{user.profilePic}</span>
          <div>
            <h4 style={{ margin: 0 }}>{user.name}</h4>
            <p style={{ margin: 0, color: '#555' }}>{user.lastMessage}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ChatList;
