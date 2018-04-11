import React from 'react';

if (global.IS_BROWSER) {
  require('./App.styl');
}

import { Route } from 'react-router-dom';
import routes from '../../routes';

export default () => {
  const routeWithSubRoutes = (route, index) => (
    <Route
      key={index}
      exact={route.exact || false}
      path={route.path}
      render={props => (
        <route.component {...props} />
      )}
    />
  );

  return (
    <div className="app">
      {
        routes.map((route, index) => routeWithSubRoutes(route, index))
      }
    </div>
  );
};
