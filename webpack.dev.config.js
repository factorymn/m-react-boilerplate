/* eslint-disable */
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

const PORT = require('./envConfig').PORT;
const NODE_ENV = require('./envConfig').NODE_ENV;

module.exports = {
  localIp: localIp,
  context: path.resolve(__dirname),
  devtool: 'cheap-inline-module-source-map',
  entry: {
    app: [
      'react-hot-loader/patch',
      'webpack-hot-middleware/client?reload=true',
      './src/app.js',
    ]
  },
  output: {
    path: path.resolve(__dirname),
    publicPath: 'http://' + localIp + ':' + PORT + '/',
    filename: 'js/[name].js'
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader"
          }
        ]
      },
      {
        test: /\.styl|\.css$/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              localIdentName: '[local]',
              sourceMap: true
            }
          },
          {
            loader: 'autoprefixer-loader'
          },
          {
            loader: 'stylus-loader',
            options: {
              sourceMap: true,
              import: [path.resolve(__dirname, './src/commonStyles/commonStyles.styl')]
            }
          }
        ]
      },
      {
        test: /\.woff$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: '[path][name].[ext]',
          mimetype: 'application/font-woff'
        }
      },
      {
        test: /\.woff2$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: '[path][name].[ext]',
          mimetype: 'application/font-woff'
        }
      },
      {
        test: /\.ttf$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: '[path][name].[ext]',
          mimetype: 'application/octet-stream'
        }
      },
      {
        test: /\.eot$/,
        loader: 'file-loader',
        options: {
          name: '[path][name].[ext]'
        }
      },
      {
        test: /\.svg$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: '[path][name].[ext]',
          mimetype: 'image/svg+xml'
        }
      },
      {
        test: /\.(jpe?g|gif|png|)$/,
        loader: 'file-loader',
        options: {
          name: '[path][name].[ext]'
        }
      },
    ]
  },
  resolve: {
    modules: [
      'src',
      'node_modules'
    ],
    extensions: ['.webpack-loader.js', '.web-loader.js', '.loader.js', '.js', '.jsx']
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /ru|en-gb/),
    new webpack.DefinePlugin({
      'global.IS_BROWSER': true,
      'process.env': {
        NODE_ENV: JSON.stringify(NODE_ENV)
      }
    })
  ],
  target: 'web', // Make web variables accessible to webpack, e.g. window
  stats: true, // Don't show stats in the console
};
