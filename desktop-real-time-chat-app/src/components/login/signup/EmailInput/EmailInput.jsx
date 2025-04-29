import React from 'react';
import './EmailInput.css';

const EmailInput = () => {
  return (
    <div className="input-group">
      <label>Email</label>
      <input
        type="email"
        placeholder="Enter your Email"
        className="email-input"
      />
    </div>
  );
};

export default EmailInput; 