/* eslint-disable */

// Webpack config for development
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');

var fs = require('fs');
var path = require('path');
var webpack = require('webpack');

var os = require('os');
var ifaces = os.networkInterfaces();
var localIp = '';

Object.keys(ifaces).forEach(function (ifname) {
  ifaces[ifname].forEach(function (iface) {
    if ('IPv4' !== iface.family || iface.internal !== false) {
      // skip over internal (i.e. 127.0.0.1) and non-ipv4 addresses
      return;
    }
    
    localIp = iface.address;
  });
});

const PARAM_SRC = '/src';
const PARAM_PUBLIC = '/.tmp';

const SOURCE_PATH = path.join(__dirname, PARAM_SRC);
const PUBLIC_PATH = path.join(__dirname, PARAM_PUBLIC);

const PORT = require('./envConfig').PORT;
const NODE_ENV = require('./envConfig').NODE_ENV;

module.exports = {
  PORT: PORT,
  localIp: localIp,
  SOURCE_PATH: SOURCE_PATH,
  PUBLIC_PATH: PUBLIC_PATH,
  context: SOURCE_PATH,
  debug: true,
  devtool: 'cheap-eval-source-map',
  entry: {
    app: [
      './app.js',
      'webpack-hot-middleware/client?http://' + localIp + ':' + PORT,
      'webpack/hot/only-dev-server',
    ]
  },
  output: {
    path: PUBLIC_PATH,
    filename: 'js/[name].js'
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'react-hot!babel'
      },
      {
        test: /\.styl|\.css$/,
        loader: 'style'
      },
      {
        test: /\.styl|\.css$/,
        loader: 'css',
        query: {
          importLoaders: 1,
          localIdentName: '[local]',
          sourceMap: true
        }
      },
      {
        test: /\.styl|\.css$/,
        loader: 'autoprefixer'
      },
      {
        test: /\.styl|\.css$/,
        exclude: /node_modules/,
        loader: 'stylus',
        query: {
          sourceMap: true
        }
      },
      {
        test: /\.woff$/,
        loader: 'url?limit=10000&name=[path][name].[ext]&mimetype=application/font-woff'
      },
      {
        test: /\.woff2$/,
        loader: 'url?limit=10000&name=[path][name].[ext]&mimetype=application/font-woff'
      },
      {
        test: /\.ttf$/,
        loader: 'url?limit=10000&name=[path][name].[ext]&mimetype=application/octet-stream'
      },
      {
        test: /\.eot$/,
        loader: 'file?name=[path][name].[ext]' },
      {
        test: /\.svg$/,
        loader: 'url?limit=10000&name=[path][name].[ext]&mimetype=image/svg+xml'
      }
    ]
  },
  resolve: {
    root: SOURCE_PATH,
    modulesDirectories: [
      'src',
      'node_modules'
    ],
    extensions: ['', '.json', '.js', '.jsx']
  },
  plugins: [
    new webpack.NoErrorsPlugin(),
    new ExtractTextPlugin('css/[name].css'),
    // new CopyWebpackPlugin([
    //   { from: "images", to: "images" },
    //   { from: "fonts", to: "fonts" }
    // ]),
    new webpack.DefinePlugin({
      'global.IS_BROWSER': true,
      'process.env': {
        NODE_ENV: JSON.stringify(NODE_ENV)
      }
    }),
    new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /ru|en-gb/),
    new webpack.HotModuleReplacementPlugin()
  ],
  target: 'web', // Make web variables accessible to webpack, e.g. window
  stats: true, // Don't show stats in the console
  progress: true,
  stylus: {
    import: [path.resolve(__dirname, '../src/commonStyles/commonStyles.styl')]
  },
};
