import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SignIn from './components/login/signup/SignIn/SignIn';
import SignUp from './components/login/signup/SignUp/SignUp';
import ForgetPassword from './components/login/signup/ForgetPassword/ForgetPassword';
import Verification from './components/login/signup/Verification/Verification';
import Submission from './components/login/signup/Submission/Submission';
import ChatLayout from './components/Chat/ChatLayout';
import Settings from "./components/Settings/Settings";
import Contacts from "./components/Contacts/Contacts";
import './App.css';
import Groups from './components/Groups/Groups';

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
          <Route path="/settings" element={<Settings />} />
          <Route path="/contacts" element={<Contacts />} />
          <Route path="/groups" element={<Groups />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
