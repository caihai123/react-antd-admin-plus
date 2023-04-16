const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackBar = require("webpackbar");
const webpack = require("webpack");

module.exports = (env) => {
    return {
        entry: './src/index.js',
        stats: "none",
        devServer: {
            historyApiFallback: true,
            port: 8080,
            open: false,// 是否自动打开浏览器
            hot: true,// 是否开启热更新
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
        },
        output: {
            publicPath:"/",
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
                {
                    test: /\.css$/i,
                    use: ["style-loader", "css-loader"],
                },
                {
                    test: /\.(png|jpg|gif|svg)$/,
                    use: [
                        {
                            loader: 'url-loader',
                            options: {
                                limit: 8192, // 8kb以下转base64
                                name: 'images/[name].[hash:8].[ext]' // 文件名格式
                            }
                        }
                    ]
                }
            ]
        },
        resolve: {
            alias: {
                "@": path.resolve(__dirname, "src"),
            },
            extensions: ['.js', '.jsx', '.css'],
        },
        plugins: [
            new webpack.DefinePlugin({
                'process.env': {
                    REACT_APP_MOCK: true,
                    // NODE_ENV: "development"
                }
            }),
            new HtmlWebpackPlugin({ template: './public/index.html' }),
            new WebpackBar(),
        ]
    }
};