import dotenv from "dotenv"
import DotenvPlugin from "dotenv-webpack"
import WriteFilePlugin from "write-file-webpack-plugin"
import CompressionPlugin from "compression-webpack-plugin"
import MiniCssExtractPlugin from "mini-css-extract-plugin"
import { BundleAnalyzerPlugin } from "webpack-bundle-analyzer"
import { Configuration, Plugin, RuleSetRule, Output } from "webpack"
import OptimizeCssAssetsPlugin from "optimize-css-assets-webpack-plugin"
import { Configuration as DevServerConfiguration } from "webpack-dev-server"

const {
	HOST,
	NODE_ENV,
	SERVER_PORT,
} = dotenv.config().parsed!

const IS_DEV = NODE_ENV === "development"

const extensions = [".ts", ".tsx", ".js"]

const output: Output = {
	publicPath: "/",
	filename: "[hash].js",
}

const devtool = "inline-source-map"
const mode = IS_DEV ? "development" : "production"

const devServer: DevServerConfiguration = {
	hot: true,
	host: HOST,
	quiet: true,
	noInfo: true,
	stats: "none",
	compress: true,
	clientLogLevel: "error",
	historyApiFallback: true,
	proxy: { "/graphql": `http://${HOST}:${SERVER_PORT}` },
}

const rules: RuleSetRule[] = [
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
]

const plugins: Plugin[] = [
	new DotenvPlugin(),
	new WriteFilePlugin(),
	...(IS_DEV ? [] : [
		new CompressionPlugin(),
		new BundleAnalyzerPlugin(),
		new OptimizeCssAssetsPlugin(),
		new MiniCssExtractPlugin({ filename: "[hash].css" }),
	]),
]

const config: Configuration = {
	mode,
	output,
	devtool,
	plugins,
	devServer,
	module: { rules },
	resolve: { symlinks: false,	extensions },
}

export default config