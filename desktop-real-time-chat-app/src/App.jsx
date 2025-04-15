import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SignIn from './components/SignIn/SignIn';
import SignUp from './components/SignUp/SignUp';
import ForgetPassword from './components/ForgetPassword/ForgetPassword';
import Verification from './components/Verification/Verification';
import Submission from './components/Submission/Submission';
import ChatLayout from './components/Chat/ChatLayout';
import Chat from './components/Chat/Chat';
import Settings from "./components/Settings/Settings";
import './App.css';

const App = () => {
  return (
    <BrowserRouter>
      <div className="app">
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/forget-password" element={<ForgetPassword />} />
          <Route path="/verification" element={<Verification />} />
          <Route path="/submission" element={<Submission />} />
          <Route path="/chat" element={<ChatLayout />} />
          <Route path="/chat-old" element={<Chat />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
