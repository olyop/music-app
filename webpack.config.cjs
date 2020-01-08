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

module.exports = ({ mode }) => {
  const isProduction = mode === "production"
  return {
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
          loader: [
            MiniCssExtractPlugin.loader,
            "css-loader"
          ]
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
      isProduction ? new BundleAnalyzerPlugin({ analyzerMode: "static" }) : noop,
      isProduction ? new CompressionPlugin() : noop,
      isProduction ? new ProgressPlugin() : noop,
      isProduction ? new LodashModuleReplacementPlugin() : noop,
      isProduction ? new MinifyPlugin({}, { comments: false }) : noop,
      isProduction ? new OptimizeCssAssetsPlugin() : noop,
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
  }
}
