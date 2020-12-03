
const {webpack} = require("webpack")
const path = require("path")
const {merge} = require("webpack-merge")
const config = require("./webpack.config")

const resolve = (...dir) => path.join(__dirname, ...dir);

module.exports = merge(config,{
  entry: resolve('../src/mian.js'),
  mode:'production'
})