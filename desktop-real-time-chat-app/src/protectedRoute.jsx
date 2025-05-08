import { Navigate } from 'react-router-dom';
import { useAuth } from './authContext';
import { jwtDecode } from 'jwt-decode';


const ProtectedRoute = ({ children }) => {
  const { token } = useAuth();

  const isTokenValid = (token) => {
    try {
      const decoded = jwtDecode(token);
      return decoded.exp > Date.now() / 1000;  // Check if token has expired
    } catch (e) {
      return false;  // Invalid token
    }
  };

  return token && isTokenValid(token) ? children : <Navigate to="/" />;
};

export default ProtectedRoute;