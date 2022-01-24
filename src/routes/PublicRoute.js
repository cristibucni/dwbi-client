import React from 'react';
import { Route, Navigate } from 'react-router-dom';

const PublicRoute = ({
  component: Component,
  restricted,
  isAuthenticated,
  ...rest
}) => {
  return (
    // restricted = false meaning public route
    // restricted = true meaning restricted route
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated && restricted ? (
          <Navigate to="/" />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
};

export default PublicRoute;
