import React from 'react';
import { useNavigate } from 'react-router-dom';
import TextInput from '../FormInputs/TextInput';
import './ForgetPassword.css';

const ForgetPassword = () => {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/verification');
  };

  return (
    <div className="forget-password-container">
      <div className="card">
        <h1 className="forget-title">Forget Password</h1>
        <p className="description">
          Enter your phone number to receive a verification code
        </p>
        <form className="form-container" onSubmit={handleSubmit}>
          <TextInput
            label="Phone Number"
            type="tel"
            placeholder="Enter your phone number"
            className="animate-1"
          />
          <button type="submit" className="submit-button animate-2">
            Send
          </button>
          <div className="back-prompt animate-3">
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                navigate('/');
              }}
            >
              Back to Sign In
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgetPassword; 