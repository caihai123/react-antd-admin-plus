const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");
const child_process = require("child_process");
const ESLintPlugin = require("eslint-webpack-plugin");

module.exports = (_, argv) => {
  const { mode } = argv;

  process.env.NODE_ENV = mode; // .eslintrc.js中需要访问

  // 环境变量
  const env = {
    NODE_ENV: JSON.stringify(mode),

    // app TITLE
    REACT_APP_WEBSITE_NAME: JSON.stringify("React Or Antd"),

    // commitHash
    REACT_APP_Commit_Hash: JSON.stringify(
      child_process.execSync("git show -s --format=%H").toString().trim()
    ),

    // 是否开启 mockapi
    REACT_APP_MOCK: true,

    // 打包时间（启动时间）
    REACT_APP_Build_Date: JSON.stringify(
      (() => {
        const nowDate = new Date();
        return `${`${nowDate.getFullYear()}-${
          nowDate.getMonth() + 1
        }-${nowDate.getDate()} ${nowDate.getHours()}:${nowDate.getMinutes()}:${nowDate.getSeconds()}`}`;
      })()
    ),
  };

  const devServer = {
    historyApiFallback: true,
    port: 8080,
    open: false, // 是否自动打开浏览器
    hot: true, // 是否开启热更新
    proxy: {
      "/api": {
        target: "https://test-portal.gshbzw.com",
        ws: true,
        changeOrigin: true,
        // pathRewrite: {
        //   "^/api": "",
        // },
      },
    },
  };

  return {
    mode,
    entry: "./src/index.js",
    devServer,
    output: {
      publicPath: "/",
      filename: "[name].[hash:8].js",
      path: path.resolve(__dirname, "dist"),
      clean: true, // 清除dist文件
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          loader: "babel-loader",
        },
        {
          test: /\.css$/i,
          use: ["style-loader", "css-loader"],
        },
        {
          test: /\.(png|jpg|gif|svg)$/,
          use: [
            {
              loader: "url-loader",
              options: {
                limit: 8192, // 8kb以下转base64
                name: "images/[name].[hash:8].[ext]", // 文件名格式
              },
            },
          ],
        },
      ],
    },
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "src"),
      },
      extensions: [".js", ".jsx", ".css"],
    },
    plugins: [
      // 设置环境变量
      new webpack.DefinePlugin({
        "process.env": env,
      }),
      new HtmlWebpackPlugin({ template: "./public/index.html" }),
      new ESLintPlugin(),
    ],
  };
};
