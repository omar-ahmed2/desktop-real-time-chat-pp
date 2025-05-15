import React, { useState, useEffect } from 'react';
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
  const { data: chatList, isLoading } = useChatList();
  
  // State to control visibility of chat view on mobile
  const [isMobileChatOpen, setIsMobileChatOpen] = useState(false);
  
  // When a chat is selected on mobile, show the chat view
  useEffect(() => {
    if (selectedChatId && window.innerWidth <= 600) {
      setIsMobileChatOpen(true);
    }
  }, [selectedChatId]);

  // Handle back button click on mobile
  const handleBackToList = () => {
    setIsMobileChatOpen(false);
  };

  // Custom handler for chat selection that also handles mobile view
  const handleSelectChat = (chatId, userData) => {
    setSelectedChatId(chatId);
    setSelectedUser(userData);
    
    if (window.innerWidth <= 600) {
      setIsMobileChatOpen(true);
    }
  };
  
  return (
    <div className="chat-layout-container">
      <div className="chat-main-card">
        <div className="chat-layout">
          <MediaQuery minWidth={1225}>
            <Sidebar />
          </MediaQuery>
          
          {/* Main content area for desktop and tablets */}
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

          {/* Mobile view with conditional rendering based on which view is active */}
          <MediaQuery maxWidth={600}>
            <div className="main-content animate-fade-in" style={{ display: isMobileChatOpen ? 'flex' : 'none' }}>
              <Header 
                selectedUser={selectedUser} 
                onBackClick={handleBackToList}
                showBackButton={true}
              />
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

          {/* Chat list sidebar - shows on desktop always, on mobile only when chat isn't open */}
          <div className="right-sidebar flex flex-col h-full" 
               style={{ display: (window.innerWidth <= 600 && isMobileChatOpen) ? 'none' : 'flex' }}>
            <ChatRightSidebar
              setSelectedChatId={handleSelectChat}
              chatList={chatList}
              isLoading={isLoading}
              selectedUser={selectedUser}
              setSelectedUser={setSelectedUser}
            />
          </div>
          
          <MediaQuery maxWidth={1225}>
            <Sidebar />
          </MediaQuery>
          <MediaQuery maxWidth={400}>
            <Sidebar />
          </MediaQuery>
        </div>
      </div>
    </div>
  );
};

export default ChatLayout;