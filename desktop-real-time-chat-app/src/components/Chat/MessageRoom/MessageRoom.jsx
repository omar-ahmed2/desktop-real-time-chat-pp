import React from 'react';
import './MessageRoom.css';

const MessageRoom = (currentChatId) => {
  if (currentChatId.message===null){currentChatId = 1;}
  else{currentChatId = currentChatId.message;}
  //fetch mock up data from another file
  //suppose messages contains the mockup data
  //message room is only one, and therefore it can has one state making it either group or not grouped
  const messages = [
    {
      chatId: 1,
      chat:[
          {
        id: 1,
        user: 'Sarah Parker',
        avatar: "/images/picProfile.png",
        message: 'Hey team! I\'ve finished the initial designs for the new project. Take a look when you can.',
        time: '10:32 AM',
        isOwn: false,},
        { id: 2,
         user: 'John Doe',
         avatar: "/images/picProfile.png",
         message: 'Great work Sarah! The color scheme looks perfect 👍',
         time: '10:35 AM',
         isOwn: true},
         {
           id: 3,
           user: 'Sarah Parker',
           avatar: "/images/picProfile.png",
           message: 'Thanks! I was thinking we could add some subtle animations to make it more engaging.',
           time: '10:36 AM',
           isOwn: false
         },
         {
           id: 4,
           user: 'Sarah Parker',
           avatar: "/images/picProfile.png",
           message: 'Hey team! I\'ve finished the initial designs for the new project. Take a look when you can.',
           time: '10:32 AM',
           isOwn: false
         },
         {
           id: 5,
           user: 'John Doe',
           avatar: "/images/picProfile.png",
           message: 'Great work Sarah! The color scheme looks perfect 👍',
           time: '10:35 AM',
           isOwn: true
         },
         {
           id: 6,
           user: 'Sarah Parker',
           avatar: "/images/picProfile.png",
           message: 'Thanks! I was thinking we could add some subtle animations to make it more engaging.',
           time: '10:36 AM',
           isOwn: false
         }
      ]
    },
    {
      chatId: 2,
      chat: [
        {
          id: 1,
          user: 'Sarah Parker',
          avatar: "/images/picProfile.png",
          message: 'Hey team! I\'ve just completed the initial mockups for the new project. Check them out when you get a chance.',
          time: '10:32 AM',
          isOwn: false,
        },
        {
          id: 2,
          user: 'John Doe',
          avatar: "/images/picProfile.png",
          message: 'Nice work, Sarah! The design layout is coming along really well.',
          time: '10:35 AM',
          isOwn: true,
        },
        {
          id: 3,
          user: 'Sarah Parker',
          avatar: "/images/picProfile.png",
          message: 'Thank you! I’m considering adding some smooth animations to make it more interactive.',
          time: '10:36 AM',
          isOwn: false,
        },
        {
          id: 4,
          user: 'Sarah Parker',
          avatar: "/images/picProfile.png",
          message: 'Hey, I\'ve made a few changes to the design based on feedback. Let me know your thoughts.',
          time: '10:32 AM',
          isOwn: false,
        },
        {
          id: 5,
          user: 'John Doe',
          avatar: "/images/picProfile.png",
          message: 'I like the updates, Sarah! Maybe we can adjust the color palette slightly to give it a more modern look.',
          time: '10:35 AM',
          isOwn: true,
        },
        {
          id: 6,
          user: 'Sarah Parker',
          avatar: "/images/picProfile.png",
          message: 'Great idea, John! I’ll make the adjustments. I’ll send the revised version shortly.',
          time: '10:36 AM',
          isOwn: false,
        },
      ],
    }
  ];

  return (
    <div className="message-list">
      <div className="messages-container">
        {messages.find(msg => msg.chatId === currentChatId).chat.map((message, index) => (
          <div
            key={message.id}
            className={`message-item ${message.isOwn ? 'own-message' : ''} animate-fade-in`}
            style={{ animationDelay: `${0.2 + index * 0.1}s` }}
          >
            {!message.isOwn && (
              <img src={message.avatar} alt={message.user} className="message-avatar" />
            )}
            <div className="message-content">
              {!message.isOwn && (
                <div className="message-user">{message.user}</div>
              )}
              <div className="message-bubble">
                {message.message}
              </div>
              <div className="message-time">{message.time}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MessageRoom; 
