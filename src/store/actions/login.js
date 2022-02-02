import { SET_USER } from '../types';
import jwt_decode from 'jwt-decode';
import { setAuthToken, setUsername } from '../../utils/localStorage';

export const setUser = (payload) => {
  return { type: SET_USER, payload };
};

export const login = (userData, responseData) => async (dispatch) => {
  try {
    const decoded = jwt_decode(responseData.authToken);
    console.log(decoded);
    const user = { role: decoded.rol, username: userData.username };
    setUsername(userData.username);
    setAuthToken(responseData.authToken);
    dispatch(setUser(user));
  } catch (e) {
    //dispatch error handler
  }
};

export const loginByToken = (username, token) => async (dispatch) => {
  try {
    const decoded = jwt_decode(token);
    const user = { role: decoded.rol, username };
    dispatch(setUser(user));
  } catch (e) {
    //dispatch error handler
  }
};

export const logout = () => async (dispatch) => {
  try {
    setUsername('');
    setAuthToken('');
    dispatch(setUser({}));
  } catch (e) {
    //dispatch error handler
  }
};
