'use strict';

let webpack = require('webpack');

module.exports = {

  output:{
    filename: 'main.js',
    publicPath: '/assets/',
    path: 'dist/assets'
  },

  debug: false,
  devtool: false,
  entry: './src/components/GalleryByReactApp.js',

  stats:{
    colors:true,
    reasons: false
  },
  plugin:[
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.AggressiveMergingPlugin(),
    new webpack.optimize.NoErrorsPlugin()
  ],

  resolve:{
    extensions:['','.js','.jsx'],
    alias:{
      'style': __dirname + './src/styles',
      'mixins': __dirname + '/src/mixins',
      'components': __dirname + '/src/components/'
    }
  },

  module:{
    preLoaders:[{
      test:/\.(js|jsx)$/,
      exclude: /node_modules/,
      loader: 'eslint-loader'
    }],
    loaders:[{
      test:/\.(js|jsx)$/,
      exclude: /node_modules/,
      loader: 'react-hot!babel-loader'
    },{
      test: /\.sass/,
      loader: 'style-loader!css-loader!sass-loader?outputStyle=expanded&indentedSyntax'
    },{
      test: /\.css$/,
      loader: 'style-loader!css-loader'
    },{
      test: /\.(png|jpg|woff|woff2)$/,
      loader: 'url-loader?limit=8192'
    }]
  }
};
