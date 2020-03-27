const path = require('path');
const webpack = require('webpack');
const purgecss = require('@fullhuman/postcss-purgecss');

const autoprefixer = require('autoprefixer');
const precss = require('precss');
const tailwindcss = require('tailwindcss')

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin')

const TerserPlugin = require('terser-webpack-plugin');
const workboxPlugin = require('workbox-webpack-plugin');

module.exports = {
	mode: process.env.NODE_ENV || 'development',
	devtool: 'cheap-module-source-map',
	entry: {
		app: './src/app.tsx',
	},
	output: {
		filename: '[name].js'
	},
	plugins: [
		new HtmlWebpackPlugin({
			title: 'Outings',
			filename: 'index.html',
			template: 'src/index.html'
		}),
		new MiniCssExtractPlugin({ filename: 'styles.css' }),
		new workboxPlugin.GenerateSW({
			swDest: 'sw.js',
			clientsClaim: true,
			skipWaiting: true
		})
	],
	module: {
		rules: [
			{
				test: /\.(ts|tsx)$/,
				loader: 'ts-loader',
				exclude: [
					/node_modules/,
				]
			},
			{
				test: /\.css$/,
				use: [
					{
						loader: MiniCssExtractPlugin.loader
					},
					{
						loader: 'css-loader',

						options: {
							importLoaders: 1,
							sourceMap: true
						}
					},
					{
						loader: 'postcss-loader',
						options: {
							plugins: [
								tailwindcss({}),
								... process.env.NODE_ENV === 'production'
									? [ purgecss({
										content: [
											'./src/**/*.html',
											'./src/**/*.tsx'
										],
										defaultExtractor: content => content.match(/[\w-/:]+(?<!:)/g) || []
									}) ]
									: []
							]
						}
					}
				]
			}
		]
	},
	resolve: {
		extensions: [ '.js', '.ts', '.tsx' ]
	},
	optimization: {} || {
		minimizer: [
			new TerserPlugin({
				terserOptions: {
					output: {
						comments: false
					},
				},
				extractComments: false
			}),
			new OptimizeCssAssetsPlugin()
		]
	}
};
