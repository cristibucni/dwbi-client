/* eslint-disable import/no-anonymous-default-export */
import { SET_USER } from '../types';
import _ from 'lodash';

const defaultState = {
  user: {},
  isAuthenticated: false,
};

export default (state = defaultState, action) => {
  const { type, payload } = action;

  switch (type) {
    case SET_USER:
      return {
        ...state,
        user: payload,
        isAuthenticated: !_.isEmpty(payload),
      };
    default:
      return state;
  }
};
