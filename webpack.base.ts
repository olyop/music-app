import path from "path"
import dotenv from "dotenv"
import { Configuration } from "webpack"
import CompressionPlugin from "compression-webpack-plugin"
import MiniCssExtractPlugin from "mini-css-extract-plugin"
import { BundleAnalyzerPlugin } from "webpack-bundle-analyzer"
import OptimizeCssAssetsPlugin from "optimize-css-assets-webpack-plugin"

const { NODE_ENV, HOST, DEV_SERVER_PORT } = dotenv.config().parsed!
const IS_DEV = NODE_ENV === "development"

const ROOT_PATH = __dirname
const BUILD_PATH = path.join(ROOT_PATH, "dist", "public")

const config: Configuration = {
	devtool: "inline-source-map",
	mode: IS_DEV ? "development" : "production",
	output: {
		publicPath: "/",
		path: BUILD_PATH,
		filename: "[hash].js",
	},
	devServer: {
		hot: true,
		host: HOST,
		quiet: true,
		noInfo: true,
		overlay: true,
		compress: true,
		contentBase: false,
		stats: "errors-only",
		clientLogLevel: "none",
		proxy: [{
			logLevel: "silent",
			context: [
				"/graphql",
				"/robots.txt",
				"/favicon.ico",
				"/security.txt",
				"/icons/192.png",
				"/icons/512.png",
				"/manifest.webmanifest",
			],
			target: `http://${HOST}:${DEV_SERVER_PORT}`,
		}],
	},
	resolve: {
		symlinks: false,
		extensions: [".js", ".ts", ".tsx"],
	},
	module: {
		rules: [
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
				test: /\.scss$/,
				exclude: /node_modules/,
				use: [
					IS_DEV ? "style-loader" : MiniCssExtractPlugin.loader,
					"css-loader",
					"sass-loader",
				],
			},
		],
	},
	plugins: IS_DEV ? undefined : [
		new CompressionPlugin(),
		new OptimizeCssAssetsPlugin(),
		new MiniCssExtractPlugin({ filename: "[hash].css" }),
		new BundleAnalyzerPlugin({ analyzerMode: "static", defaultSizes: "gzip" }),
	],
}

export default config