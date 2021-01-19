var path = require('path');
const webpack = require("webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
var HtmlWebpackPlugin = require('html-webpack-plugin');

const devMode = process.env.NODE_ENV !== 'production'

module.exports = {
    entry: {
        'index': './src/pages/index/js/index.js',
        'list': './src/pages/list/js/index.js',
        'detail': './src/pages/detail/js/index.js'
    },
    output: {
        path: path.resolve(__dirname, 'dist')
    },
    resolve: {
        extensions: [
            '.js',
            '.css',
            '.html'
        ],
        alias: {
        }
    },
    module: {
        rules: [
            {
                test: /\.js|\.jsx$/,
                include: path.resolve(__dirname, 'src/'),
                loader: "babel-loader"
            },
            {
                test: /\.css$/,
                include: path.resolve(__dirname, 'src/'),
                use: [
                    {
                        loader: devMode ? 'style-loader' : MiniCssExtractPlugin.loader
                    },
                    //'cache-loader',
                    {
                        loader: 'css-loader'
                    }, {
                        loader: 'postcss-loader'
                    }
                ]
            },
            {
                test: /\.(png|jpg|gif|svg)$/i,
                include: path.resolve(__dirname, 'src/'),
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
        new HtmlWebpackPlugin({
            title: 'test',
            filename: 'index.html',
            template: path.resolve(__dirname, 'src/pages/index/index.html'),
            chunks: ['common', 'index'],
            minify: true
        }),
        new HtmlWebpackPlugin({
            title: 'test',
            filename: 'list.html',
            template: path.resolve(__dirname, 'src/pages/list/index.html'),
            chunks: ['common', 'list'],
            minify: {
                inject: true,
                removeAttributeQuotes: true,
                collapseWhitespace: true,
                html5: true,
                minifyCSS: true,
                minifyJS: true,
                removeComments: true,
                removeEmptyAttributes: true
            }
        }),
        new HtmlWebpackPlugin({
            title: 'test',
            filename: 'detail.html',
            template: path.resolve(__dirname, 'src/pages/detail/index.html'),
            chunks: ['common', 'detail'],
            minify: {
                inject: true,
                removeAttributeQuotes: true,
                collapseWhitespace: true,
                html5: true,
                minifyCSS: true,
                minifyJS: true,
                removeComments: true,
                removeEmptyAttributes: true
            }
        })
    ]
};