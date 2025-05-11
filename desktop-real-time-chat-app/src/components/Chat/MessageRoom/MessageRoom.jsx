import React from "react";
import "./MessageRoom.css";
import { useEffect, useRef } from "react";

const MessageRoom = (currentChatId) => {
  if (currentChatId.message === null) {
    currentChatId = 1;
  } else {
    currentChatId = currentChatId.message;
  }
  //fetch mock up data from another file
  //suppose messages contains the mockup data
  //message room is only one, and therefore it can has one state making it either group or not grouped
  const messages = [
    {
      chatId: 1,
      isgroup: false,
      chat: [
        {
          id: 1,
          user: "Omar Ahmed",
          avatar: "/images/Omar Ahmed.png",
          message:
            "Hey team! I've finished the initial designs for the new project. Take a look when you can.",
          time: "10:32 AM",
          isOwn: false,
        },
        {
          id: 2,
          user: "Kareem Hassan",
          message: "Great work Omar! The color scheme looks perfect 👍",
          time: "10:35 AM",
          isOwn: true,
        },
        {
          id: 3,
          user: "Omar Ahmed",
          avatar: "/images/Omar Ahmed.png",
          message:
            "Thanks! I was thinking we could add some subtle animations to make it more engaging.",
          time: "10:36 AM",
          isOwn: false,
        },
      ],
    },
    {
      chatId: 2,
      isgroup: false,
      chat: [
        {
          id: 1,
          user: "Sarah Ali",
          avatar: "/images/Sarah Ali.png",
          message:
            "Hey team! I've just completed the initial mockups for the new project. Check them out when you get a chance.",
          time: "10:32 AM",
          isOwn: false,
        },
        {
          id: 2,
          user: "Kareem Hassan",
          message:
            "Nice work, Sarah! The design layout is coming along really well.",
          time: "10:35 AM",
          isOwn: true,
        },
        {
          id: 3,
          user: "Sarah Ali",
          avatar: "/images/Sarah Ali.png",
          message:
            "Thank you! I’m considering adding some smooth animations to make it more interactive.",
          time: "10:36 AM",
          isOwn: false,
        },
      ],
    },
    {
      chatId: 3,
      isgroup: false,
      chat: [
        {
          id: 1,
          user: "Gamal Micheal",
          avatar: "/images/gamal.png",
          message:
            "Hey team! I've just completed the initial mockups for the new project. Check them out when you get a chance.",
          time: "10:32 AM",
          isOwn: false,
        },
        {
          id: 2,
          user: "Karem Hassan",
          message:
            "Nice work, Gamal! The design layout is coming along really well.",
          time: "10:35 AM",
          isOwn: true,
        },
        {
          id: 3,
          user: "Gamal Micheal",
          avatar: "/images/gamal.png",
          message:
            "Thank you! I’m considering adding some smooth animations to make it more interactive.",
          time: "10:36 AM",
          isOwn: false,
        },
      ],
    },
    {
      chatId: 4,
      isgroup: false,
      chat: [
        {
          id: 1,
          user: "Moataz Tamer",
          avatar: "/images/moataz.png",
          message:
            "Hey team! I've just completed the initial mockups for the new project. Check them out when you get a chance.",
          time: "10:32 AM",
          isOwn: false,
        },
        {
          id: 2,
          user: "Kareem Hassan",
          message:
            "Nice work, Moataz! The design layout is coming along really well.",
          time: "10:35 AM",
          isOwn: true,
        },
        {
          id: 3,
          user: "Moataz Tamer",
          avatar: "/images/moataz.png",
          message:
            "Thank you! I’m considering adding some smooth animations to make it more interactive.",
          time: "10:36 AM",
          isOwn: false,
        },
      ],
    },
    {
      chatId: 5,
      isgroup: false,
      chat: [
        {
          id: 1,
          user: "Amir Wagdy",
          avatar: "/images/amir.png",
          message:
            "Hey team! I've just completed the initial mockups for the new project. Check them out when you get a chance.",
          time: "10:32 AM",
          isOwn: false,
        },
        {
          id: 2,
          user: "Kareem Hassan",
          message:
            "Nice work, Amir! The design layout is coming along really well.",
          time: "10:35 AM",
          isOwn: true,
        },
        {
          id: 3,
          user: "Amir Wagdy",
          avatar: "/images/amir.png",
          message:
            "Thank you! I’m considering adding some smooth animations to make it more interactive.",
          time: "10:36 AM",
          isOwn: false,
        },
      ],
    },
    {
      chatId: 6,
      isgroup: false,
      chat: [
        {
          id: 1,
          user: "Mohamed Shawky",
          avatar: "/images/mohamed.png",
          message:
            "Hey team! I've just completed the initial mockups for the new project. Check them out when you get a chance.",
          time: "10:32 AM",
          isOwn: false,
        },
        {
          id: 2,
          user: "Kareem Hassan",
          message:
            "Nice work, Mohamed! The design layout is coming along really well.",
          time: "10:35 AM",
          isOwn: true,
        },
        {
          id: 3,
          user: "Mohamed Shawky",
          avatar: "/images/mohamed.png",
          message:
            "Thank you! I’m considering adding some smooth animations to make it more interactive.",
          time: "10:36 AM",
          isOwn: false,
        },
      ],
    },
    {
      chatId: 7,
      isgroup: false,
      chat: [
        {
          id: 1,
          user: "Eng. Sayed Safwet",
          avatar: "/images/eng.sayed.png",
          message:
            "Hey team! I've just completed the initial mockups for the new project. Check them out when you get a chance.",
          time: "10:32 AM",
          isOwn: false,
        },
        {
          id: 2,
          user: "Kareem Hassan",
          message:
            "Nice work, Eng. Sayed! The design layout is coming along really well.",
          time: "10:35 AM",
          isOwn: true,
        },
        {
          id: 3,
          user: "Eng. Sayed Safwet",
          avatar: "/images/eng.sayed.png",
          message:
            "Thank you! I’m considering adding some smooth animations to make it more interactive.",
          time: "10:36 AM",
          isOwn: false,
        },
      ],
    },
    {
      chatId: 8,
      isgroup: false,
      chat: [
        {
          id: 1,
          user: "Mai Mohamed",
          avatar: "/images/mai.png",
          message:
            "Hey team! I've just completed the initial mockups for the new project. Check them out when you get a chance.",
          time: "10:32 AM",
          isOwn: false,
        },
        {
          id: 2,
          user: "Kareem Hassan",
          message:
            "Nice work, Mai! The design layout is coming along really well.",
          time: "10:35 AM",
          isOwn: true,
        },
        {
          id: 3,
          user: "Mai Mohammed",
          avatar: "/images/mai.png",
          message:
            "Thank you! I’m considering adding some smooth animations to make it more interactive.",
          time: "10:36 AM",
          isOwn: false,
        },
      ],
    },  
    {
      chatId: 9,
      isgroup: false,
      chat: [
        {
          id: 1,
          user: "Kenzi Mohamed",
          avatar: "/images/kenzi.png",
          message:
            "Hey team! I've just completed the initial mockups for the new project. Check them out when you get a chance.",
          time: "10:32 AM",
          isOwn: false,
        },
        {
          id: 2,
          user: "Kareem Hassan",
          message:
            "Nice work, Kenzi! The design layout is coming along really well.",
          time: "10:35 AM",
          isOwn: true,
        },
        {
          id: 3,
          user: "Kenzi Mohamed",
          avatar: "/images/kenzi.png",
          message:
            "Thank you! I’m considering adding some smooth animations to make it more interactive.",
          time: "10:36 AM",
          isOwn: false,
        },
      ],
    },
    
  ];
  const scrollRef = useRef(null);
  useEffect(() => {
    const scrollElement = scrollRef.current;
    scrollElement.scrollTop = scrollElement.scrollHeight;
  }, [currentChatId]);

  return (
    <div className="message-list" ref={scrollRef}>
      <div className="messages-container">
        {messages
          .find((msg) => msg.chatId === currentChatId)
          .chat.map((message, index) => (
            <div
              key={message.id}
              className={`message-item ${
                message.isOwn ? "own-message" : ""
              } animate-fade-in`}
              style={{ animationDelay: `${0.2 + index * 0.1}s` }}
            >
              {!message.isOwn && (
                <img
                  src={message.avatar}
                  alt={message.user}
                  className="message-avatar"
                />
              )}
              <div className="message-content">
                {!message.isOwn && (
                  <div className="message-user">{message.user}</div>
                )}
                <div className="message-bubble">{message.message}</div>
                <div className="message-time">{message.time}</div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default MessageRoom;
