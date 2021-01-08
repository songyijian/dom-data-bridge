'use strict';

import {isObj, isRegExp, isString, isFunction, isType, isObjStr, isBoolean} from './isfn' ;
import {parseMuster} from './tool' ;

export default class DataDridge{
  constructor(config={}){
    this.dataMap = {};
    this.config = {
      risk: isBoolean(config.risk) ? config.risk : false,
      filter: isFunction(config.filter) ? config.filter : a => a
    }
  }

  /**
   * @Description: 插入数据
   * @Author: yijian.song
   * @Date: 2021-01-07 15:20:57
   * @param {object｜'{}'｜key} wkey 【json｜‘{}’】会被解析成对象合并到dataMap，【string】生成{[wkey]:val}
   * @param {*} val 当wkey=‘{}’时val必填
   * @param {*} risk wkey=‘{}’ 是否利用superParse解析
   */
  push(wkey, val = '', risk = this.config.risk) {
    try {
      if(isObj(wkey) || isType(wkey) === 'DOMStringMap'){
        Object.assign(this.dataMap, wkey)
      }
      else if(isObjStr(wkey)){
        Object.assign(this.dataMap, parseMuster.Object(wkey, risk))
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

  /**
   * @Description: 根据（解析｜验证规则）获取数据
   * @Author: yijian.song
   * @Date: 2021-01-07 15:31:18
   * @param {object} schema {filter:function,risk:boolean,type:<parseMuster>,default} 解析｜验证规则
   * @param {boolean} risk parseMuster规则
   * @return {object} schema 验证通过的{}
   */
  get(schema) {
    if(!isObj(schema)) throw Error(`${this} schema is not a JSON`);
    let a = {};
    let DM = this.dataMap;
    for (const key in schema) {
      if (schema.hasOwnProperty(key)) {
        const validate = schema[key];
        if(!(key in DM)){ 'default' in validate && (a[key] = validate.default); break}

        try {
          let _dmk = DM[key];
          let { type, filter, risk } = validate;
              risk = isBoolean(risk) ? risk : this.config.risk;
              filter = isFunction(filter) ? filter : this.config.filter ;

          if (_dmk === undefined) throw Error(`${key} not definde`);
          _dmk = filter(_dmk);
          if (_dmk === undefined) throw Error(`${key} filter retrun undefined`);
          if(isRegExp(type) && type.test(_dmk)) {
            a[key] = _dmk
          }else{
            a[key] = type ? parseMuster[ type.name || type.replace(type[0],type[0].toUpperCase()) ](_dmk,risk) : _dmk;
          }
        } catch (error) {
          console.error(error);
          'default' in validate && (a[key] = validate.default)
        }
      
      }
    }
    return a
  }
}