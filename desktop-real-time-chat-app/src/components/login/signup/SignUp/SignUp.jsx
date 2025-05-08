import React from 'react';
import { useNavigate } from 'react-router-dom';
import './SignUp.css';
import TextInput from '../FormInputs/TextInput';
import PasswordInput from '../FormInputs/PasswordInput';

const SignUp = () => {
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    const postData = {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      phone: data.phoneNumber,
      password: data.password,
      confirmPassword: data.confirmPassword,
    }
    try {
      const response = await fetch('http://localhost:3000/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(postData),
      });
      const result = await response.json();
      if (response.ok) {
        console.log('Sign up successful:', result);
        navigate('/');
      } else {
        console.error('Sign up failed:', result.message);
      }
    } catch (error) {
      console.error('Error during sign up:', error);
    }
  }
  return (
    <div className="signup-container">
      <div className="card">
        <h1 className="signup-title">Sign Up</h1>
        
        
        <form className="form-container" onSubmit={handleSubmit}>
          <div className="name-row">
            <TextInput
              label="First Name"
              placeholder="Enter first name"
              className="animate-1"
              name = "firstName"
            />
            <TextInput
              label="Last Name"
              placeholder="Enter last name"
              className="animate-2"
              name = "lastName"
            />
          </div>
          <TextInput
            label="Phone Number"
            type="tel"
            placeholder="Enter phone number"
            className="animate-3"
            name = "phoneNumber"
          />
          <TextInput
            label="Email"
            type="email"
            placeholder="Enter your email"
            className="animate-4"
            name = "email"
          />
          <PasswordInput
            label="Password"
            placeholder="Create password"
            className="animate-5"
            name = "password"
          />
          <PasswordInput
            label="Confirm Password"
            placeholder="Confirm password"
            className="animate-6"
            name = "confirmPassword"
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