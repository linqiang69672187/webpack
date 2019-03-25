var webpack = require('webpack');
var HtmlwebpackPlugin = require("html-webpack-plugin");
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var merge = require("webpack-merge");
var webpackBaseConfig =require("./webpack.config.js")

//清空基本配置的插件列表
webpackBaseConfig.plugins=[];

module.exports = merge(webpackBaseConfig,{

    output:{
        publicPath:'/dist/',
        //将入口文件重命名为带有20位的hash值的唯一文件
        filename:'[name].[hash].js'
    },
    plugins:[
        new ExtractTextPlugin({
            //提取CSS，并重命名为带有20位的hash值的唯一文件
            filename:'[name].[hash].css',
            allChunks:true
        }),
        //定义当前NODE环境为生产环境
        new webpack.DefinePlugin({
            'process.env':{
                NODE_ENV:'"production"'
            }
        }),
        //压缩JS
        new webpack.optimize.UglifyJsPlugin({
            compress:{
                warnings:false
            }
        }),
        //提取模板，并保存入口HTML文件
        new HtmlwebpackPlugin({
            filename:'../index_prod.html',
            template:'./index.ejs',
            inject:false
        })
    ]

})

var config={
    entry:{
        main:'./main'
    },
    output:{
        path:path.join(__dirname,'./dist'),
        publicPath:'/dist/',
        filename:'main.js'
    },
    module:{
        rules:[
        {
            test:/\.vue$/,
            loader:'vue-loader',
            options:{
                loaders:{
                    css:ExtractTextPlugin.extract({
                        use:'css-loader',
                        fallback:'vue-style-loader'
                    })
                }
            }
        },
        {
            test:/\.js$/,
            loaders:'babel-loader',
            exclude:/node_modules/
        },
        {
            test:/\.css$/,
            use:ExtractTextPlugin.extract({
                use:'css-loader',
                fallback:'style-loader'
            })
        },
        {
            test:/\.(gif|jpg|png|woff|svg|eot|ttf)\??.*$/,
            loader:'url-loader?limit=1024'
        }
    ]
    },
    plugins:[
        new ExtractTextPlugin("main.css"),
        new VueLoaderPlugin()
    ]
};
module.exports=config;