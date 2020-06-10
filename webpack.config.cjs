const path = require("path")
const Dotenv = require("dotenv-webpack")
const CopyPlugin = require("copy-webpack-plugin")
const TerserPlugin = require("terser-webpack-plugin")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const StylelintPlugin = require("stylelint-webpack-plugin")
const WriteFilePlugin = require("write-file-webpack-plugin")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const CompressionPlugin = require("compression-webpack-plugin")
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer")
const LodashModuleReplacementPlugin = require("lodash-webpack-plugin")
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin")

const srcPath = path.resolve("src")
const clientPath = path.join(srcPath, "client")
const serverPath = path.join(srcPath, "server")
const buildPath = path.join(serverPath, "build")
const publicPath = path.join(clientPath, "public")

const distPath = path.resolve("dist")

module.exports = ({ NODE_ENV }) => {
	const isProd = NODE_ENV === "production"
	return {
		mode: isProd ? "production" : "development",
		entry: path.join(clientPath, "index.tsx"),
		output: {
			publicPath: "/",
			filename: "[hash].js",
			path: path.join(isProd ? distPath : serverPath, "build"),
		},
		devtool: isProd ? "" : "inline-source-map",
		resolve: {
			extensions: [".ts", ".tsx", ".js"],
		},
		devServer: {
			hot: true,
			open: true,
			quiet: true,
			compress: true,
			stats: "errors-only",
			host: process.env.HOST,
			contentBase: publicPath,
			historyApiFallback: true,
			port: process.env.DEV_PORT,
		},
		optimization: {
			minimizer: [
				new TerserPlugin({
					sourceMap: true,
				}),
			],
		},
		module: {
			rules: [
				{
					test: /\.scss$/,
					exclude: /node_modules/,
					loader: [
						isProd ? MiniCssExtractPlugin.loader : "style-loader",
						"css-loader",
						"sass-loader",
					],
				},
				{
					test: /\.(graphql|gql)$/,
					loader: "graphql-tag/loader",
					exclude: /node_modules/,
				},
				{
					test: /\.(t|j)sx?$/,
					exclude: /node_modules/,
					use: {
						loader: "ts-loader",
						options: {
							transpileOnly: !isProd,
						},
					},
				},
				{
					test: /\.js$/,
					enforce: "pre",
					loader: "source-map-loader",
				}
			],
		},
		plugins: [
			...(isProd ? [new CompressionPlugin()] : []),
			...(isProd ? [new LodashModuleReplacementPlugin()] : []),
			...(isProd ? [new OptimizeCssAssetsPlugin()] : []),
			...(isProd ? [new MiniCssExtractPlugin({ filename: "[hash].css" })] : []),
			...(isProd ? [] : [new StylelintPlugin({ configFile: ".stylelintrc.json" })]),
			new Dotenv(),
			...(isProd ? [new BundleAnalyzerPlugin()] : []),
			new HtmlWebpackPlugin({
				template: path.join(publicPath, "index.html"),
				minify: {
					removeComments: true,
					useShortDoctype: true,
					collapseWhitespace: true,
					removeRedundantAttributes: true,
					removeScriptTypeAttributes: true,
					removeStyleLinkTypeAttributes: true,
				},
			}),
			new WriteFilePlugin(),
			new CopyPlugin({
				patterns: [{ from: publicPath, to: buildPath }],
			}),
		],
	}
}