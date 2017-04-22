import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { Provider } from 'react-redux';

import { AppContainer } from 'react-hot-loader';
import createHistory from 'history/createBrowserHistory';
import { ConnectedRouter } from 'react-router-redux';

import { decode } from './utils/base64';

import configureStore from './store/configureStore';

const isProd = process.env.NODE_ENV === 'production';

// Needed for React Developer Tools
if (!isProd) {
  window.React = React;
}

const initialState = window.__INITIAL_STATE__ ? JSON.parse(decode(window.__INITIAL_STATE__)) : {};
const history = createHistory();
const catchedStore = configureStore(history, initialState);
const mountNode = document.getElementById('app');

const renderApp = () => {
  const App = require('./containers/App/App').default; //eslint-disable-line global-require

  render((
    <AppContainer>
      <Provider store={catchedStore}>
        <ConnectedRouter history={history}>
          <App />
        </ConnectedRouter>
      </Provider>
    </AppContainer>
  ), mountNode);
};

if (module.hot) {
  const reRenderApp = () => {
    try {
      renderApp();
    } catch (error) {
      const RedBox = require('redbox-react').default; //eslint-disable-line global-require

      render(<RedBox error={error} />, mountNode);
    }
  };

  module.hot.accept('./containers/App/App', () => {
    setImmediate(() => {
      // Preventing the hot reloading error from react-router
      unmountComponentAtNode(mountNode);

      reRenderApp();
    });
  });
}

renderApp();
