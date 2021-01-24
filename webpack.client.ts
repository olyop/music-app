import path from "path"
import dotenv from "dotenv"
import { merge } from "webpack-merge"
import { Configuration } from "webpack"
import DotenvPlugin from "dotenv-webpack"
import HtmlWebpackPlugin from "html-webpack-plugin"

import { proxy, baseConfig, htmlWebpackPluginConfig } from "./webpack.base"

const { DEV_CLIENT_PORT, DEV_SERVER_PORT } = dotenv.config().parsed!

const ROOT_PATH = __dirname

const BUILD_PATH = path.join(ROOT_PATH, "dist-server", "public")

const SRC_PATH = path.join(ROOT_PATH, "src")
const CLIENT_PATH = path.join(SRC_PATH, "client")
const CLIENT_ROOT_PATH = path.join(CLIENT_PATH, "index.tsx")
const CLIENT_ENTRY_PATH = path.join(CLIENT_PATH, "index.html")

const config: Configuration = {
	entry: CLIENT_ROOT_PATH,
	output: {
		path: BUILD_PATH,
	},
	devServer: {
		open: false,
		index: "index.html",
		openPage: "library/songs",
		port: parseInt(DEV_CLIENT_PORT),
		historyApiFallback: { index: "/index.html" },
		proxy: [{
			context: proxy,
			logLevel: "silent",
			target: `http://localhost:${DEV_SERVER_PORT}`,
		}],
	},
	plugins: [
		new DotenvPlugin(),
		new HtmlWebpackPlugin({
			...htmlWebpackPluginConfig,
			template: CLIENT_ENTRY_PATH,
		}),
	],
}

export default merge(baseConfig, config)