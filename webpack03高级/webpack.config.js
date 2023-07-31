const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const WorkboxPlugin = require('workbox-webpack-plugin');
module.exports = {
    entry: {
        // index: './src/index.js',
        // index2: './src/index2.ts'
        app: './src/app.js',
        main: {
            import: ['./src/index.js', './src/index2.ts'],
            dependOn: 'lodash',
            // 这个名字优先级高于output中的filename
            filename: 'script1/[name].js'
        },
        main2: {
            import: ['./src/index3.js', './src/index4.js'],
            dependOn: 'lodash',
            filename: 'script2/[name].js'
        },
        lodash: {
            import: 'lodash',
            filename: 'common/[name].js'
        },
        app2: './src/app2.js'
    },
    output: {
        // 输出文件夹必须定义为绝对路径
        path: path.resolve(__dirname, './dist'),
        // 打包前清理 dist 文件夹
        clean: true,
        // 开发模式不需要配置缓存
        filename: 'scripts/[name].js'
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'src')
        },
        extensions: ['.tsx', '.ts', '.js']
    },
    externalsType: 'script',
    externals: {
        // key值必须和包的名称（也就是  import $ from 'jquery'中的from后面的内容一致）
        // jquery: 'jQuery' // 这种方式需要在index.html中通过script引入jquery
        jquery: [
            'https://cdn.bootcdn.net/ajax/libs/jquery/3.6.4/jquery.js',
            '$'
        ]
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
        // http2: true,
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
    // mode: 'development',
    mode: 'production',
    // devtool: 'inline-source-map',
    plugins: [
        new HtmlWebpackPlugin({
            title: '自定义标题',
            template: './index.html', // 打包生成的文件的模板
            filename: 'index.html', // 打包生成的文件名称。默认为index.html
            // 也就是<script src="bundle.js"></script>的位置
            inject: 'body', // true|'head'|'body'|false，默认值为 true
            // chunks: ['main', 'main2', 'lodash'], // 要引入的js文件
            chunks: ['app2']
            // publicPath: 'http://www.a.com/'
        }),
        new HtmlWebpackPlugin({
            template: './src/views/404.html', // 打包生成的文件的模板
            filename: '404.html', // 打包生成的文件名称。默认为index.html
            // 也就是<script src="bundle.js"></script>的位置
            inject: 'body', // true|'head'|'body'|false，默认值为 true
            chunks: [''],
            // publicPath: 'http://www.b.com/'
        }),
        new BundleAnalyzerPlugin(),
        new WorkboxPlugin.GenerateSW({
            // 这些选项帮助快速启用 ServiceWorkers
            // 不允许遗留任何“旧的” ServiceWorkers
            clientsClaim: true,
            skipWaiting: true
        }),
        new webpack.ProvidePlugin({
            _: 'lodash'
        })
    ],
    module: {
        rules: [
            {
                test: /\.css$/,
                exclude: /node_modules/,
                // use: ['style-loader', 'css-loader']
                use: [
                    {
                        loader: 'style-loader'
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 1,
                            // 开启css模块
                            modules: true
                        }
                    },
                    {
                        loader: 'postcss-loader'
                    }
                ]
            },
            // {
            //     test: /\.(js|jsx)$/,
            //     use: ['babel-loader', 'eslint-loader']
            // },
            {
                test: /\.(ts|tsx)$/,
                use: 'ts-loader',
                exclude: /node_modules/
            },
            {
                test: require.resolve('./src/app2.js'),
                use: 'imports-loader?wrapper=window',
            },
            {
                test: require.resolve('./src/global.js'),
                use: 'exports-loader?type=commonjs&exports=file,multiple|helpers.parse|parse',
            }
        ]
    },
    optimization: {
        usedExports: true
    }
}