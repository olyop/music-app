/* eslint-disable node/no-process-env */

import path from "path"
import { merge } from "webpack-merge"
import { Configuration } from "webpack"
import HtmlWebpackPlugin from "html-webpack-plugin"
import { InjectManifest } from "workbox-webpack-plugin"
import { TITLE } from "@oly_op/music-app-common/metadata"

import { proxy, baseConfig, htmlWebpackPluginConfig } from "./webpack.base"

const ROOT_PATH = __dirname

const BUILD_PATH = path.join(ROOT_PATH, "build", "server", "public")

const SRC_PATH = path.join(ROOT_PATH, "src")
const CLIENT_PATH = path.join(SRC_PATH, "client")
const CLIENT_SW_PATH = path.join(CLIENT_PATH, "sw.ts")
const CLIENT_ROOT_PATH = path.join(CLIENT_PATH, "index.tsx")
const CLIENT_ENTRY_PATH = path.join(CLIENT_PATH, "index.html")

const clientProxy = [
	"/graphql",
	"/icons/192.png",
	"/icons/512.png",
	"/service-worker.js",
	"/manifest.webmanifest",
]

const config: Configuration = {
	entry: CLIENT_ROOT_PATH,
	output: {
		path: BUILD_PATH,
	},
	devServer: {
		open: false,
		port: parseInt(process.env.CLIENT_PORT!),
		proxy: [{
			logLevel: "silent",
			context: [ ...proxy, ...clientProxy ],
			target: `http://127.0.0.1:${process.env.SERVER_PORT!}`,
		}],
	},
	plugins: [
		new InjectManifest({
			swSrc: CLIENT_SW_PATH,
			maximumFileSizeToCacheInBytes: 1000 * 1024 * 1024,
		}),
		new HtmlWebpackPlugin({
			...htmlWebpackPluginConfig(TITLE),
			template: CLIENT_ENTRY_PATH,
		}),
	],
}

export default merge(baseConfig, config)