import React from 'react';
import './MessageInput.css';

const MessageInput = () => {
  return (
    <>
      <div className='flex justify-center animate-slide-up ' >
        <button className="action-btn scale-8 align-self-center">
          <img src="/images/attachment.png"  />
        </button>

        <form action="" className="flex ">
          <input type="text" placeholder="Type your message..." className="message-input" />
        </form>

        <button className="action-btn scale-8 align-self-center  ">
          <img src="/images/camera.png"  />
        </button>

        <button className="action-btn scale-8 align-self-center  ">
          <img src="/images/microphone.png"  />
        </button>
      </div>
    </>
  );
};

export default MessageInput; 

