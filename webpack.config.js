import os from "os"
import path from "path"
import CopyPlugin from "copy-webpack-plugin"
import TerserPlugin from "terser-webpack-plugin"
import HtmlWebpackPlugin from "html-webpack-plugin"
import WriteFilePlugin from "write-file-webpack-plugin"
import MiniCssExtractPlugin from "mini-css-extract-plugin"
import CompressionPlugin from "compression-webpack-plugin"
import LodashModuleReplacementPlugin from "lodash-webpack-plugin"
import OptimizeCssAssetsPlugin from "optimize-css-assets-webpack-plugin"

const srcPath = path.resolve("src")
const clientPath = path.join(srcPath, "client")
const serverPath = path.join(srcPath, "server")
const publicPath = path.join(clientPath, "public")

const webpackConfig = ({ mode }) => {
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
      minimizer: [
        new TerserPlugin(),
      ],
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
                presets: [
                  "@babel/react",
                  "@babel/env",
                ],
                plugins: [
                  "@babel/plugin-proposal-optional-chaining",
                  "@babel/plugin-proposal-class-properties",
                  "lodash",
                ],
              },
            },
          ],
        },
      ],
    },
    plugins: [
      ...(isProduction ? [ new CompressionPlugin() ] : []),
      ...(isProduction ? [ new LodashModuleReplacementPlugin() ] : []),
      ...(isProduction ? [ new OptimizeCssAssetsPlugin() ] : []),
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
      new CopyPlugin([
        {
          from: path.join(publicPath),
          to: path.join(serverPath, "build"),
        },
      ]),
    ],
  }
}

export default webpackConfig
