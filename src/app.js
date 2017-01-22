import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';

import { decode } from './utils/base64';

import routes from './routes';

import configureStore from './store/configureStore';

const isProd = process.env.NODE_ENV === 'production';

// Needed for React Developer Tools
if (!isProd) {
  window.React = React;
}

const initialState = window.__INITIAL_STATE__ ? JSON.parse(decode(window.__INITIAL_STATE__)) : {};
const catchedStore = configureStore(initialState);

render((
  <Provider store={catchedStore}>
    <Router history={browserHistory} routes={routes(catchedStore)} />
  </Provider>
), document.getElementById('app'));
