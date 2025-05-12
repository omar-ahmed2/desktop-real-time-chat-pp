import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import SignIn from "./components/login/signup/SignIn/SignIn";
import SignUp from "./components/login/signup/SignUp/SignUp";
import ForgetPassword from "./components/login/signup/ForgetPassword/ForgetPassword";
import Verification from "./components/login/signup/Verification/Verification";
import Submission from "./components/login/signup/Submission/Submission";
import ChatLayout from "./components/Chat/ChatLayout";
import Settings from "./components/Settings/Settings";
import Contacts from "./components/Contacts/Contacts";
import "./App.css";
import Groups from "./components/Groups/Groups";
import { AuthProvider } from "./authContext.jsx";
import ProtectedRoute from "./protectedRoute.jsx";
import useSocketListener from "./hooks/useSocketListener.js";
const App = () => {
  useSocketListener();
  return (
    <BrowserRouter>
      <AuthProvider>
          <div className="app">
            <Routes>
              <Route path="/" element={<SignIn />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/forget-password" element={<ForgetPassword />} />
              <Route path="/verification" element={<Verification />} />
              <Route path="/submission" element={<Submission />} />
              <Route
                path="/chat"
                element={
                  <ProtectedRoute>
                    <ChatLayout />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/settings"
                element={
                  <ProtectedRoute>
                    <Settings />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/contacts"
                element={
                  <ProtectedRoute>
                    <Contacts />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/groups"
                element={
                  <ProtectedRoute>
                    <Groups />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </div>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
