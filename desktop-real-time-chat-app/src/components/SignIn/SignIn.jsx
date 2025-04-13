import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SignIn.css';

const SignIn = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add authentication logic here
    navigate('/chat');
  };

  return (
    <div className="signin-container">
      <div className="card">
        <h1 className="signin-title">Sign In</h1>
        
        <div className="social-buttons">
          <button type="button" className="social-button google">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M21.8055 10.0415H21V10H12V14H17.6515C16.827 16.3285 14.6115 18 12 18C8.6865 18 6 15.3135 6 12C6 8.6865 8.6865 6 12 6C13.5295 6 14.921 6.577 15.9805 7.5195L18.809 4.691C17.023 3.0265 14.634 2 12 2C6.4775 2 2 6.4775 2 12C2 17.5225 6.4775 22 12 22C17.5225 22 22 17.5225 22 12C22 11.3295 21.931 10.675 21.8055 10.0415Z" fill="#FFC107"/>
              <path d="M3.15302 7.3455L6.43852 9.755C7.32752 7.554 9.48052 6 12 6C13.5295 6 14.921 6.577 15.9805 7.5195L18.809 4.691C17.023 3.0265 14.634 2 12 2C8.15902 2 4.82802 4.1685 3.15302 7.3455Z" fill="#FF3D00"/>
              <path d="M12 22C14.583 22 16.93 21.0115 18.7045 19.404L15.6095 16.785C14.5717 17.5742 13.3037 18.0011 12 18C9.39897 18 7.19047 16.3415 6.35847 14.027L3.09747 16.5395C4.75247 19.778 8.11347 22 12 22Z" fill="#4CAF50"/>
              <path d="M21.8055 10.0415H21V10H12V14H17.6515C17.2571 15.1082 16.5467 16.0766 15.608 16.7855L15.6095 16.785L18.7045 19.404C18.4855 19.6025 22 17 22 12C22 11.3295 21.931 10.675 21.8055 10.0415Z" fill="#1976D2"/>
            </svg>
          </button>
          <button type="button" className="social-button facebook">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M24 12C24 5.37258 18.6274 0 12 0C5.37258 0 0 5.37258 0 12C0 17.9895 4.3882 22.954 10.125 23.8542V15.4688H7.07812V12H10.125V9.35625C10.125 6.34875 11.9166 4.6875 14.6576 4.6875C15.9701 4.6875 17.3438 4.92188 17.3438 4.92188V7.875H15.8306C14.34 7.875 13.875 8.80008 13.875 9.75V12H17.2031L16.6711 15.4688H13.875V23.8542C19.6118 22.954 24 17.9895 24 12Z" fill="#1877F2"/>
              <path d="M16.6711 15.4688L17.2031 12H13.875V9.75C13.875 8.80102 14.34 7.875 15.8306 7.875H17.3438V4.92188C17.3438 4.92188 15.9701 4.6875 14.6576 4.6875C11.9166 4.6875 10.125 6.34875 10.125 9.35625V12H7.07812V15.4688H10.125V23.8542C11.3674 24.0486 12.6326 24.0486 13.875 23.8542V15.4688H16.6711Z" fill="white"/>
            </svg>
          </button>
          <button type="button" className="social-button twitter">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M21.533 7.11175C21.5482 7.32494 21.5482 7.53817 21.5482 7.75136C21.5482 14.2539 16.599 21.7463 7.55283 21.7463C4.76714 21.7463 2.17776 20.9391 0 19.5382C0.395973 19.5838 0.776626 19.599 1.18781 19.599C3.48728 19.599 5.60407 18.8223 7.29444 17.4975C5.13199 17.4518 3.31979 16.0356 2.69542 14.0864C3 14.132 3.30455 14.1625 3.62432 14.1625C4.06612 14.1625 4.50793 14.1016 4.91912 13.9949C2.66499 13.5378 0.974582 11.5582 0.974582 9.1807V9.11987C1.62956 9.48474 2.39087 9.71312 3.19791 9.74371C1.87304 8.84692 1.00685 7.34005 1.00685 5.63461C1.00685 4.70723 1.25047 3.85572 1.67706 3.11473C4.09655 6.0766 7.73622 8.0714 11.8172 8.28456C11.7411 7.91973 11.6954 7.53972 11.6954 7.15967C11.6954 4.48401 13.8578 2.30615 16.5838 2.30615C18.0087 2.30615 19.2979 2.91543 20.2095 3.9125C21.3313 3.70441 22.4075 3.28785 23.3647 2.70915C23 3.86601 22.2081 4.70726 21.1776 5.24671C22.1777 5.13945 23.1474 4.86093 24.0284 4.4596C23.3648 5.31611 22.5138 6.07666 21.533 6.71047V7.11175Z" fill="#1DA1F2"/>
            </svg>
          </button>
        </div>

        <div className="divider">
          <span>Or sign in with Email</span>
        </div>

        <form className="form-container" onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="password">Password</label>
            <div className="password-input">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                placeholder="Enter your password"
                required
              />
              <button
                type="button"
                className="toggle-password"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "👁️" : "👁️‍🗨️"}
              </button>
            </div>
          </div>

          <div className="options-row">
            <label className="remember-me">
              <input type="checkbox" />
              Keep me logged in
            </label>
            <a href="/forget-password" className="forgot-password">
              Forgot password?
            </a>
          </div>

          <button type="submit" className="submit-button">
            Sign In
          </button>
        </form>

        <p className="signup-prompt">
          Don't have an account?
          <a href="/signup">Sign up</a>
        </p>
      </div>
    </div>
  );
};

export default SignIn; 