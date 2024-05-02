const path = require("path");
// const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");

module.exports = {
  devtool: "inline-source-map",
  entry: { client: "./client/index.ts", server: "./server/index.ts" },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        include: path.resolve(__dirname, "client"),
        loader: "ts-loader",
        exclude: /node_modules/,
        options: {
          instance: "client",
        },
      },
      {
        test: /\.tsx?$/,
        include: path.resolve(__dirname, "server"),
        loader: "ts-loader",
        exclude: /node_modules/,
        options: {
          instance: "server",
        },
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
    // plugins: [new TsconfigPathsPlugin({ configFile: "./" })],
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].bundle.js",
  },
};
