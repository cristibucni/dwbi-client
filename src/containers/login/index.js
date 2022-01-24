// @ts-nocheck
import React, { useState, useEffect } from 'react';
import OLTPService from '../../service/OLTPService';
import jwt_decode from 'jwt-decode';
import { Navigate } from 'react-router';
import { connect } from 'react-redux';
import { login } from '../../store/actions/login';

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
    <div>
      Username{' '}
      <input
        type="text"
        onChange={(e) => setUsername(e.target.value)}
        value={username}
      />
      Password{' '}
      <input
        type="password"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
      />
      <button onClick={() => login()}>login</button>
    </div>
  );
};

const mapStateToProps = (state) => ({
  auth: state.main,
});

export default connect(mapStateToProps, { login })(Login);
