import path from "path"
import dotenv from "dotenv"
import DotenvPlugin from "dotenv-webpack"
import CopyPlugin from "copy-webpack-plugin"
import WriteFilePlugin from "write-file-webpack-plugin"
import CompressionPlugin from "compression-webpack-plugin"
import MiniCssExtractPlugin from "mini-css-extract-plugin"
import { BundleAnalyzerPlugin } from "webpack-bundle-analyzer"
import { Configuration, Plugin, RuleSetRule, Output } from "webpack"
import HtmlWebpackPlugin, { MinifyOptions } from "html-webpack-plugin"
import OptimizeCssAssetsPlugin from "optimize-css-assets-webpack-plugin"
import { Configuration as DevServerConfiguration } from "webpack-dev-server"

// eslint-disable-next-line node/no-process-env
const { HOST, PORT, DEV_PORT, NODE_ENV } = dotenv.config().parsed!

const ROOT_PATH = __dirname
const SRC_PATH = path.join(ROOT_PATH, "src")
const DIST_PATH = path.join(ROOT_PATH, "dist")
const BUILD_PATH = path.join(DIST_PATH, "build")
const CLIENT_PATH = path.join(SRC_PATH, "client")
const PUBLIC_PATH = path.join(CLIENT_PATH, "public")
const INDEX_HTML = path.join(PUBLIC_PATH, "index.html")
const CLIENT_ROOT_PATH = path.join(CLIENT_PATH, "index.tsx")

const extensions = [".ts", ".tsx", ".js"]

const IS_DEV = NODE_ENV === "development"

const mode = IS_DEV ? "development" : "production"
const entry = CLIENT_ROOT_PATH
const devtool = "inline-source-map"

const output: Output = {
	publicPath: "/",
	path: BUILD_PATH,
	filename: "[hash].js",
}

const minify: MinifyOptions = {
	removeComments: true,
	collapseWhitespace: true,
	removeRedundantAttributes: true,
	removeScriptTypeAttributes: true,
	removeStyleLinkTypeAttributes: true,
}

const devServer: DevServerConfiguration = {
	hot: true,
	open: true,
	host: HOST,
	quiet: true,
	noInfo: true,
	stats: "none",
	compress: true,
	clientLogLevel: "error",
	port: parseInt(DEV_PORT),
	historyApiFallback: true,
	contentBase: PUBLIC_PATH,
	proxy: { "/graphql": `http://${HOST}:${PORT}` },
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
		include: path.join(CLIENT_PATH, "graphql"),
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
	new HtmlWebpackPlugin({ minify, template: INDEX_HTML }),
	...(IS_DEV ? [
		new WriteFilePlugin(),
	] : [
		new CompressionPlugin(),
		new BundleAnalyzerPlugin(),
		new OptimizeCssAssetsPlugin(),
		new MiniCssExtractPlugin({ filename: "[hash].css" }),
		new CopyPlugin({ patterns: [{ from: PUBLIC_PATH, to: BUILD_PATH }] }),
	]),
]

const config: Configuration = {
	mode,
	entry,
	output,
	devtool,
	plugins,
	devServer,
	module: { rules },
	resolve: { symlinks: false,	extensions },
}

export default config