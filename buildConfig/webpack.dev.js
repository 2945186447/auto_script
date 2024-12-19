const { merge } = require("webpack-merge");
const path = require('path')
const defaultConfig = require("./webpack.config");
const entry = require("./entry");

module.exports = merge(defaultConfig, {
    // 压缩代码
    optimization: {
        minimize: false
    },
    // 指定入口文件
    entry,
    // 指定打包文件所在目录
    output: {
        path: path.resolve('dist'),
        // 打包后文件的名称
        filename: "[name].js"
    },
    watch: true, // 开启文件监听
    watchOptions: {
        ignored: /node_modules/, // 排除指定文件/目录
    },
})
