const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
    entry: {
        index: './src/index.js'
    },
    output: {
        // 输出文件夹必须定义为绝对路径
        path: path.resolve(__dirname, './dist'),
        // 打包前清理 dist 文件夹
        clean: true,
        // 开发模式不需要配置缓存
        filename: 'scripts/[name].js'
    },
    devServer: {
        hot: true,
        liveReload: false, // 默认为true，即开启热更新功能。
        // static: {
        //  directory: path.join(__dirname, 'dist')
        // }, // 默认是把/dist目录当作web服务的根目录
        compress: true, // 可选择开启gzips压缩功能，对应静态资源请求的响应头里的Content-Encoding: gzip
        port: 3000,
        // headers: {
        //     'd-header-id': 'abcdefg'
        // }
        headers: () => { // headers配置也可以传递一个函数
            // return { 'X-Bar': ['key1=value1', 'key2=value2'] }
            return {
                'X-Random': Math.random(),
                'x-header-id': 'abcdefg',
                'X-Bar': ['key1=value1', 'key2=value2']
            }
        },
        proxy: {
            '/api': {
                target: 'http://localhost:9000',
                // pathRewrite: { '^/api': '' },
                secure: false
            }
        },
        // https: true
        // https: {
        //     cacert: './server.pem',
        //     pfx: './server.pfx',
        //     key: './server.key',
        //     cert: './server.crt',
        //     passphrase: 'webpack-dev-server',
        //     requestCert: true,
        // }
        http2: true,
        // historyApiFallback: true // 访问不存在的路径默认会跳到index.html
        historyApiFallback: {
            rewrites: [
                { from: /^\/$/, to: '/views/landing.html'},
                { from: /^\/some/, to: '/404.html' },
                { from: /./, to: '/views/404.html' }
            ]
        },
        // host: '0.0.0.0' // 局域网下共享服务
    },
    // 开发模式
    mode: 'development',
    devtool: 'cheap-module-source-map',
    plugins: [
        new HtmlWebpackPlugin({
            template: './index.html', // 打包生成的文件的模板
            filename: 'index.html', // 打包生成的文件名称。默认为index.html
            // 也就是<script src="bundle.js"></script>的位置
            inject: 'body', // true|'head'|'body'|false，默认值为 true
            chunks: ['index'] // 要引入的js文件
        }),
        new HtmlWebpackPlugin({
            template: './src/views/404.html', // 打包生成的文件的模板
            filename: '404.html', // 打包生成的文件名称。默认为index.html
            // 也就是<script src="bundle.js"></script>的位置
            inject: 'body', // true|'head'|'body'|false，默认值为 true
            chunks: ['']
        })
    ],
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.(js|jsx)$/,
                use: ['babel-loader', 'eslint-loader']
            }
        ]
    }
}