const webpack = require('webpack');
const HTMLPlugin = require('html-webpack-plugin');
const OpenBrowserPlugin = require('open-browser-webpack-plugin');
const merge = require('webpack-merge');
const SpeedMeasurePlugin = require('speed-measure-webpack-plugin');
const base = require('./webpack-common.config');
const { polyfill, common } = require('./webpack-utils');
const { buildOutputDir, systemEnv } = common;
const smp = new SpeedMeasurePlugin();

module.exports = smp.wrap(merge(base, {
	mode: 'development',
	entry: {
		app: [...polyfill, './index.jsx'],
		tmallEnjoy: [...polyfill, './tmall-enjoy/index.jsx']
	},
	devtool: 'cheap-module-eval-source-map',
	plugins: [
		new webpack.HotModuleReplacementPlugin(),
		new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: JSON.stringify('development'),
				SYSTEM_ENV: JSON.stringify('development'),
				SHOP_ID: JSON.stringify('106878997')
			}
		}),
		new webpack.HashedModuleIdsPlugin(),
		new OpenBrowserPlugin({ url: 'http://localhost:80' }),
	]
}));
