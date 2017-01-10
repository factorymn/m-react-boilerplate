import { applyMiddleware, compose, createStore } from 'redux';
import thunkMiddleware from 'redux-thunk';
import immutableStateMiddleware from 'redux-immutable-state-invariant';
import rootReducer from '../reducers';

const middlewares = [thunkMiddleware];

if (!PRODUCTION) {
  middlewares.push(immutableStateMiddleware());
}

export default function configureStore(initialState) {
  return createStore(rootReducer, initialState, compose(
    applyMiddleware(...middlewares),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  ));
}
