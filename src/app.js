/**
 *
 * app.js
 *
 * This is the entry file for the application, mostly just setup and boilerplate code
 *
 */

// Import all the third party stuff
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';

import configureStore from './store/configureStore';
import getRoutes from './routes';

const isProd = process.env.NODE_ENV === 'production';

// Needed for React Developer Tools
if (!isProd) {
  window.React = React;
}

const store = configureStore();

const appComponent = (Component, props) => (
  <Component {...props} />
);

const AppContainer = (
  <Provider store={store}>
    <div>
      <Router
        history={browserHistory}
        children={getRoutes()}
        createElement={appComponent}
      />
    </div>
  </Provider>
);

ReactDOM.render(AppContainer, document.getElementById('app'));
