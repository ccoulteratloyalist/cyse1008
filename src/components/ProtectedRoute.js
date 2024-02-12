import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { selectIsAuthenticated } from '../store';
import PropTypes from 'prop-types';

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = useSelector(selectIsAuthenticated);// Logic to check if the user is authenticated

  // If not authenticated, redirect to the sign-in page
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  // If authenticated, render the requested component
  return children;
};

ProtectedRoute.propTypes = {
  children: PropTypes.node, // `node` covers anything that can be rendered: numbers, strings, elements, or an array containing these types.
};

ProtectedRoute.displayName = "ProtectRoute";

export default ProtectedRoute;
