const HtmlWebpackPlugin = require('html-webpack-plugin')
const { ModuleFederationPlugin } = require('webpack').container

module.exports = {
    mode: 'production',
    entry: './src/index.js',
    plugins: [
        new HtmlWebpackPlugin(),
        new ModuleFederationPlugin({
            // 模块联邦名字
            name: 'home',
            // 外部访问的资源名字
            filename: 'remoteEntry.js',
            // 引用的外部资源
            remotes: {
                nav: 'nav@http://localhost:3003/remoteEntry.js'
            },
            // 暴露给外部的资源列表
            exposes: {
                './HomeList': './src/HomeList.js'
            },
            // 共享模块，如lodash
            shared: {}
        })
    ]

}