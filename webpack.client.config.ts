import path from "path"
import { Configuration } from "webpack"
import DotenvPlugin from "dotenv-webpack"
import TerserPlugin from "terser-webpack-plugin"
import HtmlWebpackPlugin from "html-webpack-plugin"
import { CleanWebpackPlugin } from "clean-webpack-plugin"
import CompressionPlugin from "compression-webpack-plugin"
import MiniCssExtractPlugin from "mini-css-extract-plugin"
import { BundleAnalyzerPlugin } from "webpack-bundle-analyzer"
import LodashModuleReplacementPlugin from "lodash-webpack-plugin"
import OptimizeCssAssetsPlugin from "optimize-css-assets-webpack-plugin"

// eslint-disable-next-line node/no-process-env
const { HOST, DEV_PORT } = process.env

const srcPath = path.resolve("src")
const distPath = path.resolve("dist")
const clientPath = path.join(srcPath, "client")

export default ({ isDev }: { isDev: boolean }): Configuration => ({
	devtool: isDev && "inline-source-map",
	mode: isDev ? "development" : "production",
	entry: path.join(clientPath, "index.tsx"),
	output: {
		publicPath: "/",
		filename: "[hash].js",
		path: path.join(distPath, "build"),
	},
	resolve: {
		symlinks: false,
		extensions: [".ts", ".tsx", ".js"],
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
	optimization: {
		minimizer: [new TerserPlugin({ sourceMap: true })],
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
				test: /\.(graphql|gql)$/,
				exclude: /node_modules/,
				loader: "graphql-tag/loader",
				include: path.join(clientPath, "graphql"),
			},
			{
				test: /\.tsx?$/,
				exclude: /node_modules/,
				use: {
					loader: "ts-loader",
					options: {
						transpileOnly: isDev,
					},
				},
			},
			{
				test: /\.js$/,
				enforce: "pre",
				loader: "source-map-loader",
			},
		],
	},
	plugins: [
		...(isDev ? [] : [
			new CompressionPlugin(),
			new LodashModuleReplacementPlugin(),
			new OptimizeCssAssetsPlugin(),
			new MiniCssExtractPlugin({ filename: "[hash].css" }),
			new BundleAnalyzerPlugin(),
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
		new CleanWebpackPlugin(),
	],
})