const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const svgToMiniDataURI = require('mini-svg-data-uri')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')

module.exports = {
    entry: './src/index.js',
    performance: { hints: false },
    output: {
        filename: 'bundle.js',
        // 输出文件夹必须定义为绝对路径
        path: path.resolve(__dirname, './dist'),
        // 打包前清理 dist 文件夹
        clean: true,
        assetModuleFilename: 'images/[contenthash][ext][query]'
    },
    // dev-server
    devServer: {
        static: './dist'
    },
    plugins: [
        // 实例化 html-webpack-plugin 插件
        new HtmlWebpackPlugin({
            template: './index.html', // 打包生成的文件的模板
            filename: 'app.html', // 打包生成的文件名称。默认为index.html
            // 也就是<script src="bundle.js"></script>的位置
            inject: 'body' // true|'head'|'body'|false，默认值为 true
        }),
        new MiniCssExtractPlugin({
            filename: 'styles/[contenthash].css'
        })
    ],
    // 开发模式
    mode: 'production',
    // 在开发模式下追踪代码
    devtool: 'inline-source-map',
    // 配置资源文件
    module: {
        rules: [
            {
                test: /\.png/,
                type: 'asset/resource',
                // 优先级高于 assetModuleFilename
                generator: {
                    filename: 'images/[contenthash][ext][query]'
                }
            },
            {
                test: /\.svg/,
                type: 'asset/inline',
                generator: {
                    dataUrl: content => {
                        content = content.toString();
                        return svgToMiniDataURI(content);
                    }
                }
            },
            {
                test: /\.txt/,
                type: 'asset/source',
            },
            {
                test: /\.jpg/,
                type: 'asset',
                parser: {
                    dataUrlCondition: {
                        // 设置4kb以内使用asset/inline,大于4Kb使用asset/resource
                        maxSize: 4 * 1024 // 4kb
                    }
                }
            },
            {
                test: /\.css$/i,
                use: [MiniCssExtractPlugin.loader, 'css-loader']
            },
            {
                test: /\.less$/i,
                use: ['style-loader', 'css-loader', 'less-loader']
            }
        ]
    },
    // 优化配置
    optimization: {
        minimizer: [
            new CssMinimizerPlugin()
        ]
    }
}