'use strict';

import {isObj, isRegExp, isString, isFunction, isType, isObjStr, isBoolean} from './isfn' ;
import {parseMuster} from './tool' ;
import superParse from './superParse';

class DataDridge{
  constructor(config={}){
    this.dataMap = {};
    this.config = {
      risk: isBoolean(config.risk) ? config.risk : false,
      filter: isFunction(config.filter) ? config.filter : a => a
    }
  }

  push(wkey, val = '', risk = this.config.risk) {
    try {
      if(isObj(wkey) || isType(wkey) === 'DOMStringMap'){
        Object.assign(this.dataMap, wkey)
      }
      else if(isObjStr(wkey)){
        Object.assign(this.dataMap, superParse(wkey, risk))
      }
      else if(isString(wkey) && val){
        Object.assign(this.dataMap, {[wkey]:val})
      }else{
        console.error(`[DataDridge] > push error : ${wkey} ${val ? val :''} `)
      }
    } catch (error) {
      console.error(`[DataDridge] > ${error} ignored`)
    }
  }

  get(schema, freeze=true) {
    if(!isObj(schema)) throw Error(`${this} schema is not a JSON`);
    let a = {};
    let DM = this.dataMap;
    for (const key in schema) {
      if (schema.hasOwnProperty(key)) {
        const validate = schema[key];
        if(key in DM){
          if( isObj(validate) && ('type' in validate || 'default' in validate)){
            let { type, filter } = validate;
            filter = isFunction(filter) ? filter : this.config.filter ;
            
            try {
              let _dmk = DM[key];

              if (typeof _dmk === 'undefined') throw Error('key not definde');

              _dmk = filter(_dmk);
              if (_dmk === undefined) throw Error('filter throw');

              if(isRegExp(type) && type.test(_dmk)) {
                a[key] = _dmk
              }else{
                a[key] = type ? parseMuster[ type.name || String(type) ](_dmk) : _dmk;
              };

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

function domDataDridge(params) {
  return new DataDridge(params)
}


export {
  domDataDridge,
  DataDridge,
  superParse,
}
