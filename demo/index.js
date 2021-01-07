
import {
  DataDridge,
  parseMuster,
  superParse,
  domDataDridge,
} from '../src/mian.js'


console.log(DataDridge);
alert(1)
console.log(
  1111
  // superParse('{a:1}'), // Error
  // superParse('{"a":1}'), // {a:1}
//   superParse('{a:1}',true), // {a:1}

//   // Array '[]'
//   superParse('{a:1}',true), // Error
//   superParse('[{a:1},2]'), // Error
//   superParse('[{a:1},2]',true), // [{…}, 2]
);


// /**
//  * 解析 json 格式的字符串 
//  */
// const pjson = new DataDridge({
//   risk: false,
//   filter(a){
//     return typeof a ==='number' ? ++a : a
//   }
// })

// // pjson.push(`{at:"-1"}`) // 解析失败
// pjson.push(`{a:"-1"}`,'', true) // 解析成功 {a:"-1"}

// pjson.push('b','10')
// pjson.push('c',{a:2})

// let pdata = pjson.get({
//   a:{
//     filter(a) {
//       return a < 0 ? 0 : a
//     },
//     type: Number,
//     default:undefined
//   }
// })


// console.log(pjson.dataMap);
// console.log( pdata);
