'use strict';

let webpack = require('webpack');

module.exports = {
  output:{
    filename: 'main.js',
    publicPath: '/assets/'
  },
  cahe: true,
  debug: true,
  devtool: 'sourcemap',
  entry: [
    'webpack/hot/only-dev-server',
    './src/components/GalleryByReactApp.js'
  ],
  stats:{
    colors:true,
    reasons: true
  },
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
      test: /\.less/,
      loader: 'style-loader!css-loader!autoless-loader?outputStyle=expanded'
    },{
      test: /\.css$/,
      loader: 'style-loader!css-loader'
    },{
      test: /\.(png|jpg|woff|woff2)$/,
      loader: 'url-loader?limit=8192'
    }]
  },
  plugins:[
    new webpack.HotModuleReplacementPlugin()
  ]
};
