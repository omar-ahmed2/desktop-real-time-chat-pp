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
    if (savedUser && savedToken) {
      const isExpired = checkTokenExpiration(savedToken);
      if (isExpired) {
        logout(); // auto logout if token expired
      } else {
        setUser(JSON.parse(savedUser));
        setToken(savedToken);
        if (location.pathname === '/') {
          navigate('/chat');
        }
      }
    }

    // Set up an interval to check token expiration every 5 seconds
    const intervalId = setInterval(() => {
      if (token) {
        const isExpired = checkTokenExpiration(token);
        if (isExpired) {
          logout(); // auto logout if token expired
        }
      }
      if (sessionStorage.getItem('token') != savedToken)
        {
        logout();
      }
    }, 5000); // Check every 5000ms (5 seconds)

    // Clean up the interval when the component is unmounted or token changes
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
