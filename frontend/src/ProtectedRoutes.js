import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const userEmail = localStorage.getItem("Email");

  if (!userEmail) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;
