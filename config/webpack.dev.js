var path = require('path');
const { merge } = require('webpack-merge')
var webpackCommon = require('./webpack.common')

module.exports = merge(
    webpackCommon,
    {
        mode: 'development',
        output: {
            filename: 'static/js/[name].[hash].js'
        },
        devServer: {
            host: "0.0.0.0",
            contentBase: path.join(__dirname, 'dist'),
            compress: true,
            port: process.env.port || 9000,
            watchContentBase: true,
            hot: true,
            inline: true,
            compress: true,
            open: true, //是否自动打开浏览器
            clientLogLevel: 'error',
            //noInfo: true,
            // https: {
            //     key: fs.readFileSync(path.resolve(__dirname, `ssl/privkey.pem`)),
            //     cert: fs.readFileSync(path.resolve(__dirname, `ssl/server.pem`))
            // },
            disableHostCheck: true,
            // historyApiFallback: {
            //     disableDotRule: true
            // },
            //noInfo:true,
            proxy: {
                '/x/xx*': {
                    target: 'https://x.x.x.com',
                    changeOrigin: true,
                    secure: false
                }
            }
        }
    });