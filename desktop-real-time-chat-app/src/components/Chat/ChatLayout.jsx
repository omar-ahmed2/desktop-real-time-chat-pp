import './ChatLayout.css';
import Sidebar from './Sidebar/Sidebar';
import Header from './Header/Header';
import MessageRoom from './MessageRoom/MessageRoom';
import MessageInput from './MessageInput/MessageInput';
import { useState } from 'react';
import ChatRightSidebar from './Sidebar/ChatRightSideBar';
import MediaQuery from 'react-responsive';
import { useEffect } from 'react';

const ChatLayout = () => {
  const [message, setMessage] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);

  // اختياري: احفظ المستخدم في localStorage علشان ترجع له لو خرجت ورجعت
  useEffect(() => {
    const savedUser = localStorage.getItem('selectedUser');
    if (savedUser) {
      setSelectedUser(JSON.parse(savedUser));
    }
  }, []);

  useEffect(() => {
    if (selectedUser) {
      localStorage.setItem('selectedUser', JSON.stringify(selectedUser));
    }
  }, [selectedUser]);

  return (
    <div className="chat-layout-container">
      <div className="chat-main-card">
        <div className="chat-layout">

          <MediaQuery minWidth={1225}>
            <Sidebar />
          </MediaQuery>

          <MediaQuery minWidth={601}>
            <div className="main-content animate-fade-in">
              <Header selectedUser={selectedUser} />
              <MessageRoom message={message} />
              <MessageInput />
            </div>
          </MediaQuery>

          <div className="right-sidebar flex flex-col h-full overflow-hidden">
            <ChatRightSidebar
              setMessage={setMessage}
              setSelectedUser={setSelectedUser}
            />
          </div>
        </div>
      </div>
    </div>
  );
};


export default ChatLayout;
