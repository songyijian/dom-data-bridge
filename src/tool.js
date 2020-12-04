import {isObj, isArray, isString} from './isfn' 
  
export const parseMuster= {
  String,
  Number,
  Boolean,
  Object:(a)=>{
    if(isObj(a))return a;
    if(isString(a)){
      let obj = JSON.parse(a)
      if(isObj(obj))return obj
    };
    throw Error('is not Object')
  },
  Array:(a)=>{
    if(isArray(a))return a;
    if(isString(a)){
      let array = JSON.parse(a)
      if(isArray(array)) return array
    }
    throw Error('is not Array')
  }
}