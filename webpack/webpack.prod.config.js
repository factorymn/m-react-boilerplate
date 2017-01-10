var path = require('path');
var webpack = require('webpack');
var CleanPlugin = require('clean-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var ManifestPlugin = require('webpack-manifest-plugin');

module.exports = function() {
  var rootPath = path.resolve(__dirname , '..');
  var srcDir = process.env.NODE_ENV === 'production' ? 'production' : 'staging';
  var outPath = path.join('public', srcDir);
  
  return {
    context: path.resolve(__dirname , '..'),
    devtool: 'cheap-module-source-map',
    entry: [
      './src/app.js' // Start with js/app.js...
    ],
    output: {
      path: outPath,
      filename: '[name].[hash].js'
    },
    module: {
      loaders: [{
        test: /\.jsx?$/, // Transform all .js files required somewhere within an entry point...
        loader: 'babel', // ...with the specified loaders...
        exclude: /node_modules/ // ...except for the node_modules folder.
      }, {
        test: /\.styl|\.css/,
        loader: ExtractTextPlugin.extract(
          'style',
          'css?importLoaders=1&localIdentName=[local]&sourceMap!autoprefixer!stylus?sourceMap')
      }, {
        test: /\.jpe?g$|\.gif$|\.png$/i,
        loader: "url-loader?limit=10000"
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
      modulesDirectories: [
        'src',
        'node_modules'
      ],
      extensions: ['', '.json', '.js', '.jsx', '.styl']
    },
    plugins: [
      new CleanPlugin(outPath, {
        root: rootPath
      }),
      new ExtractTextPlugin('[name].[hash].css'),
      new ManifestPlugin(),
      new webpack.DefinePlugin({
        'process.env': {
          // Useful to reduce the size of client-side libraries, e.g. react
          NODE_ENV: JSON.stringify('production')
        },
        'STAGING': process.env.NODE_ENV === 'staging',
        'PRODUCTION': process.env.NODE_ENV === 'production'
      }),
      // Optimizations
      new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /ru|en-gb/),
      new webpack.optimize.DedupePlugin(),
      new webpack.optimize.OccurenceOrderPlugin(),
      new webpack.optimize.UglifyJsPlugin({ // Optimize the JavaScript...
        compress: {
          warnings: false, // ...but do not show warnings in the console (there is a lot of them)
          drop_console: true // discard calls to console.* functions in bundle file
        }
      })
    ],
    target: 'web', // Make web variables accessible to webpack, e.g. window
    stats: {
      colors: true,
      hash: false,
      version: false,
      chunks: false,
      children: false
    },
    progress: true,
    
    stylus: {
      import: [path.resolve(__dirname, '../src/commonStyles/commonStyles.styl')]
    }
  }
}
