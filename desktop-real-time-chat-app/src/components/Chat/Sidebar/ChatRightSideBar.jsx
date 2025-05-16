import React, { useState, useEffect, useMemo, useCallback } from "react";
import ChatList from "../chatList";
import ChatSearchInput from "../searchbar/ChatSearchInput";
import MediaQuery from "react-responsive";

const ChatRightSidebar = ({ setSelectedChatId, chatList, isLoading }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [chatID, setChatID] = useState("");

  // Auto-select the first chat when the chat list loads on desktop only
  useEffect(() => {
    if (
      !isLoading &&
      chatList &&
      chatList.length > 0 &&
      window.innerWidth > 600 &&
      !chatID
    ) {
      const firstChat = chatList[0];
      const participant = firstChat.participants?.find(
        (p) => p._id !== firstChat.ownerId
      );

      setSelectedChatId(firstChat._id, participant);
      setChatID(firstChat._id);
    }
  }, [chatList, isLoading, setSelectedChatId, chatID]);

  // Use useCallback so handleUserSelect has stable reference for memo
  const handleUserSelect = useCallback(
    (chatId, userData) => {
      if (chatId) {
        setChatID(chatId);
        setSelectedChatId(chatId, userData);
      }
    },
    [setSelectedChatId]
  );

  // Memoize props for ChatList to optimize rendering
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
        <ChatSearchInput searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      </div>

      <div className="flex">
        <img src="/images/image (7).png" className="pleft" alt="Logo" />
        <h4 className="logo-text">All Chat</h4>
      </div>

      <ChatList {...chatListProps} />
    </div>
  );
};

export default ChatRightSidebar;
