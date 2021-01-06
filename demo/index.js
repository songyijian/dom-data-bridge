
import DomDataDridge from '../src/mian.js'



/**
 * 解析 json 格式的字符串 
 */
const pjson = new DomDataDridge({risk:true})

pjson.push(`{a:'2.3dfgg'}`)
pjson.push('nu',{a:2})


let pdata = pjson.get({
  a:{
    type: Number,
    default:false
  }
})


console.log(pjson,pdata);