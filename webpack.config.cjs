const path = require("path")
const Dotenv = require("dotenv-webpack")
const CopyPlugin = require("copy-webpack-plugin")
const TerserPlugin = require("terser-webpack-plugin")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const StylelintPlugin = require("stylelint-webpack-plugin")
const WriteFilePlugin = require("write-file-webpack-plugin")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const CompressionPlugin = require("compression-webpack-plugin")
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer")
const LodashModuleReplacementPlugin = require("lodash-webpack-plugin")
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin")

const srcPath = path.resolve("src")
const clientPath = path.join(srcPath, "client")
const serverPath = path.join(srcPath, "server")
const buildPath = path.join(serverPath, "build")
const publicPath = path.join(clientPath, "public")

module.exports = ({ NODE_ENV }) => {
  const isProd = NODE_ENV === "isProduction"
  return {
    entry: path.join(clientPath, "index.js"),
    output: {
      publicPath: "/",
      filename: "[hash].js",
      path: path.join(serverPath, "build"),
    },
    devServer: {
      hot: true,
      open: true,
      quiet: true,
      compress: true,
      stats: "errors-only",
      host: process.env.HOST,
      contentBase: publicPath,
      historyApiFallback: true,
      port: process.env.DEV_PORT,
    },
    module: {
      rules: [
        {
          test: /\.scss$/,
          exclude: /node_modules/,
          loader: [
            isProd ? MiniCssExtractPlugin.loader : "style-loader",
            "css-loader",
            "sass-loader",
          ],
        },
        {
          exclude: /node_modules/,
          test: /\.(graphql|gql)$/,
          loader: "graphql-tag/loader",
        },
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: [
            "babel-loader",
            "eslint-loader",
          ],
        },
      ],
    },
    plugins: [
      ...(isProd ? [new CompressionPlugin()] : []),
      ...(isProd ? [new LodashModuleReplacementPlugin()] : []),
      ...(isProd ? [new OptimizeCssAssetsPlugin()] : []),
      ...(isProd ? [new MiniCssExtractPlugin({ filename: "[hash].css" })] : []),
      ...(isProd ? [new TerserPlugin()] : []),
      ...(isProd ? [] : [new StylelintPlugin({ configFile: ".stylelint.json" })]),
      new Dotenv(),
      ...(isProd ? [new BundleAnalyzerPlugin()] : []),
      new HtmlWebpackPlugin({
        template: path.join(publicPath, "index.html"),
        minify: {
          removeComments: true,
          useShortDoctype: true,
          collapseWhitespace: true,
          removeRedundantAttributes: true,
          removeScriptTypeAttributes: true,
          removeStyleLinkTypeAttributes: true,
        },
      }),
      new WriteFilePlugin(),
      new CopyPlugin({
        patterns: [{ from: publicPath, to: buildPath }],
      }),
    ],
  }
}
