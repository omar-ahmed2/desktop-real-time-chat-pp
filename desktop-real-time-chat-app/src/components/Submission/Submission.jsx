import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Submission.css';

const Submission = () => {
  const navigate = useNavigate();

  return (
    <div className="submission-container">
      <div className="card">
        <div className="success-icon animate-1">✓</div>
        <h1 className="submission-title animate-2">Thanks for submission</h1>
        <button
          className="submit-button animate-3"
          onClick={() => navigate('/')}
        >
          Back to Sign In Page
        </button>
      </div>
    </div>
  );
};

export default Submission; 