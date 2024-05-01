const path = require("path");

module.exports = {
  entry: { client: "./client/index.ts" },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  output: {
    filename: "[client].bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
};
