import React, { createContext, useState, useContext, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

// 🟢 Fixed fetchUserFromServer with correct body format
const fetchUserFromServer = async (token, userId) => {
  const response = await fetch('http://localhost:3000/api/getuser', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json', 
    },
    body: JSON.stringify({ userId }), 
  });

  if (!response.ok) throw new Error('Failed to fetch user');
  return response.json();
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const location = useLocation();

  // Store token expiration in state
  const [tokenExpiration, setTokenExpiration] = useState(null);

  const checkTokenExpiration = (token) => {
    try {
      const decoded = jwtDecode(token);
      return decoded.exp < Date.now() / 1000; // true if expired
    } catch {
      return true;
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    setTokenExpiration(null);
    sessionStorage.clear();
    navigate('/');
  };

  const login = (userData, userToken) => {
    setUser(userData);
    setToken(userToken);
    setTokenExpiration(jwtDecode(userToken).exp); // Save expiration time
    sessionStorage.setItem('user', JSON.stringify(userData));
    sessionStorage.setItem('token', userToken);
    navigate('/chat');
  };

  useEffect(() => {
    const savedToken = sessionStorage.getItem('token');

    const initializeAuth = async () => {
      if (!savedToken || checkTokenExpiration(savedToken)) {
        setLoading(false);
        return;
      }

      try {
        const savedUser = JSON.parse(sessionStorage.getItem('user'));
        const userFromServer = await fetchUserFromServer(savedToken, savedUser._id);
        
        setToken(savedToken);
        setUser(userFromServer);
        setTokenExpiration(jwtDecode(savedToken).exp); // Save expiration time
        sessionStorage.setItem('user', JSON.stringify(userFromServer));

        if (location.pathname === '/') {
          navigate('/chat');
        }
      } catch (err) {
        console.error('Error fetching user:', err);
        logout();
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();

    const intervalId = setInterval(() => {
      const currentToken = sessionStorage.getItem('token');
      if ((!currentToken || checkTokenExpiration(currentToken) ) && (location.pathname !== '/' &&location.pathname != '/signup')) 
        {
        logout();
      }
    }, 5000);

    return () => clearInterval(intervalId);
  }, [location.pathname]);

  const addFriend = (friendId) => {
    if (user && !user.friends.includes(friendId)) {
      const updatedUser = { ...user, friends: [...user.friends, friendId] };
      setUser(updatedUser);
      sessionStorage.setItem('user', JSON.stringify(updatedUser));
    }
  };

  const removeFriendAuth = (friendId) => {
    if (user) {
      const updatedUser = {
        ...user,
        friends: user.friends.filter((id) => id !== friendId),
      };
      setUser(updatedUser);
      sessionStorage.setItem('user', JSON.stringify(updatedUser));
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, token, loading, login, logout, addFriend, removeFriendAuth, setUser , fetchUserFromServer }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
