
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


/**
 * 根据验证规则取值
 * @param {string} key 取值的建
 * @param {object} validate 验证体 
 */
function minSchema(postMap, key, validate){
  let type = validate.type
  let _default = validate.default
  try{
    return type ? strTypeConversion[ type.name || String(type) ](postMap[key]) : postMap[key]
  }catch(err){
    if(_default) return _default
  }
}



class DataDridge{
  constructor(){
    this.postMap = {}
  }

  assign(...macro){
    Object.assign(this.postMap, ...macro)
  }

  get(schema){
    if(!isObj(schema)) throw Error(`${this} schema is not a JSON`);
    let a = {}
    for (const key in schema) {
      if (schema.hasOwnProperty(key)) {
        const validate = schema[key];
        if(key in this.postMap){
          if( isObj(validate) && ('type' in validate || 'default' in validate)) a[key] = minSchema(this.postMap, key, validate);
        }else{
          'default' in validate && (a[key] = validate['default'])
        }
      }
    }
    return Object.freeze(a)
  }

}


export default DataDridge