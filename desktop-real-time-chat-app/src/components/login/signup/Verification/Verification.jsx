import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './Verification.css';

const Verification = () => {
  const navigate = useNavigate();
  const [code, setCode] = useState(['', '', '', '']);
  const inputRefs = [useRef(), useRef(), useRef(), useRef()];

  const handleChange = (index, value) => {
    if (!/^[0-9]*$/.test(value)) return;

    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    // Move to next input if value is entered
    if (value !== '' && index < 3) {
      inputRefs[index + 1].current.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    // Move to previous input on backspace if current input is empty
    if (e.key === 'Backspace' && index > 0 && code[index] === '') {
      inputRefs[index - 1].current.focus();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/submission');
  };

  return (
    <div className="verification-container">
      <div className="card">
        <h1 className="verification-title">Verification</h1>
        <p className="description">
          Enter the 4-digit code we sent to your phone
        </p>
        <form className="form-container" onSubmit={handleSubmit}>
          <div className="code-inputs">
            {code.map((digit, index) => (
              <input
                key={index}
                ref={inputRefs[index]}
                type="text"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                className={`code-input animate-${index + 1}`}
              />
            ))}
          </div>
          <button type="submit" className="submit-button animate-5">
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default Verification; 