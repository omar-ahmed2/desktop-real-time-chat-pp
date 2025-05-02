import Sidebar from './Sidebar/Sidebar';
import Header from './Header/Header';
import MessageRoom from './MessageRoom/MessageRoom';
import MessageInput from './MessageInput/MessageInput';
import './ChatLayout.css';
import ChatList from './chatList';
import SearchBar from './searchbar/ChatSearchInput';
import { useState , useRef } from 'react';
import ChatRightSidebar from './Sidebar/ChatRightSideBar';

const ChatLayout = () => {
  const [message, setMessage] = useState(null); 


  return (         
    // left side bar
    <div className="chat-layout-container">
      <div className="chat-main-card">
        <div className="chat-layout">
          <div className="left-sidebar animate-slide-right">
            <Sidebar />
          </div>
          {/* middle chat room */}  
          <div className="main-content animate-fade-in">
            <Header />
            <MessageRoom message={message} />
            <MessageInput />
          </div>
          {/* right-sidebar */}
          <div className="right-sidebar flex flex-col h-full overflow-hidden">
            {/* <h2 className="logo-text p1">Messages</h2>
            <SearchBar />
            <div className="flex">
              <img src="/images/image (7).png" className="pleft" />
              <h4 className="logo-text">All Chat</h4>
            </div>
            <ChatList setMessage={setMessage} /> */}
            <ChatRightSidebar/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatLayout;
