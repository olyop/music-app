/* eslint-disable quote-props */

import {
	TITLE,
	KEYWORDS,
	DESCRIPTION,
} from "@oly_op/music-app-common/metadata"

import dotenv from "dotenv"
import { Configuration } from "webpack"
import CompressionPlugin from "compression-webpack-plugin"
import MiniCssExtractPlugin from "mini-css-extract-plugin"
import { BundleAnalyzerPlugin } from "webpack-bundle-analyzer"
import OptimizeCssAssetsPlugin from "optimize-css-assets-webpack-plugin"
import { Options as HtmlWebpackPluginOptions } from "html-webpack-plugin"

const { NODE_ENV } = dotenv.config().parsed!
const IS_DEV = NODE_ENV === "development"

const metaTags: Record<string, string> = {
	"og:type": "PWA",
	"og:title": TITLE,
	"twitter:dnt": "on",
	"keywords": KEYWORDS,
	"google": "notranslate",
	"robots": "index,follow",
	"theme-color": "#ffffff",
	"application-name": TITLE,
	"og:url": "localhost:3000",
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
}

export const htmlWebpackPluginConfig: HtmlWebpackPluginOptions = {
	title: TITLE,
	minify: true,
	meta: metaTags,
	filename: "index.html",
	scriptLoading: "defer",
}

export const proxy = [
	"/graphql",
	"/robots.txt",
	"/favicon.ico",
	"/algolia.png",
	"/security.txt",
	"/icons/192.png",
	"/icons/512.png",
	"/manifest.webmanifest",
]

export const baseConfig: Configuration = {
	devtool: "inline-source-map",
	mode: IS_DEV ? "development" : "production",
	output: {
		publicPath: "/",
		filename: "[hash].js",
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
		host: "localhost",
		contentBase: false,
		index: "index.html",
		stats: "errors-only",
		clientLogLevel: "none",
		historyApiFallback: { index: "/index.html" },
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
			test: /\.hbs$/,
			loader: "handlebars-loader",
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
			test: /\.scss$/,
			exclude: /node_modules/,
			use: [
				IS_DEV ? "style-loader" : MiniCssExtractPlugin.loader,
				"css-loader",
				"sass-loader",
			],
		}],
	},
	plugins: IS_DEV ? undefined : [
		new CompressionPlugin(),
		new OptimizeCssAssetsPlugin(),
		new MiniCssExtractPlugin({ filename: "[hash].css" }),
		new BundleAnalyzerPlugin({ analyzerMode: "static", defaultSizes: "gzip" }),
	],
}