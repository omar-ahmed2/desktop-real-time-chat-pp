import { useContext, useState } from "react";
import "./SignIn.css";
import AuthContext from "../../../../authContext.jsx";
import { useUsers } from '../../../../hooks/useUsers.js'; 
import { useQueryClient } from '@tanstack/react-query';

import TextInput from '../FormInputs/TextInput';
import PasswordInput from '../FormInputs/PasswordInput';

const SignIn = () => {
  const queryClient = useQueryClient();
  const [showPassword, setShowPassword] = useState(false);
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
        await queryClient.refetchQueries({ queryKey: ['users'] });
      } else {
        console.error("Sign in failed:", result.message);
      }
    } catch (error) {
      console.error("Error during sign in:", error);
    }
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
