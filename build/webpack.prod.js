// webpack.prod.js
// production
const webpack = require('webpack');
const {merge} = require('webpack-merge');
const common = require('./webpack.base');
const env = require('../config/prod.env')

const path = require('path'),
    // 清除dist文件夹
    {CleanWebpackPlugin} = require('clean-webpack-plugin'),
    // 处理、打包css文件 功能类似style-loader
    MiniCssExtractPlugin = require('mini-css-extract-plugin'),
    // 用于压缩css文件
    OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin"),
    // 压缩js文件
    UglifyJsPlugin = require("uglifyjs-webpack-plugin");

module.exports = merge(common, {
    mode: 'production',
    output: {
        filename: 'js/[name].[hash:5].js',
        path: path.resolve(__dirname, '../manage')
    },
    optimization: {
        // 将引入的第三方库文件单独打包
        splitChunks: {
            // 所有引入的文件都打包
            chunks: 'all',
            cacheGroups: {
                vendor: {
                    name: 'vendor',
                    test: /[\\/]node_module[\\/]/,
                    priority: -10,
                    chunks: 'initial'
                }
            }
        }
    },
    module: {
        rules: [
            {
                test: /\.(sa|sc|c)ss$/,
                use: [
                    {
                        // 使用MiniCssExtractPlugin.loader替代style-loader
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            // 解决图片路径不对的问题
                            publicPath: '../'
                        }
                    },
                    'css-loader',
                    'postcss-loader',
                    'sass-loader'
                ]
            },
            {
                test: /\.(png|jpg|svg|gif)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            esModule: false,//不配置导致图片不显示
                            limit: 10240,
                            name: 'imgs/[name].[contenthash:5].[ext]'
                        }
                    },
                    // {
                    //     // 对图片进行压缩处理，配置项参考官方文档
                    //     loader: 'image-webpack-loader',
                    //     options: {
                    //         mozjpeg: {
                    //             progressive: true,
                    //             quality: 65
                    //         },
                    //         optipng: {
                    //             enabled: false
                    //         },
                    //         pngquant: {
                    //             quality: '65-90',
                    //             speed: 4
                    //         },
                    //         gifsicle: {
                    //             interlaced: false
                    //         },
                    //         webp: {
                    //             quality: 75
                    //         }
                    //     }
                    // }
                ]
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': env
        }),
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: 'css/[name].[hash:5].css'
        }),
        new OptimizeCSSAssetsPlugin(),
        new UglifyJsPlugin({
            uglifyOptions: {
                compress: {
                    // 去除debugger和console
                    drop_debugger: true,
                    drop_console: true
                }
            },
            cache: true,
            parallel: true,
            sourceMap: false
        })
    ]
});
