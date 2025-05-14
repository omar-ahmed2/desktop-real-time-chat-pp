import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../authContext";
import "./error.css";
// @ts-ignore
import errorImage from "./error.jpg";

const Error = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const handleReturn = () => {
    if (isAuthenticated) {
      navigate("/chat");
    } else {
      navigate("/");
    }
  };

  return (
    <div className="error-container">        
      <div className="error-content">
        <img src={errorImage} alt="Error Image" className="error-image" />
        <h1>Oops!</h1>
        <h2>Something went wrong</h2>
        <p>The page you're looking for doesn't exist or an error occurred.</p>
        <button className="return-button" onClick={handleReturn}>
          Return to Chat
        </button>
      </div>
    </div>
  );
};

export default Error;

