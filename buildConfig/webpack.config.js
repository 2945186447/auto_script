/*
 * @Author: BATU1579
 * @CreateDate: 2022-05-24 16:55:58
 * @LastEditor: BATU1579
 * @LastTime: 2022-09-06 14:30:21
 * @FilePath: \\buildConfig\\webpack.config.js
 * @Description: 默认设置
 * 
 * https://blog.csdn.net/Zong_0915/article/details/115831373
 */
const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = {
    mode: "production",

    // 指定webpack打包的时候要使用的模块
    module: {
        // 指定要价在的规则
        rules: [
            {
                // test指定的是规则生效的文件,意思是，用ts-loader来处理以ts为结尾的文件
                test: /\.ts$/,
                exclude: /node_modules/,
                use: [
                    // 配置babel
                    {
                        // 指定加载器
                        loader: 'babel-loader',
                        // 设置babel
                        options: {
                            presets: ['@babel/preset-env']
                        }
                    },
                    'ts-loader'
                ]
            },
            {
                test: /\.(png|jpg|jpeg|gif)$/i,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            // 当图片大小小于 8KB 时，将图片转换为 Base64 编码
                            limit: 8 * 1024 * 1024,
                            // 超过 limit 大小的图片将使用 file-loader 处理
                            fallback: 'file-loader',
                            // 输出文件的名称和路径
                            name: 'images/[name].[hash:8].[ext]'
                        }
                    }
                ],
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin()
    ],
    resolve: {
        extensions: ['.ts', '.js'],
        alias: {
            // 将 @ 配置为指向 src 目录
            '@script_submodule': path.resolve(__dirname, "../script_submodule"),
            '@': path.resolve(__dirname, '../src'),
        }
    }
}