
const {webpack} = require("webpack")
const path = require("path")
const {merge} = require("webpack-merge")
const config = require("./webpack.config")

const resolve = (...dir) => path.join(__dirname, ...dir);

module.exports = merge(config,{
  mode:'development',
  devtool:'inline-source-map',
  watch:true,
  devServer:{
    open:true,
    port:"8765",
    inline:true,
    host:'localhost'
  }
})

