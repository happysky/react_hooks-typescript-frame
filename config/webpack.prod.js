const fs = require('fs');
var path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { merge } = require('webpack-merge')
const TerserPlugin = require('terser-webpack-plugin');
var webpackCommon = require('./webpack.common')
//var MiniCssExtractPlugin = require("mini-css-extract-plugin");



module.exports = merge(
    webpackCommon, {
        mode: 'production',
        output: {
            filename: 'static/js/[name].[contenthash].js'
        },
        plugins: [
            new CleanWebpackPlugin(),
        ],
        optimization: {
            minimizer: [
                new TerserPlugin({
                    extractComments: false,
                })
            ],
        },
    });