import './App.css';
import React, { useEffect, useState } from 'react';
import Login from './containers/login';
import { Route, Routes } from 'react-router-dom';
import Dashboard from './containers/dashboard';
import { connect } from 'react-redux';
import { loginByToken } from './store/actions/login';

import PrivateRoute from './routes/PrivateRoute';
import PublicRoute from './routes/PublicRoute';
import Navigation from './containers/navigation';
import Container from './components/container';
import Sales from './containers/sales';
import Menus from './containers/menus';
import { Reports } from './containers/reports';

function App(props) {
  const isAuthenticated = props.auth.isAuthenticated;
  useEffect(() => {
    if (localStorage.getItem('token')) {
      props.loginByToken(
        localStorage.getItem('username'),
        localStorage.getItem('token')
      );
    }
  }, []);
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute isAuthenticated={isAuthenticated}>
              <Container>
                <Dashboard />
              </Container>
            </PrivateRoute>
          }
        />
        <Route
          path="/sales"
          element={
            <PrivateRoute isAuthenticated={isAuthenticated}>
              <Container>
                <Sales />
              </Container>
            </PrivateRoute>
          }
        />{' '}
        <Route
          path="/menus"
          element={
            <PrivateRoute isAuthenticated={isAuthenticated}>
              <Container>
                <Menus />
              </Container>
            </PrivateRoute>
          }
        />{' '}
        <Route
          path="/reports"
          element={
            <PrivateRoute isAuthenticated={isAuthenticated}>
              <Container>
                <Reports />
              </Container>
            </PrivateRoute>
          }
        />
      </Routes>
    </div>
  );
}

const mapStateToProps = (state) => ({
  auth: state.main,
});

export default connect(mapStateToProps, { loginByToken })(App);
