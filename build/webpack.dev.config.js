
const {webpack} = require("webpack")
const path = require("path")
const {merge} = require("webpack-merge")
const config = require("./webpack.config")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const resolve = (...dir) => path.join(__dirname, ...dir);

module.exports = merge(config,{
  entry: resolve('../demo/index.js'),

  mode:'development',
  devtool:'inline-source-map',
  watch:true,

  plugins: [
    new HtmlWebpackPlugin({
      template: resolve('../demo/index.html'),
      inject: false,
    })
  ],

  devServer:{
    open:true,
    port:"8765",
    inline:true,
    host:'localhost'
  }
})

