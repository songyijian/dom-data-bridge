import {isObj, isArray, isString, isObjStr, isArrayStr ,isJsonStr} from './isfn' 

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
export function superParse(strs,risk=false){
  if(isJsonStr(strs)){
    try {
      return JSON.parse(strs)
    } catch (error) {
      if(risk) {
        try {
          return eval(`(${strs})`)
        } catch (err) {
          throw Error(`${strs} \n ${error} \n eval ${err}`)
        }
      } 
      throw Error(`${strs} \n ${error} `)
    }
  }
}

  
export const parseMuster= {
  String,
  Number: a=>{
    var n = Number(a);
    if(!isNaN(n)) return n;
    throw Error('is not Number')
  },
  Boolean,
  Object: (a,risk)=>{
    if(isObj(a))return a;
    if(isString(a) && isObjStr(a)){
      return superParse(a,risk)
    };
    throw Error('is not Object')
  },
  Array: (a,risk)=>{
    if(isArray(a))return a;
    a = a.trim()
    console.log(a, isArrayStr(a));

    if(isString(a) && isArrayStr(a)){
      return superParse(a,risk)
    }
    throw Error('is not Array')
  }
}

