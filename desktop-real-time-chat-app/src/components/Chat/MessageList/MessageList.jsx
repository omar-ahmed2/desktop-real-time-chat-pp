import React from 'react';
import './MessageList.css';

const MessageList = () => {
  const messages = [
    {
      id: 1,
      user: 'Sarah Parker',
      avatar: <img src="/images/picProfile.png" />,
      message: 'Hey team! I\'ve finished the initial designs for the new project. Take a look when you can.',
      time: '10:32 AM',
      isOwn: false
    },
    {
      id: 2,
      user: 'John Doe',
      avatar: <img src="/images/picProfile.png" />,
      message: 'Great work Sarah! The color scheme looks perfect 👍',
      time: '10:35 AM',
      isOwn: true
    },
    {
      id: 3,
      user: 'Sarah Parker',
      avatar: <img src="/images/picProfile.png" />,
      message: 'Thanks! I was thinking we could add some subtle animations to make it more engaging.',
      time: '10:36 AM',
      isOwn: false
    }
  ];

  return (
    <div className="message-list">
      <div className="messages-container">
        {messages.map((message, index) => (
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

export default MessageList; 