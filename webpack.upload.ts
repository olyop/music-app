import path from "path"
import dotenv from "dotenv"
import { merge } from "webpack-merge"
import HtmlWebpackPlugin from "html-webpack-plugin"
import { Configuration, ProvidePlugin } from "webpack"
import { TITLE } from "@oly_op/music-app-common/metadata"

import { baseConfig, metaTags } from "./webpack.base"

const { DEV_SERVER_PORT, DEV_UPLOAD_PORT } = dotenv.config().parsed!

const ROOT_PATH = process.cwd()
const SRC_PATH = path.join(ROOT_PATH, "src")
const UPLOAD_PATH = path.join(SRC_PATH, "upload")
const UPLOAD_ROOT_PATH = path.join(UPLOAD_PATH, "index.tsx")
const UPLOAD_ENTRY_PATH = path.join(UPLOAD_PATH, "index.html")

const config: Configuration = {
	entry: UPLOAD_ROOT_PATH,
	devServer: {
		index: "upload.html",
		port: parseInt(DEV_UPLOAD_PORT),
		historyApiFallback: { index: "upload.html" },
		proxy: { "**": `http://localhost:${DEV_SERVER_PORT}` },
	},
	plugins: [
		new ProvidePlugin({
			Buffer: ["buffer", "Buffer"],
		}),
		new HtmlWebpackPlugin({
			title: TITLE,
			minify: true,
			meta: metaTags,
			scriptLoading: "defer",
			filename: "upload.html",
			template: UPLOAD_ENTRY_PATH,
		}),
	],
}

export default merge(baseConfig, config)