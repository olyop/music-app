import path from "path"
import dotenv from "dotenv"
import { merge } from "webpack-merge"
import { Configuration } from "webpack"
import CopyPlugin from "copy-webpack-plugin"
import HtmlWebpackPlugin from "html-webpack-plugin"

import baseConfig from "./webpack.base"

const { NODE_ENV, DEV_UPLOAD_PORT } = dotenv.config().parsed!
const IS_DEV = NODE_ENV === "development"

const ROOT_PATH = __dirname
const SRC_PATH = path.join(ROOT_PATH, "src")
const DIST_PATH = path.join(ROOT_PATH, "dist")
const UPLOAD_PATH = path.join(SRC_PATH, "upload")
const BUILD_PATH = path.join(DIST_PATH, "build", "upload")
const UPLOAD_PUBLIC_PATH = path.join(UPLOAD_PATH, "public")
const UPLOAD_ROOT_PATH = path.join(UPLOAD_PATH, "index.tsx")
const UPLOAD_INDEX_HTML = path.join(UPLOAD_PUBLIC_PATH, "index.html")

const config: Configuration = {
	entry: UPLOAD_ROOT_PATH,
	output: {
		path: BUILD_PATH,
	},
	devServer: {
		port: parseInt(DEV_UPLOAD_PORT),
		contentBase: UPLOAD_PUBLIC_PATH,
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: UPLOAD_INDEX_HTML,
		}),
		...(IS_DEV ? [
			new CopyPlugin({
				patterns: [{
					from: UPLOAD_PUBLIC_PATH,
					to: BUILD_PATH,
				}],
			}),
		] : []),
	],
}

export default merge(baseConfig, config)