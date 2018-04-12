var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var StatsPlugin = require('stats-webpack-plugin');
// var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const PARAM_PUBLIC = '/.tmp';

const PUBLIC_PATH = path.join(__dirname, PARAM_PUBLIC);
const SOURCE_PATH = path.resolve(__dirname);
const NODE_ENV = require('./envConfig').NODE_ENV;
const PORT = require('./envConfig').PORT;
const LOCAL_IP = require('./envConfig').LOCAL_IP;

module.exports = {
  mode: 'production',
  context: SOURCE_PATH,
  devtool: 'hidden-source-map',
  entry: {
    app: [
      './src/app.js'
    ]
  },
  output: {
    path: PUBLIC_PATH,
    publicPath: 'http://' + LOCAL_IP + ':' + PORT + '/',
    filename: 'js/[name].[hash].js'
  },
  module: {
    rules: [
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader'
          }
        ]
      },
      {
        test: /\.styl|\.css/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                minimize: true,
                sourceMap: true
              }
            },
            {
              loader: 'stylus-loader',
              options: {
                sourceMap: true,
                import: [path.resolve(__dirname, './src/commonStyles/commonStyles.styl')]
              }
            }
          ]
        })
      },
      {
        test: /\.woff$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: '/[path][name].[ext]',
          mimetype: 'application/font-woff'
        }
      },
      {
        test: /\.woff2$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: '/[path][name].[ext]',
          mimetype: 'application/font-woff'
        }
      },
      {
        test: /\.ttf$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: '/[path][name].[ext]',
          mimetype: 'application/octet-stream'
        }
      },
      {
        test: /\.eot$/,
        loader: 'file-loader',
        options: {
          name: '/[path][name].[ext]'
        }
      },
      {
        test: /\.(jpe?g|gif|png|)$/,
        loader: 'file-loader',
        options: {
          name: '/[path][name].[ext]'
        }
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
    new ExtractTextPlugin({
      filename: '/css/[name].[hash].css',
      allChunks: true
    }),
    new CopyWebpackPlugin([
      { from: 'images', to: 'images' }
    ]),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(NODE_ENV)
      },
      'global.IS_BROWSER': true,
    }),
    new webpack.optimize.UglifyJsPlugin({ // Optimize the JavaScript...
      sourceMap: true,
      mangle: true,
      compress: {
        sequences: true,
        dead_code: true,
        conditionals: true,
        booleans: true,
        unused: true,
        if_return: true,
        join_vars: true,
        drop_console: true
      }
    }),
    new webpack.LoaderOptionsPlugin({
      debug: false
    }),
    new StatsPlugin('stats.json', {
      chunkModules: false,
      exclude: /node_modules/
    }),
    // new BundleAnalyzerPlugin()
  ],
  optimization: {
    splitChunks: { // CommonsChunkPlugin()
      chunks: 'async'
    },
    noEmitOnErrors: true, // NoEmitOnErrorsPlugin
    concatenateModules: true //ModuleConcatenationPlugin
  },
  target: 'web',
  stats: {
    hash: false,
    version: false,
    children: false
  }
};
