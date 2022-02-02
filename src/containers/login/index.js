// @ts-nocheck
import React, { useState, useEffect } from 'react';
import OLTPService from '../../service/OLTPService';
import jwt_decode from 'jwt-decode';
import { Navigate } from 'react-router';
import { connect } from 'react-redux';
import { login } from '../../store/actions/login';
import { TextField, Box, Button } from '@mui/material';

const Login = (props) => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    props.auth.isAuthenticated
  );
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    setIsAuthenticated(props.auth.isAuthenticated);
  }, [props.auth.isAuthenticated]);

  const login = async () => {
    try {
      const payload = { username, password };
      const response = await OLTPService.login(payload);

      props.login({ username }, response.data);
    } catch (err) {
      console.log(err);
    }
  };

  return isAuthenticated ? (
    <Navigate to="/dashboard" />
  ) : (
    <div style={{ marginTop: '200px' }}>
      <Box
        component="form"
        sx={{
          '& .MuiTextField-root': { m: 1, width: '25ch' },
        }}
        noValidate
        autoComplete="off"
      >
        <TextField
          label={'Username'}
          type="text"
          onChange={(e) => setUsername(e.target.value)}
          value={username}
        />
        <br />
        <TextField
          label={'Password'}
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
        <br />
        <Button variant="contained" onClick={() => login()}>
          Login
        </Button>
      </Box>
    </div>
  );
};

const mapStateToProps = (state) => ({
  auth: state.main,
});

export default connect(mapStateToProps, { login })(Login);
