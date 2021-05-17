const path = require('path');
const webpack = require("webpack");
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const { setEntry, setHtmlPlugin } = require('./webpack.util')
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const devMode = process.env.NODE_ENV !== 'production'


module.exports = {
    entry: setEntry,
    output: {
        path: path.resolve(__dirname, '../dist')
    },
    resolve: {
        extensions: [
            '.tsx',
            '.ts',
            '.js',
            '.css',
            '.html'
        ],
        alias: {
        },
        plugins: [
            new TsconfigPathsPlugin()
        ]
    },
    module: {
        rules: [
            {
                test: /\.js|\.ts|\.tsx$/,
                include: path.resolve(__dirname, '../src/'),
                loader: "babel-loader"
            },
            {
                test: /\.css$/,
                include: path.resolve(__dirname, '../src/'),
                use: [
                    {
                        loader: devMode ? 'style-loader' : MiniCssExtractPlugin.loader
                    },
                    //'cache-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true
                        }
                    }, {
                        loader: 'postcss-loader'
                    }
                ]
            },
            {
                test: /\.(png|jpg|gif|svg)$/i,
                include: path.resolve(__dirname, '../src/'),
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 2000,
                            name: 'static/img/[name]-[hash:5].[ext]'
                        }
                    },
                    //'cache-loader',
                    {
                        loader: 'image-webpack-loader',
                        options: {
                            bypassOnDebug: true,
                            mozjpeg: {
                                progressive: true,
                            },
                            gifsicle: {
                                interlaced: true,
                            },
                            optipng: {
                                optimizationLevel: 7
                            }
                        }
                    }
                ]
            }
        ]
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                commons: {
                    name: 'common',    //提取出来的文件命名
                    chunks: 'all',  //initial表示提取入口文件的公共部分
                    minChunks: 2,       //表示提取公共部分最少的文件数
                    minSize: 0          //表示提取公共部分最小的大小
                }
            }
        }
    },
    plugins: [
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery',
            'window.$': 'jquery',
        }),        
        ...setHtmlPlugin(),        
    ]
};