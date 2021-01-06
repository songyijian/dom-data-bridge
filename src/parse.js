/*
 * @Description: 支持高风险的json字符串解析
 * @Author: yijian.song
 * @Date: 2021-01-06 15:44:20
 * @LastEditors: yijian.song
 * @LastEditTime: 2021-01-06 20:11:56
 */
import {isJsonStr} from './isfn' ;

export default function superParse(strs,risk=false){
  if(isJsonStr(strs)){
    try {
      return JSON.parse(strs)
    } catch (error) {
      if(risk) {
        try {
          return eval(`(${strs})`)
        } catch (err) {
          console.error(`${strs} \n ${error} \n eval ${err}`)
        }
      } else{
        console.error(`${strs} \n ${error} `)
      }
    }
  }
}


// let a = `(function(){
//   alert('0000')
// }())`
// // let a = `{'a':222}`

// console.log(
//   superParse(a,true),
//   typeof superParse(a,true)
// );

// console.log(
//   superParse(11111),
//   superParse('2222')
// );

