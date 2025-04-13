import React from 'react';
import SignInTitle from '../SignInTitle/SignInTitle';
import SocialLinks from '../SocialLinks/SocialLinks';
import EmailInput from '../EmailInput/EmailInput';
import PasswordInput from '../PasswordInput/PasswordInput';
import SubmitButton from '../SubmitButton/SubmitButton';
import './Card.css';

const Card = () => {
  return (
    <div className="card-container">
      <div className="card">
        <SignInTitle />
        <SocialLinks />
        <div className="divider">
          <span>Or Sign in with Email</span>
        </div>
        <div className="form-container">
          <EmailInput />
          <PasswordInput />
          <div className="options-row">
            <label className="keep-logged">
              <input type="checkbox" />
              <span>Keep me logged in</span>
            </label>
            <a href="#" className="forgot-password">Forgot password?</a>
          </div>
          <SubmitButton />
          <div className="signup-prompt">
            <span>Don't have an account?</span>
            <a href="#" className="signup-link">Sign up</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card; 