import React from 'react';

if (global.IS_BROWSER) { // eslint-disable-line no-undef
  require('./App.styl'); // eslint-disable-line no-undef
}

import { Route } from 'react-router-dom';
import routes from '../../routes';

// UNCOMMENT IF MATERIAL-UI IS USING ON THE PROJECT
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
      {
        routes.map((route, index) => routeWithSubRoutes(route, index))
      }
    </div>
  );
};
