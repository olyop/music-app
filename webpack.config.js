const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin")
const LodashModuleReplacementPlugin = require("lodash-webpack-plugin")
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const CompressionPlugin = require("compression-webpack-plugin")
const { CleanWebpackPlugin } = require("clean-webpack-plugin")
const WriteFilePlugin = require("write-file-webpack-plugin")
const MinifyPlugin = require("babel-minify-webpack-plugin")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const CopyPlugin = require("copy-webpack-plugin")
const { ProgressPlugin } = require("webpack")
const { noop } = require("lodash")
const path = require("path")

const srcPath = path.resolve("src")
const clientPath = path.join(srcPath, "client")
const serverPath = path.join(srcPath, "server")
const publicPath = path.join(clientPath, "public")

module.exports = ({ mode }) => ({
  mode,
  entry: path.join(clientPath, "index.js"),
  output: {
    path: path.join(serverPath, "build"),
    filename: "[hash].js",
    publicPath: "/"
  },
  devServer: {
    host: "localhost",
    port: 8080,
    compress: true,
    contentBase: publicPath,
    historyApiFallback: true,
    open: false,
    stats: "errors-only"
  },
  module: {
    rules: [
      {
        test: /\.(|jpg|png|ico|txt|json)$/,
        exclude: /node_modules/,
        loader: "file-loader"
      },
      {
        test: /\.html/,
        exclude: /node_modules/,
        loader: "html-loader"
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        loader: "css-loader"
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        loader: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          "sass-loader"
        ]
      },
      {
        test: /\.(graphql|gql)$/,
        exclude: /node_modules/,
        loader: "graphql-tag/loader",
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use:[
          {
            loader: "babel-loader",
            options: {
              presets: ["@babel/react", "@babel/env"],
              plugins: ["@babel/plugin-proposal-class-properties", "lodash"]
            } 
          },
          {
            loader: "eslint-loader"
          }
        ]
      }
    ]
  },
  plugins: [
    mode === "production" ? new BundleAnalyzerPlugin({ analyzerMode: "static" }) : noop,
    mode === "production" ? new CompressionPlugin() : noop,
    mode === "production" ? new ProgressPlugin() : noop,
    mode === "production" ? new LodashModuleReplacementPlugin() : noop,
    new CleanWebpackPlugin(),
    mode === "production" ? new MinifyPlugin({}, { comments: false }) : noop,
    mode === "production" ? new OptimizeCssAssetsPlugin() : noop,
    new MiniCssExtractPlugin({
      filename: "[hash].css"
    }),
    new HtmlWebpackPlugin({
      template: path.join(publicPath, "index.html"),
      minify: {
        collapseWhitespace: true,
        removeComments: true,
        removeRedundantAttributes: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true,
        useShortDoctype: true
      }
    }),
    new WriteFilePlugin(),
    new CopyPlugin([{
      from: path.join(publicPath),
      to: path.join(serverPath, "build")
    }])
  ]
})
