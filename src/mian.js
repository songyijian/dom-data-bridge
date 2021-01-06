'use strict';

import {isObj, isRegExp, isString, isType, isObjStr, isArrayStr, isJsonStr} from './isfn' ;
import {parseMuster} from './tool' ;
import superParse from './parse' ;

export default class DomDataDridge{
  constructor(data={}){
    this.dataMap = {};
    this.risk = !!data.risk;
    isRegExp(data.exclude) && (this.exclude = data.exclude)
  }

  push(wkey, val=''){
    try {
      if(isObj(wkey) || isType(wkey) === 'DOMStringMap'){
        Object.assign(this.dataMap, wkey)
      }
      else if(isObjStr(wkey)){
        Object.assign(this.dataMap, superParse(wkey, this.risk))
      }
      else if(isString(wkey) && val){
        Object.assign(this.dataMap, {[wkey]:val})
      }else{
        console.error(` [DomDataDridge] > push error : ${wkey} ${val ? val :''} `)
      }
    } catch (error) {
      console.error(` [DomDataDridge] > ${error} ignored`)
    }
  }

  _schemaParse(key, validate){
    let type = validate.type
    let _default = validate.default
    try{
      if(this.exclude && this.exclude.test(this.dataMap[key]))throw Error(`${this.dataMap[key]} by ${this.exclude} excluded`);
      if(isRegExp(type) && type.test(this.dataMap[key])) return this.dataMap[key];
      return type ? parseMuster[ type.name || String(type) ](this.dataMap[key]) : this.dataMap[key];
    }catch(err){
      if(_default) return _default
    }
  }

  get(schema, freeze=true) {
    if(!isObj(schema)) throw Error(`${this} schema is not a JSON`);
    let a = {}
    for (const key in schema) {
      if (schema.hasOwnProperty(key)) {
        const validate = schema[key];
        if(key in this.dataMap){
          if( isObj(validate) && ('type' in validate || 'default' in validate)){
            // let getVal = this.schemaParse(key, validate)
            // getVal!==undefined && (a[key] = getVal)
            // if(this.exclude && this.exclude.test(this.dataMap[key]))throw Error(`${this.dataMap[key]} by ${this.exclude} excluded`);
            let type = validate.type;
            try {
              if(this.exclude && this.exclude.test(this.dataMap[key])) return;
              if(isRegExp(type) && type.test(this.dataMap[key])) return this.dataMap[key];
              a[key] = type ? parseMuster[ type.name || String(type) ](this.dataMap[key]) : this.dataMap[key];
            } catch (error) {
              'default' in validate && (a[key] = validate.default)
            }
          }
        }else{
          'default' in validate && (a[key] = validate.default)
        }
      }
    }
    return freeze ? Object.freeze(a) : a
  }
}
