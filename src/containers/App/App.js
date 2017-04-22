import React from 'react';

import { Route, Switch } from 'react-router-dom';
import routes from '../../routes';

// import ProjectRawTheme from '../../theme/material_ui_raw_theme';
// import { getMuiTheme } from 'material-ui/styles';

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

  // static get childContextTypes() {
  //   return { muiTheme: React.PropTypes.object };
  // }
  //
  // getChildContext() {
  //   return { muiTheme: getMuiTheme(ProjectRawTheme) };
  // }

  return (
    <div className="app">
      <Switch>
        {
          routes.map((route, index) => routeWithSubRoutes(route, index))
        }
      </Switch>
    </div>
  );
};
