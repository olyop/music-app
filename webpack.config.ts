/* eslint-disable node/no-unpublished-import */
import path from "path"
import { Configuration } from "webpack"
import DotenvPlugin from "dotenv-webpack"
import HtmlWebpackPlugin from "html-webpack-plugin"
import CompressionPlugin from "compression-webpack-plugin"
import MiniCssExtractPlugin from "mini-css-extract-plugin"
import { BundleAnalyzerPlugin } from "webpack-bundle-analyzer"
import OptimizeCssAssetsPlugin from "optimize-css-assets-webpack-plugin"

// eslint-disable-next-line node/no-process-env
const { HOST, DEV_PORT, NODE_ENV } = process.env

const rootPath = __dirname
const srcPath = path.join(rootPath, "src")
const distPath = path.join(rootPath, "dist")
const clientPath = path.join(srcPath, "client")
const extensions = [".ts", ".tsx", ".js", ".gql"]

const IS_DEV = NODE_ENV === "dev"

const HTML_MINIFY_CONFIG = {
	removeComments: true,
	collapseWhitespace: true,
	removeRedundantAttributes: true,
	removeScriptTypeAttributes: true,
	removeStyleLinkTypeAttributes: true,
}

const config: Configuration = {
	devtool: false,
	mode: IS_DEV ? "development" : "production",
	entry: path.join(clientPath, "index.tsx"),
	output: {
		publicPath: "/",
		filename: "[hash].js",
		path: path.join(distPath, "build"),
	},
	resolve: {
		extensions,
		symlinks: false,
	},
	devServer: {
		hot: true,
		open: true,
		host: HOST,
		compress: true,
		stats: "minimal",
		historyApiFallback: true,
		port: parseInt(DEV_PORT!),
	},
	module: {
		rules: [
			{
				test: /\.scss$/,
				exclude: /node_modules/,
				loader: [
					IS_DEV ? "style-loader" : MiniCssExtractPlugin.loader,
					"css-loader",
					"sass-loader",
				],
			},
			{
				test: /\.gql$/,
				exclude: /node_modules/,
				loader: "graphql-tag/loader",
				include: path.join(clientPath, "graphql"),
			},
			{
				test: /\.tsx?$/,
				loader: "ts-loader",
				exclude: /node_modules/,
			},
		],
	},
	plugins: [
		new DotenvPlugin(),
		new HtmlWebpackPlugin({
			minify: HTML_MINIFY_CONFIG,
			template: path.join(clientPath, "index.html"),
		}),
		...(IS_DEV ? [] : [
			new CompressionPlugin(),
			new BundleAnalyzerPlugin(),
			new OptimizeCssAssetsPlugin(),
			new MiniCssExtractPlugin({ filename: "[hash].css" }),
		]),
	],
}

export default config