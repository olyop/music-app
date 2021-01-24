import path from "path"
import dotenv from "dotenv"
import { merge } from "webpack-merge"
import HtmlWebpackPlugin from "html-webpack-plugin"
import { Configuration, ProvidePlugin } from "webpack"

import { proxy, baseConfig, htmlWebpackPluginConfig } from "./webpack.base"

const { DEV_UPLOAD_CLIENT_PORT, DEV_UPLOAD_SERVER_PORT } = dotenv.config().parsed!

const ROOT_PATH = __dirname

const BUILD_PATH = path.join(ROOT_PATH, "dist-upload-server", "public")

const SRC_PATH = path.join(ROOT_PATH, "src")
const UPLOAD_PATH = path.join(SRC_PATH, "upload-client")
const UPLOAD_ROOT_PATH = path.join(UPLOAD_PATH, "index.tsx")
const UPLOAD_ENTRY_PATH = path.join(UPLOAD_PATH, "index.html")

const config: Configuration = {
	entry: UPLOAD_ROOT_PATH,
	output: {
		path: BUILD_PATH,
	},
	devServer: {
		open: false,
		index: "index.html",
		port: parseInt(DEV_UPLOAD_CLIENT_PORT),
		historyApiFallback: { index: "/index.html" },
		proxy: [{
			context: proxy,
			logLevel: "silent",
			target: `http://localhost:${DEV_UPLOAD_SERVER_PORT}`,
		}],
	},
	plugins: [
		new ProvidePlugin({ Buffer: ["buffer", "Buffer"] }),
		new HtmlWebpackPlugin({
			...htmlWebpackPluginConfig,
			template: UPLOAD_ENTRY_PATH,
		}),
	],
}

export default merge(baseConfig, config)