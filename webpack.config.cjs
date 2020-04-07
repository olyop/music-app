const os = require("os")
const path = require("path")
const noop = require("lodash/noop.js")
const { ProgressPlugin } = require("webpack")
const CopyPlugin = require("copy-webpack-plugin")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const MinifyPlugin = require("babel-minify-webpack-plugin")
const WriteFilePlugin = require("write-file-webpack-plugin")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const CompressionPlugin = require("compression-webpack-plugin")
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer")
const LodashModuleReplacementPlugin = require("lodash-webpack-plugin")
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin")

const srcPath = path.resolve("src")
const clientPath = path.join(srcPath, "client")
const serverPath = path.join(srcPath, "server")
const publicPath = path.join(clientPath, "public")

const HOST = os.networkInterfaces().Ethernet[1].address

module.exports = ({ mode }) => {
  const isProduction = mode === "production"
  return {
    mode,
    entry: path.join(clientPath, "index.js"),
    output: {
      publicPath: "/",
      filename: "[hash].js",
      path: path.join(serverPath, "build"),
    },
    devServer: {
      host: HOST,
      port: 8080,
      open: false,
      compress: true,
      stats: "errors-only",
      contentBase: publicPath,
      historyApiFallback: true,
    },
    module: {
      rules: [
        {
          test: /\.(|jpg|png|ico|txt|json)$/,
          exclude: /node_modules/,
          loader: "file-loader",
        },
        {
          test: /\.html/,
          exclude: /node_modules/,
          loader: "html-loader",
        },
        {
          test: /\.css$/,
          exclude: /node_modules/,
          loader: [
            MiniCssExtractPlugin.loader,
            "css-loader",
          ],
        },
        {
          test: /\.scss$/,
          exclude: /node_modules/,
          loader: [
            MiniCssExtractPlugin.loader,
            "css-loader",
            "sass-loader",
          ],
        },
        {
          test: /\.(graphql|gql)$/,
          exclude: /node_modules/,
          loader: "graphql-tag/loader",
        },
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: [
            {
              loader: "babel-loader",
              options: {
                presets: ["@babel/react", "@babel/env"],
                plugins: ["@babel/plugin-proposal-class-properties", "lodash"],
              } ,
            },
            {
              loader: "eslint-loader",
            },
          ],
        },
      ],
    },
    plugins: [
      isProduction ? new BundleAnalyzerPlugin({ analyzerMode: "static" }) : noop,
      isProduction ? new CompressionPlugin() : noop,
      isProduction ? new ProgressPlugin() : noop,
      isProduction ? new LodashModuleReplacementPlugin() : noop,
      isProduction ? new MinifyPlugin({}, { comments: false }) : noop,
      isProduction ? new OptimizeCssAssetsPlugin() : noop,
      new MiniCssExtractPlugin({ filename: "[hash].css" }),
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
      new CopyPlugin([{
        from: path.join(publicPath),
        to: path.join(serverPath, "build"),
      }]),
    ],
  }
}
