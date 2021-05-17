const fs = require('fs');
var path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { merge } = require('webpack-merge')
const TerserPlugin = require('terser-webpack-plugin');
const WebpackCDNPlugin = require('webpack4-cdn-plugin')
const QCdn = require('@q/qcdn')
var webpackCommon = require('./webpack.common')
//var MiniCssExtractPlugin = require("mini-css-extract-plugin");



module.exports = merge(
    webpackCommon, {
        mode: 'production',
        output: {
            filename: 'static/js/[name].[contenthash].js',
            publicPath: ''
        },
        plugins: [
            new CleanWebpackPlugin(),
            new WebpackCDNPlugin({
                // whether to keep generated files (on local fs), default: `false`
                keepLocalFiles: false,
                // whether to keep generated sourcemaps, default: `false`
                keepSourcemaps: false,
                // whether to backup html files (before replaced), default: `false`
                backupHTMLFiles: false,
                // manifest file name (`String | false`)
                manifestFilename: 'manifest.json',
            
                // a function, which returns `Promise<url>`
                // you can do your compressing works with content
                // `params.content`: `String | Buffer`
                // `params.extname`: file extension
                // `params.file`: original file (with path)
                uploadContent: async ({ content, extname, file })=>{
                    /**
                     * Return falsy value means that you want to KEPP the
                     * file as it is. This usually happens with certain
                     * file types, which may not be supported by your CDN
                     * provider, or must be under the same origin with your
                     * HTML files(for example, files like `.wasm` that
                     * should be loaded by `fetch` or `XMLHttpRequest`).
                     *
                     * !!! Note !!!
                     * Be CAREFUL with media resources (especially images).
                     * When you are using an image in your CSS file, while
                     * deciding not to upload that it(the image), it CAN lead
                     * to an unexpected `404 (Not Found)` ERROR.
                     */
                    if (['ico', 'txt', 'wasm'].includes(extname)) {
                        return false
                    }
            
                    const cdnFile = await QCdn.content(content, extname, {
                        https: true,
                        static: {
                            domains: [
                                's0.ssl.qhimg.com',
                                's1.ssl.qhimg.com',
                                's2.ssl.qhimg.com',
                                's3.ssl.qhimg.com',
                                's4.ssl.qhimg.com'
                            ]
                        }
                    });

                    return cdnFile
                }
            })
        ],
        optimization: {
            minimizer: [
                new TerserPlugin({
                    extractComments: false,
                })
            ],
        },
    });