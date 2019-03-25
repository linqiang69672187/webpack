var webpack = require('webpack');
var HtmlwebpackPlugin = require("html-webpack-plugin");
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var merge = require("webpack-merge");
var webpackBaseConfig =require("./webpack.config.js")
const VueLoaderPlugin = require('vue-loader/lib/plugin');
//清空基本配置的插件列表
webpackBaseConfig.plugins=[];

module.exports = merge(webpackBaseConfig,{

    output:{
        publicPath:'/dist/',
        //将入口文件重命名为带有20位的hash值的唯一文件
        filename:'[name].js',
        chunkFilename:'[name].chunk.js'
    },
    plugins:[
        new ExtractTextPlugin({
            //提取CSS，并重命名为带有20位的hash值的唯一文件
            filename:'[name].css',
            allChunks:true
        }),
        //定义当前NODE环境为生产环境
        new webpack.DefinePlugin({
            'process.env':{
                NODE_ENV:'"production"'
            }
        }),
        new HtmlwebpackPlugin({
            filename:'../index_prod.html',
            template:'./index.ejs',
            inject:false
        }),
        // make sure to include the plugin for the magic
        new VueLoaderPlugin()
    ]

})
