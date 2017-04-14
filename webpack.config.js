// Set BUILDMODE to 'production' to reduce overhead.
// Set to 'emptydatabase' to clear the database on each load.
// Use anything else, but preferrably 'development' for whatever.
const BUILDMODE = 'emptydatabase';

const webpack = require('webpack');
const path = require('path');

const BUILD_DIR = path.resolve(__dirname, 'docs');
const APP_DIR = path.resolve(__dirname, 'src');

const webpackConfig = {
  entry: APP_DIR + '/index.js'
, output: {
    path: BUILD_DIR
  , filename: 'quietplace.js'
  }
, module: {
    rules: [
      {
        test: (/\.s(c|a)ss$/)
      , exclude: (/node_modules/)
      , use: [
          'style-loader'
        , 'css-loader'
        , {
            loader: 'sass-loader'
          , options: {
              outputStyle: 'compressed'
            }
          }
        ]
      }
    , {
        test: (/\.ya?ml$/)
      , exclude: (/node_modules/)
      , use: [
          'json-loader'
        , 'yaml-loader'
        ]
      }
    , {
        test: (/\.js$/)
      , exclude: (/node_modules/)
      , use: [
          {
            loader: 'babel-loader'
          , options: {
              presets: [
                'es2016'
              ]
            }
          }
        ]
      }
    ]
  }
, resolve: {
    extensions: [
      '.js'
    ]
  }
, plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify(BUILDMODE)
      }
    })
  ]
};

if (BUILDMODE === 'production') {
  webpackConfig.plugins.push(
    new webpack.optimize.UglifyJsPlugin({
      mangle: true
    , compress: {
        warnings: false
      }
    })
  );

  webpackConfig.devtool = 'hidden-source-map';
}

module.exports = webpackConfig;
