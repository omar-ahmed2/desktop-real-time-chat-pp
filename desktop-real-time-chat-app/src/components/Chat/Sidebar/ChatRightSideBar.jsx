import { useState, useEffect, useMemo } from 'react';
import ChatList from '../chatList';
import ChatSearchInput from '../searchbar/ChatSearchInput';
import MediaQuery from 'react-responsive';


const ChatRightSidebar = ({ setSelectedChatId, chatList, isLoading }) => {
  const [searchTerm, setSearchTerm] = useState('');
  
  // Auto-select the first chat when the chat list loads
  useEffect(() => {
    if (!isLoading && chatList && chatList.length > 0) {
      // Auto-select the first chat from the list
      setSelectedChatId(chatList[0]._id);
    }
  }, [chatList, isLoading, setSelectedChatId]);

  // Function to handle user selection from the chat list
  const handleUserSelect = (userId) => {
    if (userId) {
      // Set the selected chat ID - single source of truth
      setSelectedChatId(userId);
    }
  };

  // We're passing the searchTerm to ChatList through an object to avoid unnecessary re-renders
  const chatListProps = useMemo(() => ({
    onSelectUser: handleUserSelect,
    searchTerm,
    chatList,
    isLoading
  }), [handleUserSelect, searchTerm, chatList, isLoading]);

  return (
    <div className="chat-right-sidebar" className='mobile-chat-container'>

      <MediaQuery maxWidth={1225}>
          <div className="sidebar-header animate-fade-in">
            <div className="logo-chatty">
            <img src="/images/logo2.png" alt="Logo" className="logo-chatty" /><span className="logo-text-chatty">Chatty</span>
          </div>
        </div>
        </MediaQuery>

      <div className="search-container">
        <ChatSearchInput
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />
      </div>

      <div className="flex">
        <img src="/images/image (7).png" className="pleft" alt="Logo" />
        <h4 className="logo-text">All Chat</h4>
      </div>

      {/* Pass chatList and loading state to ChatList component */}
      <ChatList {...chatListProps} />
    </div>
  );
};

export default ChatRightSidebar;