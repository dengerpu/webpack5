const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'bundle.js',
        // 输出文件夹必须定义为绝对路径
        path: path.resolve(__dirname, './dist')
    },
    plugins: [
        // 实例化 html-webpack-plugin 插件
        new HtmlWebpackPlugin()
    ],
    mode: 'none'
}