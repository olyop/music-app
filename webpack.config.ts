/* eslint-disable node/no-unpublished-import */
import path from "path"
import { Configuration } from "webpack"
import DotenvPlugin from "dotenv-webpack"
import HtmlWebpackPlugin from "html-webpack-plugin"
import { CleanWebpackPlugin } from "clean-webpack-plugin"
import CompressionPlugin from "compression-webpack-plugin"
import MiniCssExtractPlugin from "mini-css-extract-plugin"
import { BundleAnalyzerPlugin } from "webpack-bundle-analyzer"
import LodashModuleReplacementPlugin from "lodash-webpack-plugin"
import OptimizeCssAssetsPlugin from "optimize-css-assets-webpack-plugin"

// eslint-disable-next-line node/no-process-env
const { HOST, DEV_PORT, NODE_ENV } = process.env

const rootPath = __dirname
const srcPath = path.join(rootPath, "src")
const distPath = path.join(rootPath, "dist")
const clientPath = path.join(srcPath, "client")

const isDev = NODE_ENV === "dev"

const config: Configuration = {
	devtool: false,
	mode: isDev ? "development" : "production",
	entry: path.join(clientPath, "index.tsx"),
	output: {
		publicPath: "/",
		filename: "[hash].js",
		path: path.join(distPath, "build"),
	},
	resolve: {
		symlinks: false,
		extensions: [".ts", ".tsx", ".js", ".gql"],
	},
	devServer: {
		hot: true,
		open: true,
		host: HOST,
		quiet: true,
		compress: true,
		stats: "errors-only",
		historyApiFallback: true,
		port: parseInt(DEV_PORT!),
	},
	module: {
		rules: [
			{
				test: /\.scss$/,
				exclude: /node_modules/,
				loader: [
					isDev ? "style-loader" : MiniCssExtractPlugin.loader,
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
				exclude: /node_modules/,
				use: [
					"babel-loader",
					{
						loader: "ts-loader",
						options: {
							onlyCompileBundledFiles: true,
						},
					},
				],
			},
		],
	},
	plugins: [
		...(isDev ? [
			new CleanWebpackPlugin(),
		] : [
			new CompressionPlugin(),
			new BundleAnalyzerPlugin(),
			new OptimizeCssAssetsPlugin(),
			new LodashModuleReplacementPlugin(),
			new MiniCssExtractPlugin({ filename: "[hash].css" }),
		]),
		new DotenvPlugin(),
		new HtmlWebpackPlugin({
			template: path.join(clientPath, "index.html"),
			minify: {
				removeComments: true,
				collapseWhitespace: true,
				removeRedundantAttributes: true,
				removeScriptTypeAttributes: true,
				removeStyleLinkTypeAttributes: true,
			},
		}),
	],
}

export default config