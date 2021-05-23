/* eslint-disable node/no-process-env */

import path from "path"
import { merge } from "webpack-merge"
import HtmlWebpackPlugin from "html-webpack-plugin"
import { Configuration, ProvidePlugin } from "webpack"
import { TITLE } from "@oly_op/music-app-common/metadata"

import { proxy, baseConfig, htmlWebpackPluginConfig } from "./webpack.base"

const ROOT_PATH = __dirname

const BUILD_PATH = path.join(ROOT_PATH, "build", "upload-server", "public")

const SRC_PATH = path.join(ROOT_PATH, "src")
const UPLOAD_PATH = path.join(SRC_PATH, "upload-client")
const UPLOAD_ROOT_PATH = path.join(UPLOAD_PATH, "index.tsx")
const UPLOAD_ENTRY_PATH = path.join(UPLOAD_PATH, "index.html")

const uploadProxy = [
	"/add",
	"/genreSearch",
	"/artistSearch",
	"/artistPhotoSearch",
]

const config: Configuration = {
	entry: UPLOAD_ROOT_PATH,
	output: {
		path: BUILD_PATH,
	},
	devServer: {
		open: false,
		port: parseInt(process.env.UPLOAD_CLIENT_PORT!),
		proxy: [{
			logLevel: "silent",
			context: [ ...proxy, ...uploadProxy ],
			target: `http://127.0.0.1:${process.env.UPLOAD_SERVER_PORT!}`,
		}],
	},
	plugins: [
		new ProvidePlugin({
			Buffer: ["buffer", "Buffer"],
		}),
		new HtmlWebpackPlugin({
			...htmlWebpackPluginConfig(`${TITLE} Upload Client`),
			template: UPLOAD_ENTRY_PATH,
		}),
	],
}

export default merge(baseConfig, config)