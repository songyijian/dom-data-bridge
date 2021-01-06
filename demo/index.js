
import {
  domDataDridge,
  DataDridge,
  superParse,
} from '../src/mian.js'



/**
 * 解析 json 格式的字符串 
 */
const pjson = new DataDridge({
  risk: false,
  filter(a){
    return typeof a ==='number' ? ++a : a
  }
})

pjson.push(`{at:"-1"}`) // 解析失败
pjson.push(`{a:"-1"}`,'', true) // 解析成功 {a:"-1"}

pjson.push('b','10')
pjson.push('c',{a:2})

let pdata = pjson.get({
  a:{
    filter(a) {
      return a < 0 ? 0 : a
    },
    type: Number,
    default:undefined
  }
})


console.log(pjson.dataMap);
console.log( pdata);
