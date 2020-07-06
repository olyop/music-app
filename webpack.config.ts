/* eslint-disable node/no-unpublished-import */
import path from "path"
import DotenvPlugin from "dotenv-webpack"
import CompressionPlugin from "compression-webpack-plugin"
import MiniCssExtractPlugin from "mini-css-extract-plugin"
import { BundleAnalyzerPlugin } from "webpack-bundle-analyzer"
import { Configuration, Plugin, RuleSetRule, Output } from "webpack"
import HtmlWebpackPlugin, { MinifyOptions } from "html-webpack-plugin"
import OptimizeCssAssetsPlugin from "optimize-css-assets-webpack-plugin"
import TerserPlugin, { TerserPluginOptions } from "terser-webpack-plugin"
import { Configuration as DevServerConfiguration } from "webpack-dev-server"

// eslint-disable-next-line node/no-process-env
const { HOST, DEV_PORT, NODE_ENV } = process.env

const ROOT_PATH = __dirname
const SRC_PATH = path.join(ROOT_PATH, "src")
const DIST_PATH = path.join(ROOT_PATH, "dist")
const CLIENT_PATH = path.join(SRC_PATH, "client")

const extensions = [".ts", ".tsx", ".js", ".gql"]

const IS_DEV = NODE_ENV === "dev"

const mode = IS_DEV ? "development" : "production"

const entry = path.join(CLIENT_PATH, "index.tsx")

const output: Output = {
	publicPath: "/",
	filename: "[hash].js",
	path: path.join(DIST_PATH, "build"),
}

const minify: MinifyOptions = {
	removeComments: true,
	collapseWhitespace: true,
	removeRedundantAttributes: true,
	removeScriptTypeAttributes: true,
	removeStyleLinkTypeAttributes: true,
}

const TERSER_PLUGIN_CONFIG: TerserPluginOptions = {
	extractComments: false,
	terserOptions: { output: { comments: false } },
}

const devServer: DevServerConfiguration = {
	hot: true,
	open: true,
	host: HOST,
	compress: true,
	stats: "minimal",
	historyApiFallback: true,
	port: parseInt(DEV_PORT!),
}

const rules: RuleSetRule[] = [{
	test: /\.scss$/,
	exclude: /node_modules/,
	loader: [
		IS_DEV ? "style-loader" : MiniCssExtractPlugin.loader,
		"css-loader",
		"sass-loader",
	],
},{
	test: /\.gql$/,
	exclude: /node_modules/,
	loader: "graphql-tag/loader",
	include: path.join(CLIENT_PATH, "graphql"),
},{
	test: /\.tsx?$/,
	loader: "ts-loader",
	exclude: /node_modules/,
}]

const plugins: Plugin[] = [
	new DotenvPlugin(),
	new HtmlWebpackPlugin({
		minify,
		template: path.join(CLIENT_PATH, "index.html"),
	}),
	...(IS_DEV ? [] : [
		new CompressionPlugin(),
		new BundleAnalyzerPlugin(),
		new OptimizeCssAssetsPlugin(),
		new MiniCssExtractPlugin({ filename: "[hash].css" }),
	]),
]

const minimizer: Plugin[] = [
	new TerserPlugin(TERSER_PLUGIN_CONFIG),
]

const config: Configuration = {
	mode,
	entry,
	output,
	plugins,
	devServer,
	module: { rules },
	optimization: { minimizer },
	resolve: { symlinks: false,	extensions },
}

export default config