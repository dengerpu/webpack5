const path = require('path')

module.exports = {
    mode: 'production',
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'mylib.js',
        // library: 'mylib'
        // library: {
        //     name: 'mylib',
        //     type: 'commonjs'
        // }
        library: {
            name: 'mylib',
            type: 'umd'
        },
        globalObject: 'globalThis'
    }
}