/*
 * @Description: 支持高风险的json字符串解析
 * @Author: yijian.song
 * @Date: 2021-01-06 15:44:20
 * @LastEditors: yijian.song
 * @LastEditTime: 2021-01-07 00:31:43
 */
import {isJsonStr} from './isfn' ;

/**
 * @Description: 支持高风险的json字符串解析
 * @Version: 1.0.0
 * @param {string} strs 要解析的'{字符串}'对象, 不可‘[]’
 * @param {boolean} risk 利用eval可以解析一些不规范的{json}
 * @return {object} '{a:1}' 
 * @Author: yijian.song
 * @LastEditors: yijian.song
 * @Date: 2021-01-07 00:24:48
 */
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

