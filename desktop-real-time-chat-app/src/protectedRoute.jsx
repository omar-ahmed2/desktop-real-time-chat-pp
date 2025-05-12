import { Navigate } from 'react-router-dom';
import { useAuth } from './authContext';
import { jwtDecode } from 'jwt-decode';

const ProtectedRoute = ({ children }) => {
  const { token, loading, logout } = useAuth(); // Access loading from AuthContext

  const isTokenValid = (token) => {
    try {
      const decoded = jwtDecode(token);
      return decoded.exp > Date.now() / 1000;  // Check if token has expired
    } catch (e) {
      return false;  // Invalid token
    }
  };

  if (loading) {
    return <div>Loading...</div>;  // You can customize the loading state here
  }

  if (!token || !isTokenValid(token)) {
    logout(); // If the token is invalid or expired, log out
    return <Navigate to="/" />;  // Redirect to the login page
  }

  return children; // Render protected content if the token is valid
};

export default ProtectedRoute;
