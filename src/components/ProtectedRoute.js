import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { selectIsAuthenticated } from '../store';

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = useSelector(selectIsAuthenticated);// Logic to check if the user is authenticated

  // If not authenticated, redirect to the sign-in page
  if (!isAuthenticated) {
    return <Navigate to="/signin" />;
  }

  // If authenticated, render the requested component
  return children;
};

export default ProtectedRoute;
