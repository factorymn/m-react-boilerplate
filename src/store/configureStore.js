import { applyMiddleware, compose, createStore } from 'redux';
import thunkMiddleware from 'redux-thunk';
import immutableStateMiddleware from 'redux-immutable-state-invariant';
import { routerMiddleware } from 'react-router-redux';
import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import homePageReducer from '../containers/HomePage/reducer';
import aboutPageReducer from '../containers/AboutPage/reducer';

const rootReducer = combineReducers({
  homePageReducer,
  aboutPageReducer,
  routing: routerReducer
});

const middlewares = [thunkMiddleware];

if (process.env.NODE_ENV !== 'production') {
  middlewares.push(immutableStateMiddleware());
}

export default function configureStore(history, initialState) {
  middlewares.push(routerMiddleware(history));

  return createStore(
    rootReducer,
    initialState,
    compose(
      applyMiddleware(...middlewares),
      global.IS_BROWSER && window.devToolsExtension ? window.devToolsExtension() : f => f
    )
  );
}
