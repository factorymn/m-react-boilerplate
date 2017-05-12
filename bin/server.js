/* eslint-disable global-require */
import express from 'express';
import path from 'path';

import webpack from 'webpack';
import React from 'react';
import { renderToString } from 'react-dom/server';
import Helmet from 'react-helmet';
import minifyHTML from 'express-minify-html';
import { StaticRouter } from 'react-router-dom';
import { matchRoutes } from 'react-router-config';

import createHistory from 'history/createMemoryHistory';
import { App } from '../src/containers';

import { Provider } from 'react-redux';

import { encode } from '../src/utils/base64';
import configureStore from '../src/store/configureStore';
import routes from '../src/routes';

import { AsyncComponentProvider, createAsyncContext } from 'react-async-component';
import asyncBootstrapper from 'react-async-bootstrapper';
import serialize from 'serialize-javascript';

let webpackConfig = null;
let webpackStats = null;

const NODE_ENV = require('../envConfig').NODE_ENV;
const PORT = require('../envConfig').PORT;

if (NODE_ENV === 'production') {
  webpackConfig = require('../webpack.prod.config.js');
} else {
  webpackConfig = require('../webpack.dev.config.js');
}

const PUBLIC_PATH = webpackConfig.PUBLIC_PATH;
const localIp = webpackConfig.localIp;

delete webpackConfig.localIp;
delete webpackConfig.PUBLIC_PATH;

const compiler = webpack(webpackConfig);

console.log(`>>> LAUNCHED MODE: ${ NODE_ENV }`);

const app = express();

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

  app.use(minifyHTML({
    override:      true,
    exception_url: false,
    htmlMinifier: {
      removeComments:            true,
      collapseWhitespace:        true,
      collapseBooleanAttributes: true,
      removeAttributeQuotes:     true,
      removeEmptyAttributes:     true,
      minifyJS:                  true
    }
  }));

  compiler.run((err) => {
    if (err) {
      console.log(err);
    } else {
      webpackStats = require(`${ PUBLIC_PATH }/stats.json`);

      console.log('build created <<<');
    }
  });
}

app.use((req, res) => {
  const history = createHistory();
  const store = configureStore(history, {});

  const asyncContext = createAsyncContext();

  const routerContext = {};

  const appJSX = (
    <AsyncComponentProvider asyncContext={asyncContext}>
      <Provider store={store}>
        <StaticRouter location={req.url} context={routerContext}>
          <App />
        </StaticRouter>
      </Provider>
    </AsyncComponentProvider>
  );

  const branch = matchRoutes(routes, req.url);

  let promisesArray = [];

  if (branch.length && branch[0].route.initialFetchData) {
    promisesArray = promisesArray.concat(branch[0].route.initialFetchData.map(promise => promise({
      store,
      location: req.url
    })));
  }

  Promise.all(promisesArray.concat([asyncBootstrapper(appJSX)])).then(() => {
    const appString = renderToString(appJSX);
    const helmet = Helmet.renderStatic();

    const helmetData = {
      meta: helmet.meta.toString(),
      title: helmet.title.toString(),
      link: helmet.link.toString()
    };

    const asyncState = asyncContext.getState();

    const status = routerContext.status === '404' ? 404 : 200;

    const jsFileName = webpackStats ? webpackStats.assetsByChunkName.app[0] : '/js/app.js';
    const cssFileName = webpackStats ? webpackStats.assetsByChunkName.app[1] : '/css/app.css';

    const layoutData = {
      NODE_ENV,
      content: appString,
      helmetData,
      jsFileName,
      cssFileName,
      asyncState: serialize(asyncState),
      state: encode(JSON.stringify(store.getState()))
    };

    res.status(status).render('layout', layoutData);
  });
});

app.listen(PORT, () => {
  console.info(`==> Listening on port ${ PORT }.
    Open up http://${ localIp || 'localhost' }:${ PORT }/ in your browser.`);
});
