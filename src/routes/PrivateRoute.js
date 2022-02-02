import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children, isAuthenticated, roles }) => {
  const user = useSelector((state) => state.main.user);
  if (!isAuthenticated) return <Navigate to="/404" />;
  if (!roles.includes(user.role)) return <Navigate to="/dashboard" />;

  return children;
};

export default PrivateRoute;
