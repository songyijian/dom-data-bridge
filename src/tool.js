import {isObj, isArray, isString, isObjStr, isArrayStr} from './isfn' 
import superParse from './superParse';

  
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
      // let obj = JSON.parse(a)
      // if(isObj(obj))return obj
    };
    throw Error('is not Object')
  },
  Array: (a,risk)=>{
    if(isArray(a))return a;
    if(isString(a)&&isArrayStr(a)){
      return superParse(a,risk)
      // let array = JSON.parse(a)
      // if(isArray(array)) return array
    }
    throw Error('is not Array')
  }
}

