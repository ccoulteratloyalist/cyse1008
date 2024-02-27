import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = null;// Logic to check if the user is authenticated

  // If not authenticated, redirect to the sign-in page
  if (!isAuthenticated) {
    return <Navigate to="/signin" />;
  }

  // If authenticated, render the requested component
  return children;
};

export default ProtectedRoute;
