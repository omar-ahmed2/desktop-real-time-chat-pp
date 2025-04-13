import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignIn from './components/SignIn/SignIn';
import SignUp from './components/SignUp/SignUp';
import ForgetPassword from './components/ForgetPassword/ForgetPassword';
import Verification from './components/Verification/Verification';
import Submission from './components/Submission/Submission';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/forget-password" element={<ForgetPassword />} />
          <Route path="/verification" element={<Verification />} />
          <Route path="/submission" element={<Submission />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
