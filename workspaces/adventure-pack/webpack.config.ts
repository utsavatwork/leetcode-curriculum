import { execSync } from "node:child_process";
import path from "node:path";

import { DefinePlugin, type Configuration } from "webpack";
import ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin";

import { WEB_APP_DIST } from "./src/scripts/build/constants.ts";
import { WriteIndexHtmlWebpackPlugin } from "./src/scripts/build/WriteIndexHtmlWebpackPlugin.tsx";

const commitHash = execSync("git rev-parse HEAD").toString().trim();

const config: Configuration = {
  target: "web",
  // TODO: for Chrome extension we will need devtool: "cheap-source-map" since we can't eval.
  entry: "./src/app/main.tsx",
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, WEB_APP_DIST),
  },

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: "ts-loader",
            options: {
              transpileOnly: true,
            },
          },
        ],
        exclude: /\bnode_modules\b/,
      },
    ],
  },

  resolve: {
    conditionNames: ["import"],
  },

  plugins: [
    new DefinePlugin({
      ADVENTURE_PACK_COMMIT_HASH: JSON.stringify(commitHash),
    }),

    new WriteIndexHtmlWebpackPlugin(commitHash),

    new ForkTsCheckerWebpackPlugin(),
  ],

  optimization: {
    splitChunks: {
      cacheGroups: {
        dependencies: {
          test: /\bnode_modules\b/,
          name: "dependencies",
          chunks: "all",
        },
      },
    },
  },
};

export default config;
