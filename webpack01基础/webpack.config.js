const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'bundle.js',
        // 输出文件夹必须定义为绝对路径
        path: path.resolve(__dirname, './dist'),
        // 打包前清理 dist 文件夹
        clean: true

    },
    plugins: [
        // 实例化 html-webpack-plugin 插件
        new HtmlWebpackPlugin({
            template: './index.html', // 打包生成的文件的模板
            filename: 'app.html', // 打包生成的文件名称。默认为index.html
            // 也就是<script src="bundle.js"></script>的位置
            inject: 'body' // true|'head'|'body'|false，默认值为 true
        })
    ],
    // 开发模式
    mode: 'development',
    // 在开发模式下追踪代码
    devtool: 'inline-source-map'
}