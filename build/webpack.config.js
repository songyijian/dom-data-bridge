import { webpack } from "webpack";
import { path } from "path";
const resolve = (...dir) => path.join(__dirname, ...dir};

module.exports = {
  entry: resolve('../project/index.js'),
  output:{
    libraryTarget:'es',
    index: resolve('./dist')
  }
}