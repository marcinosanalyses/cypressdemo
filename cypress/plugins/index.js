/* eslint-disable spaced-comment,@typescript-eslint/no-var-requires */
/// <reference types="cypress" />
/**
 * @type {Cypress.PluginConfig}
 */
const wp = require("cypress-webpack-preprocessor-v5");
module.exports = (on) => {
  const options = {
    webpackOptions: {
      resolve: {
        extensions: [".ts", ".tsx", ".js"],
      },
      module: {
        rules: [
          {
            test: /\.tsx?$/,
            loader: "ts-loader",
            options: { transpileOnly: true },
          },
        ],
      },
    },
  };
  on("file:preprocessor", wp(options));
};