var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack/webpack.dev.config');

new WebpackDevServer(webpack(config), {
  publicPath: config.output.publicPath,
  headers: {
    'Access-Control-Allow-Origin': '*',
  },
  hot: true,
  historyApiFallback: true
}).listen(config.port, config.localIp, function (err) {
  if (err) {
    console.log(err);
  }
  console.log(`Listening at ${ config.localIp }:${ config.port }`);
});
