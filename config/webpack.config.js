var path = require('path');
const { merge } = require('webpack-merge')
var webpackCommon = require('./webpack.common')

module.exports = merge(
    webpackCommon,
    {
        mode: 'production'
    });