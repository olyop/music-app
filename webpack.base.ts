import path from "path"
import dotenv from "dotenv"
import { Configuration } from "webpack"
import WriteFilePlugin from "write-file-webpack-plugin"
import CompressionPlugin from "compression-webpack-plugin"
import MiniCssExtractPlugin from "mini-css-extract-plugin"
import { BundleAnalyzerPlugin } from "webpack-bundle-analyzer"
import OptimizeCssAssetsPlugin from "optimize-css-assets-webpack-plugin"

const { HOST, NODE_ENV, DEV_SERVER_PORT } = dotenv.config().parsed!
const IS_DEV = NODE_ENV === "development"

const ROOT_PATH = process.cwd()
const BUILD_PATH = path.join(ROOT_PATH, "dist", "public")

const config: Configuration = {
	mode: IS_DEV ? "development" : "production",
	output: {
		publicPath: "/",
		path: BUILD_PATH,
		filename: "[hash].js",
	},
	devtool: "inline-source-map",
	devServer: {
		hot: true,
		host: HOST,
		quiet: true,
		noInfo: true,
		stats: "none",
		compress: true,
		clientLogLevel: "none",
		historyApiFallback: true,
		proxy: {
			"/index.html": "/",
			"*": `http://${HOST}:${DEV_SERVER_PORT}`,
		},
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
		],
	},
	plugins: IS_DEV ? [
		new WriteFilePlugin(),
	] : [
		new CompressionPlugin(),
		new OptimizeCssAssetsPlugin(),
		new MiniCssExtractPlugin({ filename: "[hash].css" }),
		new BundleAnalyzerPlugin({ analyzerMode: "static", defaultSizes: "gzip" }),
	],
}

export default config