import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SignIn.css";
import AuthContext from "../../../../authContext.jsx";
const SignIn = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { login } = useContext(AuthContext); // Get login function from context
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    const postData = {
      email: data.email,
      password: data.password,
    };
    try {
      const response = await fetch("http://localhost:3000/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postData),
      });
      const result = await response.json();
      if (response.ok) {
        login(result.user, result.token);
        console.log("Sign in successful:", result);
      } else {
        console.error("Sign in failed:", result.message);
      }
    } catch (error) {
      console.error("Error during sign in:", error);
    }
    // navigate('/chat');
  };

  return (
    <div className="signin-container">
      <div className="card">
        <h1 className="signin-title">Sign In</h1>
        <form className="form-container" onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="password">Password</label>
            <div className="password-input">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
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
