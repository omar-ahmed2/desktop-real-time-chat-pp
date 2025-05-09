import React, { createContext, useState, useContext, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const savedUser = sessionStorage.getItem('user');
    const savedToken = sessionStorage.getItem('token');
  
    if (savedUser && savedToken && savedUser !== 'undefined') {
      try {
        const parsedUser = JSON.parse(savedUser);
        const isExpired = checkTokenExpiration(savedToken);
        if (isExpired) {
          logout();
        } else {
          setUser(parsedUser);
          setToken(savedToken);
          if (location.pathname === '/') {
            navigate('/chat');
          }
        }
      } catch (error) {
        console.error('Failed to parse saved user:', error);
        logout();
      }
    }
  
    const intervalId = setInterval(() => {
      if (token) {
        const isExpired = checkTokenExpiration(token);
        if (isExpired) {
          logout();
        }
      }
      if (sessionStorage.getItem('token') !== savedToken) {
        logout();
      }
    }, 5000);
  
    return () => clearInterval(intervalId);
  }, [location, token, navigate]);
   

  const checkTokenExpiration = (token) => {
    try {
      const decoded = jwtDecode(token);
      return decoded.exp < Date.now() / 1000; // true if expired
    } catch (e) {
      return true; // treat errors as expired
    }
  };

  const login = (userData, userToken) => {
    setUser(userData);
    setToken(userToken);
    sessionStorage.setItem('user', JSON.stringify(userData));
    sessionStorage.setItem('token', userToken);
    navigate('/chat');
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    sessionStorage.removeItem('user');
    sessionStorage.removeItem('token');
    navigate('/');
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
