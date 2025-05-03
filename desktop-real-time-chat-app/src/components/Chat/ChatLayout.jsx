import './ChatLayout.css';
import Sidebar from './Sidebar/Sidebar';
import Header from './Header/Header';
import MessageRoom from './MessageRoom/MessageRoom';
import MessageInput from './MessageInput/MessageInput';
import { useState , useRef } from 'react';
import ChatRightSidebar from './Sidebar/ChatRightSideBar';
import MediaQuery from 'react-responsive'

const ChatLayout = () => {
  const [message, setMessage] = useState(null); 


  return (         
    // left side bar
    <div className="chat-layout-container">
      <div className="chat-main-card">
        <div className="chat-layout">

        <MediaQuery minWidth={1225}>
            <Sidebar />
         </MediaQuery>

          {/* middle chat room */}  
          <div className="main-content animate-fade-in">

          <MediaQuery minWidth={601}>
            <Header />
            <MessageRoom message={message} />
            <MessageInput />
          </MediaQuery>

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
