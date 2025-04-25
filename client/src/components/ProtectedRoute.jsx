// filepath: /frontend/src/components/ProtectedRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, role }) => {
  const token = localStorage.getItem('token');
  if (!token) {
    return <Navigate to="/login" />;
  }

  const decodedToken = JSON.parse(atob(token.split('.')[1]));
  if (!decodedToken.roles.includes(role)) {
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedRoute;