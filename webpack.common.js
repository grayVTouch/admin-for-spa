const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
	entry: {
		app: ['babel-polyfill' , './source/app.js']
	} , 
	plugins: [
		new CleanWebpackPlugin(['compiled']),
		new HtmlWebpackPlugin({
			filename: 'app.html' , 
			template: 'online.html'
		}) , 
		new VueLoaderPlugin() , 
		new MiniCssExtractPlugin({
			filename: "css/[name].css" ,
			chunkFilename: "css/[id].css"
		}) ,
	] , 
	output: {
		filename: 'js/[name].js' , 
		path: path.resolve(__dirname , 'compiled')
	} , 
	module: {
		rules: [
			{
				test: /\.js/ , 
				exclude: /node_modules/ , 
				use: {
					loader: 'babel-loader' ,
				}
			} , 
			{
				test: /\.css/ , 
				use: [
					MiniCssExtractPlugin.loader ,
					// 'vue-style-loader' ,
					{
						loader: 'css-loader' , 
							options: {
								sourceMap: true
							}
					}
				]
			} , 
			{
				test: /\.(png|svg|jpg|gif)$/ , 
				use: [
					{
						loader: 'file-loader' , 
						options: {
							name: 'assets/image/[name].[ext]'
						}
					}
				]
			} , 
			{
				test: /\.vue$/ , 
				loader: 'vue-loader'
			} , 
			{
				test: /\.(woff|woff2|eot|ttf|otf)$/ ,
				use: [
					{
                        loader: 'file-loader' ,
						options: {
                        	name: 'assets/font/[name].[ext]'
						}
					}
				],
			}
		]
	} , 
	resolve: {
		alias: {
			// 依赖
			'vue': 'vue/dist/vue.esm.js' , 
			'vue-router': 'vue-router/dist/vue-router.esm.js' , 
			'vuex': 'vuex/dist/vuex.esm.js' ,
			'iview.js': 'iview/dist/iview.js' ,
			'iview.css': 'iview/dist/styles/iview.css' ,

			// 目录别名
            asset: path.resolve(__dirname , './source/asset') ,
			_vue: path.resolve(__dirname , './source/vue') ,
			api: path.resolve(__dirname , './source/api') ,
			mapping: path.resolve(__dirname , './source/mapping') ,

			// view: path.resolve(__dirname , './source/vue/view') ,
			// router: path.resolve(__dirname , './source/vue/router') ,
			// store: path.resolve(__dirname , './source/vue/store') ,
			// mixin: path.resolve(__dirname , './source/vue/mixin')
		}
	}
};
