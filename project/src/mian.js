'use strict';

import {isObj, isRegExp, isString, isType} from './isfn' 
import {parseMuster} from './tool' 

export default class DomDataDridge{
  constructor(data={}){
    this.dataMap = {}
    isRegExp(data.exclude) && (this.exclude = data.exclude)
  }

  push(macro){
    if(isObj(macro) || isType(macro) === 'DOMStringMap'){
      Object.assign(this.dataMap, macro)
    }
    if(isString(macro)){
      try {
        Object.assign(this.dataMap, JSON.parse(macro.trim()))
      } catch (error) {
        console.error(error, macro)
      }
    }
  }

  schemaParse(key, validate){
    let type = validate.type
    let _default = validate.default
    try{
      if(this.exclude)if(this.exclude.test(this.dataMap[key])) throw new Error(`${this.dataMap[key]} by exclude excluded`);
      if(isRegExp(type)) if(type.test(this.dataMap[key])) return this.dataMap[key];
      return type ? parseMuster[ type.name || String(type) ](this.dataMap[key]) : this.dataMap[key];
    }catch(err){
      // console.error(err)
      if(_default) return _default
    }
  }

  get(schema){
    if(!isObj(schema)) throw Error(`${this} schema is not a JSON`);
    let a = {}
    for (const key in schema) {
      if (schema.hasOwnProperty(key)) {
        const validate = schema[key];
        if(key in this.dataMap){
          if( isObj(validate) && ('type' in validate || 'default' in validate)) a[key] = this.schemaParse(key, validate);
        }else{
          'default' in validate && (a[key] = validate['default'])
        }
      }
    }
    return Object.freeze(a)
  }
}
