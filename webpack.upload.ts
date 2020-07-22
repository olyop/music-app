import path from "path"
import dotenv from "dotenv"
import { merge } from "webpack-merge"
import { Configuration } from "webpack"
import HtmlWebpackPlugin from "html-webpack-plugin"

import baseConfig from "./webpack.base"

const { DEV_UPLOAD_PORT } = dotenv.config().parsed!

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
		open: false,
		port: parseInt(DEV_UPLOAD_PORT),
		contentBase: UPLOAD_PUBLIC_PATH,
	},
	plugins: [
		new HtmlWebpackPlugin({ template: UPLOAD_INDEX_HTML }),
	],
}

export default merge(baseConfig, config)