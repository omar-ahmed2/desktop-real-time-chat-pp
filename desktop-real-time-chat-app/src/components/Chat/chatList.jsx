// ChatList.js
import React from 'react';
import {chatUsers} from '../../data/mockdata';
const containerStyle = {
  height: '400px',          // Fixed height for the scrollable area
  overflowY: 'scroll',      // Vertical scrolling enabled
  border: '1px solid #ccc', // Border to visually separate the container
  padding: '10px',
};

const chatUserStyle = {
  display: 'flex',
  alignItems: 'center',
  padding: '10px',
  borderBottom: '1px solid #eee', // Separator between users
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
          <span>{user.profilePic}</span>
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
