/* eslint-disable */

import express from 'express';
import path from 'path';

import webpack from 'webpack';
import React from 'react';
import { renderToString as render } from 'react-dom/server';
import { match as matcher, RouterContext } from 'react-router';
import { Provider } from 'react-redux';

import { encode } from '../src/utils/base64';

import routes from '../src/routes';
import store from '../src/store/configureStore';

let webpackConfig = null;

const NODE_ENV = require('../envConfig').NODE_ENV;
const PORT = require('../envConfig').PORT;

if (NODE_ENV === 'production') {
  webpackConfig = require('../webpack.prod.config.js')
} else {
  webpackConfig = require('../webpack.dev.config.js')
}

const PUBLIC_PATH = webpackConfig.PUBLIC_PATH;
const compiler = webpack(webpackConfig);

console.log(`>>> LAUNCHED MODE: ${ NODE_ENV }`);

let app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '..', 'views'));

if (NODE_ENV === 'development') {
  app.use(require('webpack-dev-middleware')(compiler, {
    noInfo: true,
    publicPath: '/',
    hot: true,
    compress: true
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
  let __store = store({});
  let __routes = routes(__store);

  matcher(
    {routes: __routes, location: req.url},
    (err, redirect, props) => {

      let html = '';

      if (props) {
        let promises = [];
        props.routes
          .forEach(
            (route) => {
              if (route.component.promises) {
                props.params.hostname = req.hostname;
                route.component.promises(props.params)
                  .forEach(promise => {
                    promises.push(promise(__store.dispatch, __store.getState));
                  });
              }

            });

        let cb = () => {
          html = {
            NODE_ENV: NODE_ENV,
            content: render(
              <Provider store={__store}>
                <RouterContext {...props} />
              </Provider>
            )
          };

          let state = __store.getState();

          html['state'] = encode(JSON.stringify(state));

          if (state.app && state.app.settings) {
            if (state.app.settings.faviconPath) {
              html['favicon'] = state.app.settings.faviconPath;
            }
          }

          res
            .status(200)
            .render('layout', html);
        };

        Promise
          .all(promises)
          .then(cb)
          .catch(cb);
      } else {
        res
          .status(500)
          .render('error', err);
      }
    });
});

app.listen(PORT, () => {
  console.info(`==> Listening on port ${ PORT }. Open up http://${webpackConfig.localIp}:${ PORT }/ in your browser.`)
});
