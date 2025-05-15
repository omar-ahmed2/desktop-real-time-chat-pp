import React, { useEffect, useRef, memo, useMemo, useCallback } from "react";
import "./MessageRoom.css";
import { useChatroom } from "../../../hooks/useChatroom";
import authContext from "../../../authContext";
import { useContext } from "react";

// Individual message component to prevent full list rerenders
const MessageItem = memo(
  ({ message, isOwnMessage, displayName, messageTime, isNewMessage }) => {
    return (
      <div
        className={`message-item ${
          isOwnMessage ? "own-message" : ""
        } animate-fade-in`}
        style={{ animationDelay: isNewMessage ? "0.1s" : "0s" }}
      >

        {!isOwnMessage && (
          <img
            src={message.user?.avatar || "/default-avatar.png"}
            alt={displayName}
            className="message-avatar"
            loading="lazy"
          />
        )}
        <div className="message-content">
          {!isOwnMessage && <div className="message-user">{displayName}</div>}
          <div className="message-bubble">{message.message}</div>
          <div className="message-time">{messageTime}</div>
        </div>
      </div>
    );
  }
);

const MessageList = memo(({ messages, currentUserId, newMessageIds }) => {
  const processedMessages = useMemo(() => {
    return messages.map((message, index) => {
      const isOwnMessage = message.user?._id === currentUserId;

      const displayName = message.user
        ? message.user.firstName && message.user.lastName
          ? `${message.user.firstName} ${message.user.lastName}`
          : message.user.name ||
            (message.user._id === currentUserId ? "You" : "User")
        : message.userId === currentUserId
        ? "You"
        : "User";

      const messageTime = new Date(message.time).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });

      const isNewMessage = newMessageIds.has(message._id); //checks for new message to animate

      return {
        message,
        isOwnMessage,
        displayName,
        messageTime,
        id: message._id || `message-${index}`,
        isNewMessage,
      };
    });
  }, [messages, currentUserId, newMessageIds]);

  return (
    <>
      {processedMessages.map(
        ({
          message,
          isOwnMessage,
          displayName,
          messageTime,
          id,
          isNewMessage,
        }) => (
          <MessageItem
            key={id}
            message={message}
            isOwnMessage={isOwnMessage}
            displayName={displayName}
            messageTime={messageTime}
            isNewMessage={isNewMessage}
          />
        )
      )}
    </>
  );
});

const MessageRoom = memo(({ selectedChatId, setSelectedUser }) => {
  const { user } = useContext(authContext);

  const currentUserId = useMemo(() => user?._id, [user?._id]);

  const chatId = useMemo(() => selectedChatId, [selectedChatId]);

  const { data: chatData, isLoading, error } = useChatroom(chatId);

  const messages = useMemo(() => chatData?.chat || [], [chatData?.chat]);

  const newMessageIdsRef = useRef(new Set()); //to prevent rerender
  const prevMessageIdsRef = useRef(new Set());
  const initialRenderRef = useRef(true);
  const animationTimeoutRef = useRef(null);

  useEffect(() => {
    if (!messages.length) return;

    if (initialRenderRef.current) {
      prevMessageIdsRef.current = new Set(messages.map((msg) => msg._id));
      initialRenderRef.current = false;
      return;
    }

    const currentMessageIds = new Set(messages.map((msg) => msg._id));

    currentMessageIds.forEach((id) => {
      if (!prevMessageIdsRef.current.has(id)) {
        newMessageIdsRef.current.add(id);
      }
    });

    if (animationTimeoutRef.current) {
      clearTimeout(animationTimeoutRef.current);
    }

    if (newMessageIdsRef.current.size > 0) {
      animationTimeoutRef.current = setTimeout(() => {
        newMessageIdsRef.current = new Set();
        forceUpdate();
      }, 1000);
    }

    prevMessageIdsRef.current = currentMessageIds;
  }, [messages]);

  useEffect(() => {
    initialRenderRef.current = true;
    prevMessageIdsRef.current = new Set();
    newMessageIdsRef.current = new Set();

    if (animationTimeoutRef.current) {
      clearTimeout(animationTimeoutRef.current);
      animationTimeoutRef.current = null;
    }
  }, [selectedChatId]);

  const [, forceRender] = React.useState({});
  const forceUpdate = useCallback(() => forceRender({}), []);

  useEffect(() => {
    if (!chatData || isLoading) return;

    if (chatData.participants && chatData.participants.length > 0) {
      const otherUser = chatData.participants.find(
        (participant) => participant._id !== currentUserId
      );

      if (otherUser) {
        setSelectedUser({
          _id: otherUser._id,
          firstName: otherUser.firstName || "",
          lastName: otherUser.lastName || "",
          name: otherUser.name || "",
          avatar: otherUser.avatar || "/default-avatar.png",
        });
      }
    }
  }, [chatData, isLoading, currentUserId, setSelectedUser]);

  const scrollRef = useRef(null);

  const scrollToBottom = useCallback(() => {
    if (!scrollRef.current) return;

    const scrollElement = scrollRef.current;
    scrollElement.scrollTop = scrollElement.scrollHeight;
  }, []);

  useEffect(() => {
    if (scrollRef.current && !isLoading && newMessageIdsRef.current.size > 0) {
      scrollToBottom();
    }
  }, [isLoading, scrollToBottom, messages]);

  useEffect(() => {
    if (scrollRef.current && !isLoading && messages.length > 0) {
      scrollToBottom();
    }
  }, [isLoading, messages.length, scrollToBottom]);

  if (isLoading) {
    return <div className="message-list loading">Loading messages...</div>;
  }

  if (error) {
    return (
      <div className="message-list error">
        Error loading messages: {error.message}
      </div>
    );
  }

  if (!messages.length) {
    return (
      <div className="message-list empty">
        No messages in this conversation yet.
      </div>
    );
  }

  return (
    <div className="message-list" ref={scrollRef}>
      <div className="messages-container">
        <MessageList
          messages={messages}
          currentUserId={currentUserId}
          newMessageIds={newMessageIdsRef.current}
        />
      </div>
    </div>
  );
});

export default MessageRoom;
