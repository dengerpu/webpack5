module.exports = {
    output: {
        // 打包前清理 dist 文件夹
        clean: true,
        // 开发模式不需要配置缓存
        filename: 'scripts/[name].js',
    },
    // dev-server
    devServer: {
        static: './dist'
    },
    // 开发模式
    mode: 'development',
    // 在开发模式下追踪代码
    devtool: 'inline-source-map',
}