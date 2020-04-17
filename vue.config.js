"use strict";
const path = require("path");
const { title, abbreviation, devPort } = require("./src/settings");
const pkg = require("./package.json");
const webpack = require("webpack");
const CompressionWebpackPlugin = require("compression-webpack-plugin");
const productionGzipExtensions = [
  "js",
  "css",
  "sass",
  "svg",
  "png",
  "jpg",
  "jpeg",
  "ico",
  "bmp",
  "vue",
];
const WebpackBar = require("webpackbar");
const FileManagerPlugin = require("filemanager-webpack-plugin");

const date = new Date(),
  year = date.getFullYear(),
  month = date.getMonth() + 1,
  day = date.getDate(),
  hours = date.getHours(),
  minutes = date.getMinutes(),
  seconds = date.getSeconds(),
  time = `"${year}-${month}-${day} ${hours}:${minutes}:${seconds}"`;

function resolve(dir) {
  return path.join(__dirname, dir);
}

function mockServer() {
  if (process.env.NODE_ENV === "development") {
    const mockServer = require("./mock/mock-server.js");
    return mockServer;
  } else {
    return "";
  }
}

const name = title || "vue-element-admin-beautiful";

module.exports = {
  publicPath: "",
  assetsDir: "static",
  outputDir: "dist",
  lintOnSave: true,
  transpileDependencies: ["vue-echarts", "resize-detector"],
  devServer: {
    hot: true,
    compress: true,
    port: devPort,
    open: true,
    noInfo: true,
    overlay: {
      warnings: true,
      errors: true,
    },
    after: mockServer(),
  },
  configureWebpack(config) {
    return {
      name: name,
      resolve: {
        alias: {
          "@": resolve("src"),
          "^": resolve("src/components"),
        },
      },
      plugins: [
        new webpack.ProvidePlugin({
          $: "jquery",
          jQuery: "jquery",
          "windows.jQuery": "jquery",
          echarts: "echarts",
          "window.echarts": "echarts",
          maptalks: "maptalks",
          "window.maptalks": "maptalks",
        }),
        new webpack.DefinePlugin({
          "process.env.VUE_APP_UPDATE_TIME": time,
        }),
        new WebpackBar({
          name: `\u0062\u0079\u0075\u0069\u524d\u7aef\u654f\u6377\u5f00\u53d1\u5e73\u53f0${pkg.name}`,
        }),
      ],
    };
  },
  chainWebpack(config) {
    config.plugins.delete("preload");
    config.plugins.delete("prefetch");
    config.resolve.symlinks(true);
    config.module.rule("svg").exclude.add(resolve("src/icons")).end();
    config.module
      .rule("icons")
      .test(/\.svg$/)
      .include.add(resolve("src/icons"))
      .end()
      .use("svg-sprite-loader")
      .loader("svg-sprite-loader")
      .options({ symbolId: "icon-[name]" })
      .end();
    config.module
      .rule("vue")
      .use("vue-loader")
      .loader("vue-loader")
      .tap((options) => {
        options.compilerOptions.preserveWhitespace = true;
        return options;
      })
      .end();
    config.when(process.env.NODE_ENV === "development", (config) => {
      config.devtool("cheap-module-eval-source-map");
    });
    config.when(process.env.NODE_ENV !== "development", (config) => {
      config.performance.set("hints", false);
      config.devtool("cheap-module-source-map");
      config
        .plugin("ScriptExtHtmlWebpackPlugin")
        .after("html")
        .use("script-ext-html-webpack-plugin", [
          {
            inline: /runtime\..*\.js$/,
          },
        ])
        .end();
      config.optimization.splitChunks({
        chunks: "all",
        cacheGroups: {
          libs: {
            name: "chunk-libs",
            test: /[\\/]node_modules[\\/]/,
            priority: 10,
            chunks: "initial",
          },
          elementUI: {
            name: "chunk-elementUI",
            priority: 20,
            test: /[\\/]node_modules[\\/]_?element-ui(.*)/,
          },
          commons: {
            name: "chunk-commons",
            test: resolve("src/components"),
            minChunks: 3,
            priority: 5,
            reuseExistingChunk: true,
          },
        },
      });
      config.optimization.runtimeChunk("single");
      config.module
        .rule("images")
        .use("image-webpack-loader")
        .loader("image-webpack-loader")
        .options({ bypassOnDebug: true })
        .end();
      config
        .plugin("compression")
        .use(CompressionWebpackPlugin, [
          {
            filename: "[path].gz[query]",
            algorithm: "gzip",
            test: new RegExp(
              "\\.(" + productionGzipExtensions.join("|") + ")$"
            ),
            threshold: 8192,
            minRatio: 0.8,
          },
        ])
        .end();
      config
        .plugin("banner")
        .use(webpack.BannerPlugin, [
          `\u0062\u0079\u0075\u0069\u524d\u7aef\u654f\u6377\u5f00\u53d1\u5e73\u53f0 : ${pkg.name}\n copyright:\u0031\u0032\u0030\u0034\u0035\u0030\u0035\u0030\u0035\u0036\u0040\u0071\u0071\u002e\u0063\u006f\u006d \n author: ${pkg.author} \n participants: ${pkg.participants}\n time: ${time}`,
        ])
        .end();
      config
        .plugin("fileManager")
        .use(FileManagerPlugin, [
          {
            onEnd: {
              delete: ["./dist/video", "./dist/data"],
              archive: [
                {
                  source: "./dist",
                  destination: `./dist/${abbreviation}_dist_${year}.${month}.${day}.7z`,
                },
              ],
            },
          },
        ])
        .end();
    });
  },
  runtimeCompiler: true,
  productionSourceMap: false,
  css: {
    requireModuleExtension: true,
    sourceMap: true,
    loaderOptions: {
      scss: {
        prependData: '@import "~@/styles/variables.scss";',
      },
    },
  },
};
