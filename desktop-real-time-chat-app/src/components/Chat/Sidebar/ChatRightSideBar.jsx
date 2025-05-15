import React, { useState, useEffect, useMemo } from "react";
import ChatList from "../chatList";
import ChatSearchInput from "../searchbar/ChatSearchInput";
import MediaQuery from "react-responsive";

const ChatRightSidebar = ({ setSelectedChatId, chatList, isLoading }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [chatID,setChatID]= useState("");
  // Auto-select the first chat when the chat list loads
  // Only do this on desktop, not on mobile
  useEffect(() => {
    if (
      !isLoading &&
      chatList &&
      chatList.length > 0 &&
      window.innerWidth > 600
    ) {
      // Auto-select the first chat from the list
      if(!chatID ){
      setSelectedChatId(
        chatList[0]._id,
        chatList[0].participants?.find((p) => p._id !== chatList[0].ownerId)
      );
    }
    }
  }, [chatList, isLoading, setSelectedChatId]);

  // Function to handle user selection from the chat list
  const handleUserSelect = (chatId, userData) => {
    if (chatId) {
      setChatID(chatId);
      // Set the selected chat ID and pass the user data
      setSelectedChatId(chatId, userData);
    }
  };

  // We're passing the searchTerm to ChatList through an object to avoid unnecessary re-renders
  const chatListProps = useMemo(
    () => ({
      onSelectUser: handleUserSelect,
      searchTerm,
      chatList,
      isLoading,
    }),
    [handleUserSelect, searchTerm, chatList, isLoading]
  );

  return (
    <div className="chat-right-sidebar mobile-chat-container">
      <MediaQuery maxWidth={1225}>
        <div className="sidebar-header animate-fade-in">
          <div className="logo-chatty">
            <img src="/images/logo2.png" alt="Logo" className="logo-chatty" />
            <span className="logo-text-chatty">Chatty</span>
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
