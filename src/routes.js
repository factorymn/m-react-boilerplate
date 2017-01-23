import React                  from 'react';
import { Route, IndexRoute }  from 'react-router';

// Import the containers used as pages
import {
  App,
  InitialContainer,
  AnotherContainer
} from './containers';

export default function () {
  return (
    <Route path="/" component={App}>
      <IndexRoute component={InitialContainer} />
      <Route path="another" component={AnotherContainer} />
    </Route>
  );
}
