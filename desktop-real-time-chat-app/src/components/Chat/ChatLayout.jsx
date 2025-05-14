import React, { useState, useEffect} from 'react';
import './ChatLayout.css';
import Sidebar from './Sidebar/Sidebar';
import Header from './Header/Header';
import MessageRoom from './MessageRoom/MessageRoom';
import MessageInput from './MessageInput/MessageInput';
import ChatRightSidebar from './Sidebar/ChatRightSideBar';
import MediaQuery from 'react-responsive';
import { useChatList } from '../../hooks/useChatList'; // Import the hook for chat list

const ChatLayout = () => {
  // Use a single state variable for the selected chat
  const [selectedChatId, setSelectedChatId] = useState(null);
  // State for selected user details (name, avatar, etc.)
  const [selectedUser, setSelectedUser] = useState(null);
  
  // Fetch the chat list - the ChatRightSidebar will use this to set the default chat
  const { data: chatList, isLoading} = useChatList();

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
              {selectedChatId && (
                <MessageRoom 
                  selectedChatId={selectedChatId} 
                  setSelectedUser={setSelectedUser}
                />
              )}
              <MessageInput 
                chatId={selectedChatId} 
                selectedUser={selectedUser} 
              />
            </div>
          </MediaQuery>

          <div className="right-sidebar flex flex-col h-full">
            <ChatRightSidebar
              setSelectedChatId={setSelectedChatId}
              chatList={chatList}
              isLoading={isLoading}
              selectedUser={selectedUser}
              setSelectedUser={setSelectedUser}
            />
          </div>
          <MediaQuery maxWidth={1225}>
            <Sidebar />
          </MediaQuery>
        </div>
      </div>
    </div>
  );
};

export default ChatLayout;