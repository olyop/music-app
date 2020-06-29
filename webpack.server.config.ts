import path from "path"
import { Configuration } from "webpack"
import nodeExternals from "webpack-node-externals"

const srcPath = path.resolve("src")
const distPath = path.resolve("dist")
const serverPath = path.join(srcPath, "server")

export default ({ isDev }: { isDev: boolean }): Configuration => ({
	target: "node",
	devtool: false,
	entry: path.join(serverPath, "index.ts"),
	mode: isDev ? "development" : "production",
	output: {
		path: distPath,
	},
	resolve: {
		symlinks: false,
		extensions: [".ts", ".json"],
	},
	optimization: {
		minimize: false,
	},
	module: {
		rules: [
			{
				test: /\.ts$/,
				exclude: /node_modules/,
				use: {
					loader: "ts-loader",
					options: {
						transpileOnly: isDev,
						onlyCompileBundledFiles: true,
					},
				},
			},
		],
	},
	externals: [
		nodeExternals(),
	],
})