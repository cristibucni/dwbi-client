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
import { routes, routeDefinitions } from './routes/config';
import { NotFoundPage } from './components/not-found-page';

function App(props) {
  return (
    <div className="App">
      <Routes>
        <Route path="/404" element={<NotFoundPage />} />
        {routeDefinitions.map((route, idx) => (
          <Route
            key={idx}
            path={route.href}
            element={
              <Container>
                <route.component />
              </Container>
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
