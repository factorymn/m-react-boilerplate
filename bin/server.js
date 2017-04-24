/* eslint-disable */

import express from 'express';
import path from 'path';

import webpack from 'webpack';
import React from 'react';
import { renderToString, renderToStaticMarkup } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { matchRoutes } from 'react-router-config';
import createHistory from 'history/createMemoryHistory';
import { App } from '../src/containers';

import { Provider } from 'react-redux';

import { encode } from '../src/utils/base64';
import configureStore from '../src/store/configureStore';
import routes from '../src/routes';

let webpackConfig = null;

const NODE_ENV = require('../envConfig').NODE_ENV;
const PORT = require('../envConfig').PORT;

if (NODE_ENV === 'production') {
  webpackConfig = require('../webpack.prod.config.js')
} else {
  webpackConfig = require('../webpack.dev.config.js')
}

const PUBLIC_PATH = webpackConfig.PUBLIC_PATH;
const localIp = webpackConfig.localIp;

delete webpackConfig.localIp;
delete webpackConfig.PUBLIC_PATH;

const compiler = webpack(webpackConfig);

console.log(`>>> LAUNCHED MODE: ${ NODE_ENV }`);

let app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '..', 'views'));

if (NODE_ENV === 'development') {
  app.use(require('webpack-dev-middleware')(compiler, {
    noInfo: true,
    publicPath: webpackConfig.output.publicPath,
    hot: true
  }));

  app.use(require('webpack-hot-middleware')(compiler));
} else {
  app.use(express.static(PUBLIC_PATH));

  compiler.run((err) => {
    if (err) {
      console.log(err);
    } else {
      console.log('build created <<<');
    }
  });
}

app.use((req, res) => {
  const history = createHistory();
  const store = configureStore(history, {});

  const loadBranchData = () => {
    const branch = matchRoutes(routes, req.url);

    if (!branch.length) return Promise.resolve(null);

    const ContainerComponent = branch[0].route.component;
    const fetchDataPromise = (ContainerComponent && ContainerComponent.initialFetchData) || ([() => Promise.resolve()]);

    return Promise.all(fetchDataPromise.map(promise => promise({
      store,
      location: req.url
    })));
  };

  loadBranchData().then(() => {
    const routerContext = {};

    const htmlContent = renderToString(
      <Provider store={store}>
        <StaticRouter location={req.url} context={routerContext}>
          <App />
        </StaticRouter>
      </Provider>,
    );

    const status = routerContext.status === '404' ? 404 : 200;

    const html = {
      NODE_ENV,
      content: htmlContent,
      state: encode(JSON.stringify(store.getState()))
    }

    res.status(status).render('layout', html);
  });
});

app.listen(PORT, () => {
  console.info(`==> Listening on port ${ PORT }. Open up http://${localIp || 'localhost'}:${ PORT }/ in your browser.`)
});
