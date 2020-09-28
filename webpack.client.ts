import path from "path"
import dotenv from "dotenv"
import { merge } from "webpack-merge"
import { Configuration } from "webpack"
import CopyPlugin from "copy-webpack-plugin"
import HtmlWebpackPlugin from "html-webpack-plugin"

import baseConfig from "./webpack.base"

const { NODE_ENV, DEV_CLIENT_PORT } = dotenv.config().parsed!
const IS_DEV = NODE_ENV === "development"

const ROOT_PATH = __dirname
const SRC_PATH = path.join(ROOT_PATH, "src")
const DIST_PATH = path.join(ROOT_PATH, "dist")
const CLIENT_PATH = path.join(SRC_PATH, "client")
const BUILD_PATH = path.join(DIST_PATH, "build", "client")
const CLIENT_PUBLIC_PATH = path.join(CLIENT_PATH, "public")
const CLIENT_ROOT_PATH = path.join(CLIENT_PATH, "index.tsx")
const CLIENT_INDEX_HTML = path.join(CLIENT_PUBLIC_PATH, "index.html")

const config: Configuration = {
	entry: CLIENT_ROOT_PATH,
	output: {
		path: BUILD_PATH,
	},
	devServer: {
		port: parseInt(DEV_CLIENT_PORT),
		contentBase: CLIENT_PUBLIC_PATH,
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: CLIENT_INDEX_HTML,
		}),
		...(IS_DEV ? [] : [
			new CopyPlugin({
				patterns: [{
					from: CLIENT_PUBLIC_PATH,
					to: BUILD_PATH,
				}],
			}),
		]),
	],
}

export default merge(baseConfig, config)