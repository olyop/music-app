const os = require("os")
const path = require("path")
const CopyPlugin = require("copy-webpack-plugin")
const TerserPlugin = require("terser-webpack-plugin")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const WriteFilePlugin = require("write-file-webpack-plugin")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const CompressionPlugin = require("compression-webpack-plugin")
const LodashModuleReplacementPlugin = require("lodash-webpack-plugin")
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin")

const srcPath = path.resolve("src")
const clientPath = path.join(srcPath, "client")
const serverPath = path.join(srcPath, "server")
const publicPath = path.join(clientPath, "public")

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
    optimization: {
      minimize: isProduction,
      minimizer: [new TerserPlugin()],
    },
    devServer: {
      port: 8080,
      open: false,
      compress: true,
      stats: "errors-only",
      contentBase: publicPath,
      historyApiFallback: true,
      host: os.networkInterfaces().Ethernet[1].address,
    },
    module: {
      rules: [
        {
          test: /\.(|jpg|png|ico|txt|json)$/,
          exclude: /node_modules/,
          loader: "file-loader",
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
      ...(isProduction ? [new CompressionPlugin()] : []),
      ...(isProduction ? [new LodashModuleReplacementPlugin()] : []),
      ...(isProduction ? [new OptimizeCssAssetsPlugin()] : []),
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
