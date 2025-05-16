import React, { useState, useEffect, useMemo, useCallback } from "react";
import { useQueryClient } from "@tanstack/react-query";
import ChatList from "../chatList";
import ChatSearchInput from "../searchbar/ChatSearchInput";
import MediaQuery from "react-responsive";
import AuthContext from "../../../authContext";
import getSocket from "../../../socket";

const ChatRightSidebar = ({ setSelectedChatId, chatList, isLoading, setSelectedUser }) => {
  const { user } = React.useContext(AuthContext);
  const queryClient = useQueryClient();
  const [searchTerm, setSearchTerm] = useState("");
  const [chatID, setChatID] = useState("");
  const [localChatList, setLocalChatList] = useState(chatList);

  // Sync localChatList with prop changes
  useEffect(() => {
    setLocalChatList(chatList);
  }, [chatList]);

  // Listen for user_update events to update chatList
  useEffect(() => {
    const socket = getSocket();

    socket.on("user_update", async (data) => {
      console.log("User update received in ChatRightSidebar:", data.userId);

      try {
        const token = sessionStorage.getItem("token");
        if (!token) return;

        // Fetch updated user data
        const res = await fetch(`http://localhost:3000/api/getuser`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ userId: data.userId }),
        });

        if (!res.ok) {
          console.error("Failed to fetch updated user data");
          return;
        }

        const updatedUserData = await res.json();

        // Update the chatlist query cache
        queryClient.setQueryData(["chatlist"], (oldChatList) => {
          if (!oldChatList) return oldChatList;

          return oldChatList.map(chat => {
            const updatedParticipants = chat.participants.map(participant => {
              if (participant._id === data.userId) {
                return {
                  ...participant,
                  firstName: updatedUserData.firstName,
                  lastName: updatedUserData.lastName,
                  name: updatedUserData.name,
                  avatar: updatedUserData.avatar,
                  activity: updatedUserData.activity,
                  email: updatedUserData.email,
                  phone: updatedUserData.phone,
                };
              }
              return participant;
            });

            const updatedDisplayUser = chat.displayUser && chat.displayUser._id === data.userId
              ? {
                  ...chat.displayUser,
                  firstName: updatedUserData.firstName,
                  lastName: updatedUserData.lastName,
                  name: updatedUserData.name,
                  avatar: updatedUserData.avatar,
                  activity: updatedUserData.activity,
                  email: updatedUserData.email,
                  phone: updatedUserData.phone,
                }
              : chat.displayUser;

            return {
              ...chat,
              participants: updatedParticipants,
              displayUser: updatedDisplayUser,
            };
          });
        });

        // Update localChatList to trigger re-render
        setLocalChatList(prevChatList => {
          if (!prevChatList) return prevChatList;
          return prevChatList.map(chat => {
            const updatedParticipants = chat.participants.map(participant => {
              if (participant._id === data.userId) {
                return {
                  ...participant,
                  firstName: updatedUserData.firstName,
                  lastName: updatedUserData.lastName,
                  name: updatedUserData.name,
                  avatar: updatedUserData.avatar,
                  activity: updatedUserData.activity,
                  email: updatedUserData.email,
                  phone: updatedUserData.phone,
                };
              }
              return participant;
            });

            const updatedDisplayUser = chat.displayUser && chat.displayUser._id === data.userId
              ? {
                  ...chat.displayUser,
                  firstName: updatedUserData.firstName,
                  lastName: updatedUserData.lastName,
                  name: updatedUserData.name,
                  avatar: updatedUserData.avatar,
                  activity: updatedUserData.activity,
                  email: updatedUserData.email,
                  phone: updatedUserData.phone,
                }
              : chat.displayUser;

            return {
              ...chat,
              participants: updatedParticipants,
              displayUser: updatedDisplayUser,
            };
          });
        });

        // Update selectedUser if it matches the updated user
        if (chatID && chatList.find(chat => chat._id === chatID)?.participants.some(p => p._id === data.userId)) {
          setSelectedUser(updatedUserData);
        }
      } catch (error) {
        console.error("Error fetching updated user:", error);
      }
    });

    return () => {
      socket.off("user_update");
    };
  }, [queryClient, chatID, setSelectedUser, chatList]);

  // Auto-select the first chat when the chat list loads on desktop only
  useEffect(() => {
    if (
      !isLoading &&
      localChatList &&
      localChatList.length > 0 &&
      window.innerWidth > 600 &&
      !chatID
    ) {
      const firstChat = localChatList[0];
      const participant = firstChat.participants?.find(
        (p) => p._id !== user._id
      );

      setSelectedChatId(firstChat._id, participant);
      setChatID(firstChat._id);
      setSelectedUser(participant);
    }
  }, [localChatList, isLoading, setSelectedChatId, chatID, setSelectedUser, user._id]);

  // Use useCallback so handleUserSelect has stable reference for memo
  const handleUserSelect = useCallback(
    (chatId, userData) => {
      if (chatId) {
        setChatID(chatId);
        setSelectedChatId(chatId, userData);
        setSelectedUser(userData);
      }
    },
    [setSelectedChatId, setSelectedUser]
  );

  // Memoize props for ChatList to optimize rendering
  const chatListProps = useMemo(
    () => ({
      onSelectUser: handleUserSelect,
      searchTerm,
      chatList: localChatList,
      isLoading,
    }),
    [handleUserSelect, searchTerm, localChatList, isLoading]
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

      <ChatList {...chatListProps} />
    </div>
  );
};

export default ChatRightSidebar;