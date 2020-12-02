/*
 * @Description: 获取 <meta macro>
 * @Author: yijian.song
 * @Date: 2020-11-20 15:15:08
 * @LastEditors: yijian.song
 * @LastEditTime: 2020-12-02 16:17:17
 */

import {isObj, isArray} from './isfn'

const strTypeConversion= {
  String,
  Number,
  Boolean,
  Object:(a)=>{
    let obj = JSON.parse(a)
    if(isObj(obj))return obj;
    throw Error('is not Object')
  },
  Array:(a)=>{
    let array = JSON.parse(a)
    if(isArray(array)) return array
    throw Error('is not Array')
  }
}
let postMap = {}

/**
 * <meta macro data-x> 取值
 */
// function init(){
//   let metas = document.querySelectorAll('meta[macro]')
//   Array.from(metas).forEach(tag=>{
//     console.log( tag.dataset)
//     Object.assign(postMap, tag.dataset)
//   })
//   Object.freeze(postMap)
//   console.log(10000)
// }
// init()




/**
 * 根据验证规则取值
 * @param {string} key 取值的建
 * @param {object} validate 验证体 
 */
function minSchema(key, validate){
  let type = validate.type
  let _default = validate.default
  try{
    return type ? strTypeConversion[ type.name || String(type) ](postMap[key]) : postMap[key]
  }catch(err){
    if(_default) return _default
  }
}


/**
 * postMap验证取值函数
 * @param {objct} schema 
 */
export default function getMetaData(schema){
  if(!isObj(schema)) throw Error('[getMetaData]> schema is not a JSON');
  let a = {}
  for (const key in schema) {
    if (schema.hasOwnProperty(key)) {
      const validate = schema[key];
      if(key in postMap){
        if( isObj(validate) && ('type' in validate || 'default' in validate)) a[key] = minSchema(key, validate);
      }else{
        'default' in validate && (a[key] = validate['default'])
      }
    }
  }
  return Object.freeze(a)
}


export function dridge(){


}

export function use(){

  
}




console.log('%c metaData init ','background:#046fe0; padding: 1px; border-radius: 3px 3px 3px 3px;  color: #fff')
