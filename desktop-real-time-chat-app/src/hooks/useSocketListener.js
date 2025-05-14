// Updated useSocketListeners.js allowing spamming
import { useEffect, useState, useContext } from "react";
import { useQueryClient } from "@tanstack/react-query";
import AuthContext from "../authContext";
import getSocket from "../socket";

const useSocketListeners = () => {
  const queryClient = useQueryClient();
  const { user, setUser, fetchUserFromServer } = useContext(AuthContext);
  const [savedToken, setSavedToken] = useState(sessionStorage.getItem("token"));

  useEffect(() => {
    // Check for token every second until it's found
    const intervalId = setInterval(() => {
      const currentToken = sessionStorage.getItem("token");
      if (currentToken) {
        setSavedToken(currentToken);
        clearInterval(intervalId); // Stop the interval once the token is found
      }
    }, 1000);

    return () => clearInterval(intervalId); // Cleanup on unmount
  }, []);

  useEffect(() => {
    if (!savedToken) return;

    const socket = getSocket();

    socket.on("connect", () => {
      console.log("Connected to socket.io server");
      if (user?._id) {
        socket.emit("join_user_room", { userId: user._id });
      }
    });

    socket.on("user_registered", async (data) => {
      console.log("New user registered:", data);
      await queryClient.refetchQueries({ queryKey: ["users"] });
    });

    socket.on("friend_added", async (data) => {
      console.log("Friend added:", data);
      if (
        user?._id &&
        ((data.userId && data.userId === user._id) ||
          (data.friendId && data.friendId === user._id) ||
          (data.user && data.user._id === user._id) ||
          (data.friend && data.friend._id === user._id))
      ) {
        try {
          const updatedUser = await fetchUserFromServer(savedToken, user._id);
          setUser(updatedUser);
          sessionStorage.setItem("user", JSON.stringify(updatedUser));
          queryClient.invalidateQueries({ queryKey: ["chatlist"] });
        } catch (err) {
          console.error("Error updating user:", err);
        }
      }

      await queryClient.refetchQueries({ queryKey: ["users"] });
    });

    socket.on("friend_removed", async (data) => {
      console.log("Friend removed:", data);
      if (
        user?._id &&
        ((data.userId && data.userId === user._id) ||
          (data.friendId && data.friendId === user._id) ||
          (data.user && data.user._id === user._id) ||
          (data.friend && data.friend._id === user._id))
      ) {
        try {
          const updatedUser = await fetchUserFromServer(savedToken, user._id);
          setUser(updatedUser);
          sessionStorage.setItem("user", JSON.stringify(updatedUser));
          queryClient.removeQueries({ queryKey: ["chatlist"] });
          queryClient.invalidateQueries({ queryKey: ["chatlist"] });
        } catch (err) {
          console.error("Error updating user:", err);
        }
      }

      await queryClient.refetchQueries({ queryKey: ["users"] });
    });

    socket.on("chat_deleted", async (data) => {
      console.log("Chat deleted:", data);
      if (user?._id && data.participants.includes(user._id)) {
        queryClient.removeQueries({ queryKey: ["chatlist"] });
        queryClient.invalidateQueries({ queryKey: ["chatlist"] });
      }
    });

    socket.on("friend_request_received", async (data) => {
      console.log("Friend request:", data);
      await queryClient.refetchQueries({ queryKey: ["users"] });

      if (
        user?._id &&
        (data.receiverId === user._id || data.senderId === user._id)
      ) {
        try {
          const updatedUser = await fetchUserFromServer(savedToken, user._id);
          setUser(updatedUser);
          sessionStorage.setItem("user", JSON.stringify(updatedUser));
        } catch (err) {
          console.error("Error updating user:", err);
        }
      }
    });

    socket.on("message_sent", async (data) => {
      console.log("Message received:", data);

      if (
        user?._id &&
        data.participants &&
        data.participants.includes(user._id)
      ) {
        const chatQueryKey = ["chatRoom", data.chatId];
        const existingChat = queryClient.getQueryData(chatQueryKey);

        if (!data.message.user || typeof data.message.user !== "object") {
          if (data.sender === user._id || data.message.userId === user._id) {
            data.message.user = {
              _id: user._id,
              firstName: user.firstName || "",
              lastName: user.lastName || "",
              name: user.name || "",
              avatar: user.avatar || "/default-avatar.png",
            };
          } else if (existingChat && existingChat.participants) {
            const otherUser = existingChat.participants.find(
              (p) =>
                p._id === data.sender || p._id === data.message.userId
            );
            if (otherUser) {
              data.message.user = {
                _id: otherUser._id,
                firstName: otherUser.firstName || "",
                lastName: otherUser.lastName || "",
                name: otherUser.name || "",
                avatar: otherUser.avatar || "/default-avatar.png",
              };
            }
          }
        }

        if (existingChat) {
          queryClient.setQueryData(chatQueryKey, (old) => {
            if (!old) return old;
            return {
              ...old,
              chat: [...(old.chat || []), data.message],
              lastMessage: {
                user: data.message.user || { _id: data.sender },
                message: data.message.message,
                time: data.message.time,
              },
            };
          });
        }

        queryClient.invalidateQueries({ queryKey: ["chatlist"] });
      }
    });

    socket.on("disconnect", () => {
      console.log("Disconnected from socket server");
    });

    return () => {
      socket.off("connect");
      socket.off("user_registered");
      socket.off("friend_added");
      socket.off("friend_removed");
      socket.off("chat_deleted");
      socket.off("friend_request_received");
      socket.off("message_sent");
      socket.off("disconnect");
    };
  }, [savedToken, queryClient, user, setUser, fetchUserFromServer]);
};

export default useSocketListeners;
