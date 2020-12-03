const {webpack} = require("webpack")
const path = require("path")
const resolve = (...dir) => path.join(__dirname, ...dir);

module.exports = {
  // entry: resolve('../src/mian.js'),
  output:{
    path: resolve('../dist'),
    filename: 'index.js', //打包之后生成的文件名，可以随意写。
    library: 'DomDataDridge', // 指定类库名,主要用于直接引用的方式(比如使用script 标签)
    libraryExport: "default", // 对外暴露default属性，就可以直接调用default里的属性
    globalObject: 'this', // 定义全局变量,兼容node和浏览器运行，避免出现"window is not defined"的情况
    libraryTarget: 'umd' // 定义打包方式Universal Module Definition,同时支持在CommonJS、AMD和全局变量使用
  },
  module:{
    rules: [{
      test: /\.js$/,
      include: [
        path.resolve(__dirname, 'src')
      ],
      exclude: /(node_modules|bower_components)/,
      loader: "babel-loader",
    }]
  }
}