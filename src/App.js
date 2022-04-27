import './App.css';
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Container from './components/container';
import { connect } from 'react-redux';
import { loginByToken } from './store/actions/login';

import { routeDefinitions } from './routes/config';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

function App(props) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div className="App">
        <Container>
          <Routes>
            {routeDefinitions.map((route, idx) => (
              <Route
                key={idx}
                path={route.href}
                element={<route.component />}
              />
            ))}
          </Routes>
        </Container>
      </div>
    </LocalizationProvider>
  );
}

const mapStateToProps = (state) => ({
  auth: state.main,
});

export default connect(mapStateToProps, { loginByToken })(App);
