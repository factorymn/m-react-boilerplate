const webpack = require("webpack");
const path = require("path");
const StartServerPlugin = require("start-server-webpack-plugin");
const NODE_ENV = require('./envConfig').NODE_ENV;
const nodeExternals = require("webpack-node-externals");

module.exports = {
  entry: [ "./server/index" ],
  target: "node",
  externals: [ nodeExternals() ],
  module: {
    rules: [
      { test: /\.jsx?$/, use: "babel-loader", exclude: /node_modules/ },
    ],
  },
  plugins: [
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify(NODE_ENV)
      },
      'global.IS_BROWSER': false
    }),
  ],
  output: { path: path.join(__dirname, ".tmp"), filename: "server.js" },
};