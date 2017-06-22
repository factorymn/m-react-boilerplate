import path from 'path';
import webpack from 'webpack';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import StatsPlugin from 'stats-webpack-plugin';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';

const PARAM_PUBLIC = '/.tmp';

const SOURCE_PATH = path.resolve(__dirname);
const PUBLIC_PATH = path.join(__dirname, PARAM_PUBLIC);
const NODE_ENV = require('./envConfig').NODE_ENV;

module.exports = {
  PUBLIC_PATH,
  context: SOURCE_PATH,
  devtool: 'hidden-source-map',
  entry: {
    app: [
      './src/app.js'
    ]
  },
  output: {
    path: PUBLIC_PATH,
    filename: 'js/[name].[hash].js'
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
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
        test: /\.svg$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: '/[path][name].[ext]',
          mimetype: 'image/svg+xml'
        }
      },
      {
        test: /\.(jpe?g|gif|png|)$/,
        loader: 'file-loader',
        options: {
          name: '/[path][name].[ext]'
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
    new ExtractTextPlugin({
      filename: '/css/[name].[hash].css'
    }),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.optimize.ModuleConcatenationPlugin(),
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
    new webpack.optimize.CommonsChunkPlugin({
      async: true,
      children: true
    }),
    new BundleAnalyzerPlugin()
  ],
  target: 'web',
  stats: {
    colors: true,
    hash: false,
    version: false,
    unused: true,
    chunks: false,
    children: false
  }
};
