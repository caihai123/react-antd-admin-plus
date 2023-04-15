const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackBar = require("webpackbar");

module.exports = {
    entry: './src/main.js',
    stats: "none",
    devServer: {
        port: 8080,
        open: false,// 是否自动打开浏览器
        hot: true,// 是否开启热更新
        client: {
            progress: true,
        },
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist'),
        clean: true,// 清除dist文件
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                loader: "babel-loader",
            },
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({ template: './public/index.html' }),
        new WebpackBar(),
    ]
};