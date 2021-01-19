const fs = require('fs');
var path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { merge } = require('webpack-merge')
var webpackCommon = require('./webpack.common')
var MiniCssExtractPlugin = require("mini-css-extract-plugin");



module.exports = merge(
    webpackCommon,
    {
        mode: 'production',
        output: {
            filename: 'static/js/[name].[contenthash].js'
        },
        plugins: [
            new CleanWebpackPlugin(),
            new MiniCssExtractPlugin({
                filename: "static/css/[name].[contenthash].css",
                chunkFilename: "static/css/[id].[contenthash].css"
            })
        ]
    });