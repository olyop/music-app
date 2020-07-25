import dotenv from "dotenv"
import { Configuration } from "webpack"
import DotenvPlugin from "dotenv-webpack"
import WriteFilePlugin from "write-file-webpack-plugin"
import CompressionPlugin from "compression-webpack-plugin"
import MiniCssExtractPlugin from "mini-css-extract-plugin"
import { BundleAnalyzerPlugin } from "webpack-bundle-analyzer"
import OptimizeCssAssetsPlugin from "optimize-css-assets-webpack-plugin"

const { HOST, NODE_ENV, SERVER_PORT } = dotenv.config().parsed!
const IS_DEV = NODE_ENV === "development"

const config: Configuration = {
	mode: IS_DEV ? "development" : "production",
	output: {
		publicPath: "/",
		filename: "[hash].js",
	},
	devtool: "inline-source-map",
	devServer: {
		hot: true,
		host: HOST,
		open: true,
		quiet: true,
		noInfo: true,
		stats: "none",
		compress: true,
		clientLogLevel: "error",
		historyApiFallback: true,
		proxy: { "/graphql": `http://${HOST}:${SERVER_PORT}` },
	},
	resolve: {
		symlinks: false,
		extensions: [".js", ".ts", ".tsx"],
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
			},
			{
				test: /\.tsx?$/,
				loader: "ts-loader",
				exclude: /node_modules/,
				options: {
					onlyCompileBundledFiles: true,
				},
			},
			{
				test: /\.js$/,
				enforce: "pre",
				use: "source-map-loader",
			},
		],
	},
	plugins: [
		new DotenvPlugin(),
		new WriteFilePlugin(),
		...(IS_DEV ? [] : [
			new CompressionPlugin(),
			new BundleAnalyzerPlugin(),
			new OptimizeCssAssetsPlugin(),
			new MiniCssExtractPlugin({ filename: "[hash].css" }),
		]),
	],
}

export default config