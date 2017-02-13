/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] 
const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const isProduction = process.argv.indexOf('-p') !== -1;

const metadata = require('./package.json');

const config = {
  entry: [
    './src/index.js',
  ],
  output: {
    path: 'dist',
    filename: 'bundle.js',
  },
  module: {
    loaders: [
      { test: /\.js$/, loaders: ['react-hot', 'babel'], include: path.join(__dirname, 'src') },
      { test: /\.css$/, loader: ExtractTextPlugin.extract('style-loader', 'css-loader') },
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'url-loader?limit=10000&mimetype=application/font-woff',
      },
      { test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: 'url-loader?limit=5000' },
    ],
  },
  plugins: [
    new ExtractTextPlugin('bundle.css'),
    new HtmlWebpackPlugin({ hash: true }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(isProduction ? 'production' : 'development'),
      },
      VERSION: JSON.stringify(metadata.version),
    }),
  ],
  devServer: {
    port: 3003,
    host: '0.0.0.0',
  },
  devtool: '#source-map',
};

if (isProduction) {
  config.plugins.push(new CompressionPlugin({
    asset: '[path].gz[query]',
    algorithm: 'zopfli',
    test: /\.js$|\.html$|\.css$|\.svg$/,
  }));
}

module.exports = config;
*/


/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */
const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const isProduction = process.argv.indexOf('-p') !== -1;

const metadata = require('./package.json');

const config = {
  entry: [
    './src/index.js',
  ],
  output: {
    path: 'dist',
    filename: 'bundle.js',
  },
  module: {
    loaders: [
      { test: /\.js$/, loaders: ['react-hot', 'babel'], include: path.join(__dirname, 'src') },
      { test: /\.css$/, loader: ExtractTextPlugin.extract('css-loader?modules&sourceMap') },
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'url-loader?limit=10000&mimetype=application/font-woff',
      },
      { test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: 'url-loader?limit=5000' },
    ],
  },
  plugins: [
    new ExtractTextPlugin('bundle.css'),
    new HtmlWebpackPlugin({ hash: true }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(isProduction ? 'production' : 'development'),
      },
      VERSION: JSON.stringify(metadata.version),
    }),
  ],
  devServer: {
    port: 3003,
    host: '0.0.0.0',
  },
  devtool: '#source-map',
};

if (isProduction) {
  config.plugins.push(new CompressionPlugin({
    asset: '[path].gz[query]',
    algorithm: 'zopfli',
    test: /\.js$|\.html$|\.css$|\.svg$/,
  }));
}

module.exports = config;

