const path = require("path");
const webpack = require("webpack");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
  entry: {
    app: "./src/game/main.ts",
    vendors: ["phaser"],
  },

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
    extensions: [".ts", ".tsx", ".js"],
  },

  output: {
    filename: "app.bundle.js",
    path: path.resolve(__dirname, "dist"),
  },

  mode: "development",

  devServer: {
    contentBase: path.resolve(__dirname, "dist"),
    https: true,
  },

  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, "./src/index.html").replace(/\\/g, "/"),
          to: path.resolve(__dirname, "dist").replace(/\\/g, "/"),
        },
        {
          from: path
            .resolve(__dirname, "assets", "**", "*")
            .replace(/\\/g, "/"),
          to: path.resolve(__dirname, "dist").replace(/\\/g, "/"),
        },
      ],
    }),
  ],

  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: "vendors",
          chunks: "all",
        },
      },
    },
  },
};
