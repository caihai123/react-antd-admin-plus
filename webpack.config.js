// const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './src/main.js',
    devServer: {
        port: 8080,
        open: false,// 是否自动打开浏览器
        hot: true,// 是否开启热更新
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
    ],
};