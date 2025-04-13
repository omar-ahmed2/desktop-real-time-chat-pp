import React from 'react';
import { useNavigate } from 'react-router-dom';
import './SignUp.css';
import SocialLinks from '../SocialLinks/SocialLinks';
import TextInput from '../FormInputs/TextInput';
import PasswordInput from '../FormInputs/PasswordInput';

const SignUp = () => {
  const navigate = useNavigate();

  return (
    <div className="signup-container">
      <div className="card">
        <h1 className="signup-title">Sign Up</h1>
        <SocialLinks />
        <div className="divider">
          <span>Or sign up with Email</span>
        </div>
        <form className="form-container">
          <div className="name-row">
            <TextInput
              label="First Name"
              placeholder="Enter first name"
              className="animate-1"
            />
            <TextInput
              label="Last Name"
              placeholder="Enter last name"
              className="animate-2"
            />
          </div>
          <TextInput
            label="Phone Number"
            type="tel"
            placeholder="Enter phone number"
            className="animate-3"
          />
          <TextInput
            label="Email"
            type="email"
            placeholder="Enter your email"
            className="animate-4"
          />
          <PasswordInput
            label="Password"
            placeholder="Create password"
            className="animate-5"
          />
          <PasswordInput
            label="Confirm Password"
            placeholder="Confirm password"
            className="animate-6"
          />
          <button type="submit" className="submit-button animate-7">
            Sign Up
          </button>
          <div className="signin-prompt animate-8">
            <span>Already have an account?</span>
            <a
              href="#"
              className="signin-link"
              onClick={(e) => {
                e.preventDefault();
                navigate('/');
              }}
            >
              Sign in
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp; 