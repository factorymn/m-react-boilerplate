import express from 'express';
import path from 'path';

import React from 'react';
import { renderToString } from 'react-dom/server';
import Helmet from 'react-helmet';
import minifyHTML from 'express-minify-html';
import { StaticRouter } from 'react-router-dom';

import createHistory from 'history/createMemoryHistory';
import fs from 'fs';

import { Provider } from 'react-redux';

import configureStore from '../src/store/configureStore';
import routes from '../src/routes';

import { AsyncComponentProvider, createAsyncContext } from 'react-async-component';
import asyncBootstrapper from 'react-async-bootstrapper';
import serialize from 'serialize-javascript';

import features from '../data/features.json';

const NODE_ENV = require('../envConfig').NODE_ENV;
const PORT = require('../envConfig').PORT - 1;
const LOCAL_IP = require('../envConfig').LOCAL_IP;

let pathToJSFile = `//${ LOCAL_IP }:${ PORT }/js/app.js`;

const PARAM_PUBLIC = '/.tmp';

const PUBLIC_PATH = path.join(process.cwd(), PARAM_PUBLIC);

let webpackStats = null;

const isProduction = NODE_ENV === 'production';

const app = express();

app.set('view engine', 'ejs');

app.set('views', path.join(process.cwd(), 'views'));

import { parse as parseUrl } from 'url';

import { ReduxAsyncConnect, loadOnServer } from 'redux-connect'

if (isProduction) {
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

  webpackStats = JSON.parse(fs.readFileSync(path.join(process.cwd(), '.tmp/stats.json'), 'utf8'));
}

app.get('*', (req, res) => {
  if (req.path === '/data') {
    res.json(features);

    return;
  }

  const url = req.originalUrl || req.url
  const location = parseUrl(url)

  const history = createHistory();
  const store = configureStore(history, {});

  loadOnServer({ store, location, routes })
    .then(() => {
      const helmet = Helmet.renderStatic();

      const helmetData = {
        meta: helmet.meta.toString(),
        title: helmet.title.toString(),
        link: helmet.link.toString()
      };

      const asyncContext = createAsyncContext();
      const routerContext = {};

      const appJSX = (
        <AsyncComponentProvider asyncContext={asyncContext}>
          <Provider store={store}>
            <StaticRouter location={location} context={routerContext}>
              <ReduxAsyncConnect routes={routes} />
            </StaticRouter>
          </Provider>
        </AsyncComponentProvider>
      );

      const status = routerContext.status === '404' ? 404 : 200;

      // handle redirects
      if (routerContext.url) {
        req.header('Location', routerContext.url);
        return res.send(302)
      }

      asyncBootstrapper(appJSX).then(() => {
        const appHTML = renderToString(appJSX);

        if (webpackStats) {
          pathToJSFile = webpackStats.assetsByChunkName.app[0];
        }

        const asyncState = asyncContext.getState();

        const cssFileName = webpackStats ? webpackStats.assetsByChunkName.app[1] : '/css/app.css';

        const layoutData = {
          NODE_ENV,
          pathToJSFile,
          content: appHTML,
          helmetData,
          cssFileName,
          asyncState: serialize(asyncState),
          state: serialize(store.getState())
        };

        res.status(status).render('layout', layoutData);
      });
    });
});

export default app;