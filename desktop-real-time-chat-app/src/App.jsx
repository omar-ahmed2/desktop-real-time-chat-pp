import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import SignIn from "./components/login/signup/SignIn/SignIn";
import SignUp from "./components/login/signup/SignUp/SignUp";
import Submission from "./components/login/signup/Submission/Submission";
import ChatLayout from "./components/Chat/ChatLayout";
import SettingsProfile from "./components/profile/SettingsProfile";
import Contacts from "./components/Contacts/Contacts";
import "./App.css";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Loading from "./components/Loading/loading";
import Error from "./components/Error/error";

import Groups from "./components/Groups/Groups";
import { AuthProvider } from "./authContext.jsx";
import ProtectedRoute from "./protectedRoute.jsx";
import useSocketListener from "./hooks/useSocketListener.js";

const queryClient = new QueryClient(); // Initialize QueryClient outside the component

const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Only show loading while essential resources are being loaded
    const loadEssentialResources = async () => {
      try {
        // Add any essential resource loading here
        // For example: await loadFonts(), await loadInitialData(), etc.
        setIsLoading(false);
      } catch (error) {
        console.error('Error loading resources:', error);
        setIsLoading(false);
      }
    };

    loadEssentialResources();
  }, []);

  return (
    <BrowserRouter>
      <AuthProvider>
        <QueryClientProvider client={queryClient}>
          <Loading isLoading={isLoading} />
          {/* Only initialize socket listener when not loading */}
          {!isLoading && <SocketListenerInitializer />}
          <div className="app">
            <Routes>
              <Route path="/" element={<SignIn />} />
              <Route path="/signup" element={<SignUp />} />
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
                path="/profile"
                element={
                  <ProtectedRoute>
                    <SettingsProfile />
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
              <Route path="*" element={<Error />} />
            </Routes>
          </div>
        </QueryClientProvider>
      </AuthProvider>
    </BrowserRouter>
  );
};

// Small utility component that just initializes the socket listener
// This keeps the hook usage clean while avoiding unnecessary re-renders
const SocketListenerInitializer = () => {
  useSocketListener();
  return null; // This component doesn't render anything
};

export default App;