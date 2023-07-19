const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const svgToMiniDataURI = require('mini-svg-data-uri')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const toml = require('toml');
const yaml = require('yamljs');
const json5 = require('json5');

module.exports = (env) => {
    return {
        // entry: './src/index.js',
        // 代码分离方式一：入口起点
        // entry: {
        //     index: './src/index.js',
        //     another: './src/another-module.js'
        // },
    
        //代码分离方式二：防止重复
        // entry: {
        //     index: {
        //         import: './src/index.js',
        //         dependOn: 'shared'
        //     },
        //     another: {
        //         import: './src/another-module.js',
        //         dependOn: 'shared'
        //     },
        //     shared: 'lodash'
        // },
        //代码分离方式二：借助插件 SplitChunksPlugin
        entry: {
            index: './src/index.js',
            another: './src/another-module.js'
        },
        performance: { hints: false },
        output: {
            // filename: 'bundle.js',
            // filename: '[name].bundle.js',
            // 内容改变就换文件名，防止被缓存
            filename: 'scripts/[name].[contenthash].js',
            // 输出文件夹必须定义为绝对路径
            path: path.resolve(__dirname, './dist'),
            // 打包前清理 dist 文件夹
            clean: true,
            assetModuleFilename: 'images/[contenthash][ext][query]',
            // 公共路径
            publicPath: 'http://localhost:8080/'
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
        // mode: 'production',
        // 根据命令行参数 env 来设置不同环境的 mode
        mode: env.production ? 'production' : 'development',
        
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
                },
                {
                    test: /\.(woff|woff2|eot|ttf|otf)$/i,
                    type: 'asset/resource'
                },
                {
                    test: /\.(csv|tsv)$/i,
                    use: ['csv-loader']
                },
                {
                    test: /\.xml$/i,
                    use: ['xml-loader']
                },
                {
                    test: /\.toml$/i,
                    type: 'json',
                    parser: {
                        parse: toml.parse
                    },
                },
                {
                    test: /\.yaml$/i,
                    type: 'json',
                    parser: {
                        parse: yaml.parse,
                    },
                },
                {
                    test: /\.json5$/i,
                    type: 'json',
                    parser: {
                        parse: json5.parse,
                    },
                },
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/preset-env']
                        }
                    }
                }
            ]
        },
        // 优化配置
        optimization: {
            minimizer: [
                new CssMinimizerPlugin()
            ],
            // 代码分离，抽取公共代码
            splitChunks: {
                // 缓存第三方库
                cacheGroups: {
                    vendor: {
                        test: /[\\/]node_modules[\\/]/,
                        name: 'vendors',
                        chunks: 'all'
                    }
                }
                
            }
        }
    }
}