const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
module.exports = {
    performance: { hints: false },
    output: {
        // 生产环境需要缓存
        filename: 'scripts/[name].[contenthash].js',
        // 公共路径
        publicPath: 'http://localhost:8080/'
    },
    // 生产模式
    mode: 'production',
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