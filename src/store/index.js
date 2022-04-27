import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import history from '../utils/history';
import { composeWithDevTools } from 'redux-devtools-extension';

import main from './reducers/main';

const middleware = [routerMiddleware(history), thunk];

const rootReducer = combineReducers({
  main,
  router: connectRouter(history),
});

const composeEnhancers = composeWithDevTools({});

const enhancer = composeEnhancers(
  applyMiddleware(...middleware)
  // other store enhancers if any
);

const store = createStore(rootReducer, {}, enhancer);

export default store;
