'use strict'

module.exports = {
  entry: './app.jsx',
  output: {
    filename: './bundle.min.js'
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /(node_modules)/,
        query: {
          presets: ['es2015', 'react']
        }
      }
    ]
  },
  target: 'web',
  stats: {
    warnings: false
  }
}
