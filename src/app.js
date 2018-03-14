import React from 'react';
import { hydrate, unmountComponentAtNode } from 'react-dom';
import { Provider } from 'react-redux';

import { AppContainer } from 'react-hot-loader';
import createHistory from 'history/createBrowserHistory';
import { ConnectedRouter } from 'react-router-redux';
import { ReduxAsyncConnect } from 'redux-connect'

import routes from './routes';
import configureStore from './store/configureStore';

// Needed for React Developer Tools
// if (process.env.NODE_ENV !== 'production') {
//   window.React = React;
// }
//
// const rehydrateState = window.__ASYNC_COMPONENTS_STATE__;
// const mountNode = document.getElementById('app');



const renderApp = () => {
  // const App = require('./containers/App/App').default;

  const initialState = window.__INITIAL_STATE__ || {};
  const history = createHistory();
  const catchedStore = configureStore(history, initialState);

  const app = (
    <AppContainer key={Math.random()}>
      <Provider store={catchedStore}>
        <ConnectedRouter history={history}>
          <ReduxAsyncConnect routes={routes} />
        </ConnectedRouter>
      </Provider>
    </AppContainer>
  );

  // asyncBootstrapper(app).then(() => {
  hydrate(app, mountNode);
  // });
};

if (process.env.NODE_ENV === 'development' && module.hot) {
  const reRenderApp = () => {
    try {
      renderApp();
    } catch (error) {
      const RedBox = require('redbox-react').default;

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
