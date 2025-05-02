import Sidebar from './Sidebar/Sidebar';
import Header from './Header/Header';
import MessageRoom from './MessageRoom/MessageRoom';
import MessageInput from './MessageInput/MessageInput';
import './ChatLayout.css';
import { useState , useRef } from 'react';
import ChatRightSidebar from './Sidebar/ChatRightSideBar';

const ChatLayout = () => {
  const [message, setMessage] = useState(null); 


  return (         
    // left side bar
    <div className="chat-layout-container">
      <div className="chat-main-card">
        <div className="chat-layout">

            <Sidebar />
         
          {/* middle chat room */}  
          <div className="main-content animate-fade-in">
            <Header />
            <MessageRoom message={message} />
            <MessageInput />
          </div>
          {/* right-sidebar */}
          <div className="right-sidebar flex flex-col h-full overflow-hidden">
            <ChatRightSidebar/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatLayout;
