import path from "path"
import dotenv from "dotenv"
import { merge } from "webpack-merge"
import { Configuration } from "webpack"
import DotenvPlugin from "dotenv-webpack"
import HtmlWebpackPlugin from "html-webpack-plugin"

import baseConfig from "./webpack.base"

const { DEV_CLIENT_PORT } = dotenv.config().parsed!

const ROOT_PATH = __dirname
const SRC_PATH = path.join(ROOT_PATH, "src")
const CLIENT_PATH = path.join(SRC_PATH, "client")
const CLIENT_ROOT_PATH = path.join(CLIENT_PATH, "index.tsx")
const CLIENT_ENTRY_PATH = path.join(CLIENT_PATH, "index.html")

const config: Configuration = {
	entry: CLIENT_ROOT_PATH,
	devServer: {
		open: true,
		index: "client.html",
		openPage: "library/songs",
		port: parseInt(DEV_CLIENT_PORT),
		historyApiFallback: { index: "/client.html" },
	},
	plugins: [
		new DotenvPlugin(),
		new HtmlWebpackPlugin({
			filename: "client.html",
			template: CLIENT_ENTRY_PATH,
		}),
	],
}

export default merge(baseConfig, config)