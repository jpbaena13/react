const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
	entry: './source/server.js',
	output: {
		filename: 'index.js',
		path: path.resolve(__dirname + '/../built/server')
	},
	module: {
		loaders: [
			{
				test: /\.json$/,
				loader: 'json'
			},
			{
				test: /\.jsx?$/,
				loader: 'babel-loader',
				exclude: /(node_modules)/,
				query: {
					presets: ['latest-minimal', 'react']
				}
			},
			{
				test: /\.css$/,
				exclude: /(node_modules)/,
				loader: ExtractTextPlugin.extract({fallback: 'style-loader', use: 'css-loader?modules'})
			}
		]
	},
	target: 'node',
	plugins: [
		new ExtractTextPlugin('../statics/styles.css')
	]
}