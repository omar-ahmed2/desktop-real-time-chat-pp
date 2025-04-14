import React from 'react';
import Sidebar from './Sidebar/Sidebar';
import Header from './Header/Header';
import MessageList from './MessageList/MessageList';
import MessageInput from './MessageInput/MessageInput';
import ChatUserCard from './ChatUserCard/ChatUserCard';
import './ChatLayout.css';
import ChatList from './chatList';

const ChatLayout = () => {
  return (
    <div className="chat-layout-container">
      <div className="chat-main-card">
        <div className="chat-layout">
          <div className="left-sidebar animate-slide-right">
            <Sidebar />
          </div>
          <div className="main-content animate-fade-in">
            <Header />
            <MessageList />
            <MessageInput />
          </div>
          <div className="right-sidebar animate-slide-left">
            <h2 className='gradiat-text'>Messages</h2>
            <ChatList />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatLayout; 