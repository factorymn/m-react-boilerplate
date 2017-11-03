const path = require('path');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const PORT = require('./envConfig').PORT - 1;
const LOCAL_IP = require('./envConfig').LOCAL_IP;
const NODE_ENV = require('./envConfig').NODE_ENV;

module.exports = {
  context: path.resolve(__dirname),
  devtool: '"inline-source-map',
  entry: {
    app: [
      'react-hot-loader/patch',
      'webpack-dev-server/client?http://' + LOCAL_IP + ':' + PORT + '',
      './src/app.js',
    ]
  },
  devServer: {
    host: LOCAL_IP,
    port: PORT,
    historyApiFallback: true,
    hot: true,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
      "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization"
    }
  },
  output: {
    path: path.join(__dirname, ".build"),
    publicPath: 'http://' + LOCAL_IP + ':' + PORT + '/',
    filename: 'js/[name].js'
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        include: [path.join(__dirname, "src")],
        use: [
          {
            loader: 'babel-loader'
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
      }
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
    new CopyWebpackPlugin([
      { from: 'images', to: 'images' }
    ]),
    new webpack.DefinePlugin({
      'global.IS_BROWSER': true,
      'process.env': {
        NODE_ENV: JSON.stringify(NODE_ENV)
      }
    }),
    new webpack.optimize.CommonsChunkPlugin({
      async: true,
      children: true
    })
  ],
  target: 'web', // Make web variables accessible to webpack, e.g. window
  stats: true, // Don't show stats in the console
};
