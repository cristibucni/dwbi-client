import './App.css';
import React, { useEffect, useState } from 'react';
import Login from './containers/login';
import { Route, Routes } from 'react-router-dom';
import Container from './components/container';
import Dashboard from './containers/dashboard';
import { connect } from 'react-redux';
import { loginByToken } from './store/actions/login';

import PrivateRoute from './routes/PrivateRoute';
import PublicRoute from './routes/PublicRoute';
import Navigation from './containers/navigation';

import Sales from './containers/sales';
import Menus from './containers/menus';
import { Reports } from './containers/reports';
import Orders from './containers/orders';
import { routes } from './routes/config';
import { NotFoundPage } from './components/not-found-page';

function App(props) {
  const isAuthenticated = props.auth.isAuthenticated;
  const user = props.auth.user;
  useEffect(() => {
    if (localStorage.getItem('token')) {
      props.loginByToken(
        localStorage.getItem('username'),
        localStorage.getItem('token')
      );
    }
  }, []);

  console.log();
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/404" element={<NotFoundPage />} />
        {routes.map((route) => (
          <Route
            key={route.name}
            path={route.href}
            element={
              <PrivateRoute
                isAuthenticated={isAuthenticated}
                roles={route.roles}
              >
                <Container>
                  <route.component />
                </Container>
              </PrivateRoute>
            }
          />
        ))}
      </Routes>
    </div>
  );
}

const mapStateToProps = (state) => ({
  auth: state.main,
});

export default connect(mapStateToProps, { loginByToken })(App);
