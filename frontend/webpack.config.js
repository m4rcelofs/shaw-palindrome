'use strict';

const CleanWebpackPlugin      = require('clean-webpack-plugin'),
      ExtractTextPlugin       = require('extract-text-webpack-plugin'),
      HtmlWebpackPlugin       = require('html-webpack-plugin'),
      merge                   = require('webpack-merge'),
      path                    = require('path'),
      pkg                     = require('./package.json'),
      webpack                 = require('webpack');

const TARGET = process.env.BABEL_ENV = process.env.npm_lifecycle_event;
const PATHS = {
  app: path.join(__dirname, 'app'),
  build: path.join(__dirname, 'build'),
  images: path.join(__dirname, 'app', 'resources'),
  style: path.join(__dirname, 'app', 'main.css')
};

const common = {
  entry: {
    app: PATHS.app,
    style: PATHS.style
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  output: {
    path: PATHS.build,
    filename: '[name].js'
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loaders: ['babel?cacheDirectory'],
        include: PATHS.app
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template:  path.join(PATHS.app, 'index.ejs'),
      inject: 'body'
    })
  ]
};

const dev = {
  devtool: 'source-map',
  devServer: {
    contentBase: PATHS.build,
    historyApiFallback: true,
    hot: true,
    inline: true,
    progress: true,
    stats: 'errors-only',
    host: process.env.HOST,
    port: process.env.PORT
  },
  module: {
    loaders: [
      {
        test: /\.css$/,
        loaders: ['style', 'css'],
        include: PATHS.app
      },
      {
        test: /\.(jpg|jpeg|png|svg|gif)$/,
        loader: 'file?name=[path][name].[hash].[ext]',
        include: PATHS.images
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ]
};

const production = {
  entry: {
    vendor: Object.keys(pkg.dependencies)
  },
  output: {
    path: PATHS.build,
    filename: '[name].[chunkhash].js',
    chunkFilename: '[chunkhash].js'
  },
  module: {
    loaders: [
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('style', 'css'),
        include: PATHS.app
      },
      {
        test: /\.(jpg|jpeg|png|svg|gif)$/,
        loaders: ['file?name=[path][name].[hash].[ext]', 'image-webpack'],
        include: PATHS.images
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin([PATHS.build]),
    new webpack.optimize.CommonsChunkPlugin({
      names: ['vendor', 'manifest']
    }),
    new webpack.optimize.DedupePlugin(),
    // affects React build
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"production"'
    }),
    new ExtractTextPlugin('[name].[chunkhash].css'),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    })
  ]
};

if(TARGET === 'dev' || !TARGET) {
  module.exports = merge(common, dev);
}

if(TARGET === 'production') {
  module.exports = merge(common, production);
}