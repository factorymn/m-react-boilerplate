/* eslint-disable */

var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var ProgressPlugin = require('webpack/lib/ProgressPlugin');

const PARAM_SRC = '/src';
const PARAM_PUBLIC = '/.tmp';

const SOURCE_PATH = path.join(__dirname, PARAM_SRC);
const PUBLIC_PATH = path.join(__dirname, PARAM_PUBLIC);

const PORT = require('./envConfig').PORT;
const NODE_ENV = require('./envConfig').NODE_ENV;

module.exports = {
  PORT: PORT,
  SOURCE_PATH: SOURCE_PATH,
  PUBLIC_PATH: PUBLIC_PATH,
  context: SOURCE_PATH,
  debug: false,
  devtool: 'eval',
  entry: {
    app: [
      './app.js'
    ]
  },
  output: {
    path: PUBLIC_PATH,
    filename: 'js/[name].js'
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/, // Transform all .js files required somewhere within an entry point...
        loader: 'babel', // ...with the specified loaders...
        exclude: /node_modules/ // ...except for the node_modules folder.
      },
      {
        test: /\.styl|\.css/,
        loader: ExtractTextPlugin.extract(
          'style',
          'css?sourceMap!autoprefixer!stylus?sourceMap')
      },
      {
        test: /\.jpe?g$|\.gif$|\.png$/i,
        loader: 'url-loader?limit=10000'
      },
      {
        test: /\.woff$/,
        loader: 'url?limit=10000&name=fonts/[name].[ext]&mimetype=applicationfont-woff'
      },
      {
        test: /\.woff2$/,
        loader: 'url?limit=10000&name=fonts/[name].[ext]&mimetype=applicationfont-woff'
      },
      {
        test: /\.ttf$/,
        loader: 'url?limit=10000&name=fonts/[name].[ext]&mimetype=application/octet-stream'
      },
      {
        test: /\.eot$/,
        loader: 'file?name=fonts/[name].[ext]'
      },
      {
        test: /\.svg$/,
        loader: 'url?limit=10000&name=fonts/[name].[ext]&mimetype=image/svg+xml'
      }
    ]
  },
  resolve: {
    root: SOURCE_PATH,
    modulesDirectories: [
      'src',
      'node_modules'
    ],
    extensions: ['', '.json', '.js', '.jsx', '.styl']
  },
  plugins: [
    new ExtractTextPlugin('/css/[name].css'),
    // Optimizations
    new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /ru|en-gb/),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({ // Optimize the JavaScript...
      compress: {
        warnings: false, // ...but do not show warnings in the console (there is a lot of them)
        drop_console: false // discard calls to console.* functions in bundle file
      }
    }),
    new ProgressPlugin(function (percentage, msg) { // eslint-disable-line one-var
      let percents = percentage * 100,
        percentageFormatted = String(percents).split('.').length > 1 ? (percents).toFixed(2) : percents;
      
      console.log(percentageFormatted + '%', msg); // eslint-disable-line no-console
    }),
    new webpack.DefinePlugin({
      'global.IS_BROWSER': true,
      'process.env': {
        NODE_ENV: JSON.stringify(NODE_ENV)
      }
    })
  ],
  target: 'web', // Make web variables accessible to webpack, e.g. window
  stats: {
    colors: true,
    hash: false,
    version: false,
    unused: true,
    chunks: false,
    children: false
  },
  progress: true,
  stylus: {
    import: [path.join(SOURCE_PATH, '/commonStyles/commonStyles.styl')]
  }
};
