const webpack = require('webpack');
const path = require('path');
const NODE_ENV = require('./envConfig').NODE_ENV;
const nodeExternals = require('webpack-node-externals');

module.exports = {
  mode: 'production',
  entry: [ './server/index' ],
  target: 'node',
  externals: [ nodeExternals() ],
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test:  /\.svg$/,
        use: [
          {
            loader: 'babel-loader'
          },
          {
            loader: 'svg-react-loader',
          }
        ]
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(NODE_ENV)
      },
      'global.IS_BROWSER': false
    }),
  ],
  optimization: {
    noEmitOnErrors: true, // NoEmitOnErrorsPlugin
  },
  output: { path: path.join(__dirname, 'tmp'), filename: 'server.js' },
};