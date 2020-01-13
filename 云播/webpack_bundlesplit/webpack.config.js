const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
module.exports = {
    mode: 'development',
    entry: path.resolve(__dirname, 'src/index.js'),
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].[contenthash].js'
    },
    optimization: {
        runtimeChunk: 'single',
        splitChunks: {
            chunks: 'all', // 默认 async 可选值 all 和 initial
            maxInitialRequests: Infinity, // 一个入口最大的并行请求数
            minChunks: 1, // 默认也是一表示最小引用次数
            cacheGroups: {
                vendor: {
                    test: /[\\/]node_modules[\\/]/, // 如果需要的依赖特别小，可以直接设置成需要打包的依赖名
                    name: 'chunk-libs'
                }
            }
        }
    },
    plugins:[
    	new CleanWebpackPlugin(['dist']),
      new HtmlWebpackPlugin({
        title: 'Output Management'
      })
    ]
}