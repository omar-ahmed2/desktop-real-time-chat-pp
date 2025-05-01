import Sidebar from './Sidebar/Sidebar';
import Header from './Header/Header';
import MessageRoom from './MessageRoom/MessageRoom';
import MessageInput from './MessageInput/MessageInput';
import './ChatLayout.css';
import ChatList from './chatList';
import SearchBar from './searchbar/Searchbar';
import { useState , useRef } from 'react';
const ChatLayout = () => {
  const [message, setMessage] = useState(null); 
  return (         
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
            <h2 className="logo-text p1">Messages</h2>
            <SearchBar />
            <div className="flex">
              <img src="/images/image (7).png" className="pleft" />
              <h4 className="logo-text">All Chat</h4>
            </div>
            <ChatList setMessage={setMessage} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatLayout;
