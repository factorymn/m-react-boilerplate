import React                  from 'react';
import { Route, IndexRoute }  from 'react-router';

// Import the containers used as pages
import {
  App,
  InitialContainer
} from './containers';

export default () => (
  <Route path="/" component={App}>
    <IndexRoute component={InitialContainer} />
  </Route>
);
