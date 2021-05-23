/* eslint-disable quote-props, node/no-process-env */

import { KEYWORDS, DESCRIPTION } from "@oly_op/music-app-common/metadata"

import { Configuration } from "webpack"
import DotenvPlugin from "dotenv-webpack"
import CompressionPlugin from "compression-webpack-plugin"
import MiniCssExtractPlugin from "mini-css-extract-plugin"
import CssMinimizerPlugin from "css-minimizer-webpack-plugin"
// import { BundleAnalyzerPlugin } from "webpack-bundle-analyzer"
import { Options as HtmlWebpackPluginOptions } from "html-webpack-plugin"

const IS_DEV = process.env.NODE_ENV === "development"

export const htmlWebpackPluginConfig =
	(title: string): HtmlWebpackPluginOptions => ({
		title,
		minify: true,
		filename: "index.html",
		meta: {
			"og:type": "PWA",
			"og:title": title,
			"twitter:dnt": "on",
			"keywords": KEYWORDS,
			"google": "notranslate",
			"robots": "index,follow",
			"theme-color": "#ffffff",
			"application-name": title,
			"author": "Oliver Plummer",
			"description": DESCRIPTION,
			"og:image": "/icons/192.png",
			"og:description": DESCRIPTION,
			"mobile-web-app-capable": "yes",
			"viewport": `
				minimum-scale=1,
				initial-scale=1,
				shrink-to-fit=no,
				width=device-width
			`,
		},
	})

export const proxy = [
	"/robots.txt",
	"/favicon.ico",
	"/security.txt",
]

export const baseConfig: Configuration = {
	mode: IS_DEV ? "development" : "production",
	devtool: IS_DEV ? "inline-source-map" : false,
	output: {
		publicPath: "/",
		filename: "[fullhash].js",
	},
	ignoreWarnings: [
		/Failed to parse source map/,
	],
	devServer: {
		hot: true,
		quiet: true,
		noInfo: true,
		overlay: true,
		compress: true,
		contentBase: false,
		clientLogLevel: "debug",
		stats: "errors-warnings",
		historyApiFallback: true,
	},
	resolve: {
		symlinks: false,
		extensions: [".js", ".ts", ".tsx"],
	},
	module: {
		rules: [{
			test: /\.js$/,
			enforce: "pre",
			loader: "source-map-loader",
		},{
			test: /\.gql$/,
			exclude: /node_modules/,
			loader: "graphql-tag/loader",
		},{
			test: /\.tsx?$/,
			loader: "ts-loader",
			exclude: /node_modules/,
			options: {
				onlyCompileBundledFiles: true,
			},
		},{
			test: /\.css$/,
			use: [
				IS_DEV ? "style-loader" : MiniCssExtractPlugin.loader,
				"css-loader",
			],
		},{
			test: /\.scss$/,
			use: [
				IS_DEV ? "style-loader" : MiniCssExtractPlugin.loader,
				"css-loader",
				"sass-loader",
			],
		}],
	},
	plugins: [
		new DotenvPlugin(),
		...(IS_DEV ? [] : [
			new CompressionPlugin(),
			new CssMinimizerPlugin(),
			new MiniCssExtractPlugin({ filename: "[hash].css" }),
			// new BundleAnalyzerPlugin({ analyzerMode: "static", defaultSizes: "gzip" }),
		]),
	],
}