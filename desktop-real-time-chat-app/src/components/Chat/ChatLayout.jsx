import React from 'react';
import Sidebar from './Sidebar/Sidebar';
import Header from './Header/Header';
import MessageRoom from './MessageRoom/MessageRoom';
import MessageInput from './MessageInput/MessageInput';
import './ChatLayout.css';
import ChatList from './chatList';
import SearchBar from './searchbar/Searchbar';
import NavFilter from './chatfilternav/navfilter';







const ChatLayout = () => {
  return (         
                                            // left-sidebar
    <div className="chat-layout-container">
      <div className="chat-main-card">
        <div className="chat-layout">
          <div className="left-sidebar animate-slide-right">
            <Sidebar />
          </div>
                                          
                                              {/*    middle chat room  */}

          <div className="main-content animate-fade-in">
            <Header />
            <MessageRoom />
            <MessageInput />
          </div>
                                              
                                              {/* right-sidebar */}

          <div className="right-sidebar animate-slide-left">
            <h2 className='logo-text p1'>Messages</h2>
            <SearchBar/>
            <NavFilter/>
            <div className='flex' >
               <img src="/images/image (7).png" className='pleft' />
               <h4 className='logo-text'>Saved Chats</h4>
            </div>
            <ChatList />
            <div className='flex' >
               <img src="/images/image (7).png" className='pleft' />
               <h4 className='logo-text'>All Chat</h4>
            </div>
            <ChatList />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatLayout; 