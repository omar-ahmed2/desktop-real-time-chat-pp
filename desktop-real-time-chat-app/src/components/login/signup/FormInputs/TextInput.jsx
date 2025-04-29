import React from 'react';
import './FormInputs.css';

const TextInput = ({ label, type = 'text', placeholder, className = '' }) => {
  const handleKeyPress = (e) => {
    if (type === 'tel' && !/[0-9]/.test(e.key) && e.key !== 'Backspace' && e.key !== 'Delete' && e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') {
      e.preventDefault();
    }
  };

  const handlePaste = (e) => {
    if (type === 'tel') {
      const pastedText = e.clipboardData.getData('text');
      if (!/^\d*$/.test(pastedText)) {
        e.preventDefault();
      }
    }
  };

  return (
    <div className={`input-group ${className}`}>
      <label>{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        className="input-field"
        onKeyDown={handleKeyPress}
        onPaste={handlePaste}
        pattern={type === 'tel' ? '[0-9]*' : undefined}
        inputMode={type === 'tel' ? 'numeric' : undefined}
      />
    </div>
  );
};

export default TextInput; 