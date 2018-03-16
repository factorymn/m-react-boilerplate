import React from 'react';
import { ReduxAsyncConnect } from 'redux-connect';

if (global.IS_BROWSER) {
  require('./App.styl');
}

import routes from '../../routes';

export default function App() {
  return (
    <ReduxAsyncConnect routes={routes} />
  );
}
