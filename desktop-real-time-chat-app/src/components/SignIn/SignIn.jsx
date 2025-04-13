import React from 'react';
import { useNavigate } from 'react-router-dom';
import SocialLinks from '../SocialLinks/SocialLinks';
import './SignIn.css';

const SignIn = () => {
  const navigate = useNavigate();

  return (
    <div className="card-container">
      <div className="card">
        <h1 className="signin-title">Sign In</h1>
        <SocialLinks />
        <div className="divider">
          <span>Or Sign in with Email</span>
        </div>
        <form className="form-container">
          <div className="input-group">
            <label>Email</label>
            <input
              type="email"
              placeholder="Enter your Email"
              className="input-field"
            />
          </div>
          <div className="input-group">
            <label>Password</label>
            <div className="password-field">
              <input
                type="password"
                placeholder="Enter password"
                className="input-field"
              />
              <button type="button" className="toggle-password">
                <svg viewBox="0 0 24 24" width="20" height="20">
                  <path fill="#666" d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/>
                </svg>
              </button>
            </div>
          </div>
          <div className="options-row">
            <label className="keep-logged">
              <input type="checkbox" />
              <span>Keep me logged in</span>
            </label>
            <a
              href="#"
              className="forgot-password"
              onClick={(e) => {
                e.preventDefault();
                navigate('/forget-password');
              }}
            >
              Forgot password?
            </a>
          </div>
          <button type="submit" className="submit-button">Sign In</button>
          <div className="signup-prompt">
            <span>Don't have an account?</span>
            <a
              href="#"
              className="signup-link"
              onClick={(e) => {
                e.preventDefault();
                navigate('/signup');
              }}
            >
              Sign up
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignIn; 