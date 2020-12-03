import {isObj, isArray /*, isRegExp,isString,isNumber,isBoolean*/} from './isfn' 


export const parseMuster= {
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

// export const typeMuster = {
//   String:isString,
//   Number:isNumber,
//   Boolean:isBoolean,
//   Object:isObj,
//   Array:isArray
//   // RegExp,
// }

