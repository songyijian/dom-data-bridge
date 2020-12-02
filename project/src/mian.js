'use strict';

// import {use, dridge} from './dridge.js'
// import DataDridge from './dridgeClass.js'

// import {isObj, isArray, isRegExp} from './isfn'


function isObj(o) {
  return Object.prototype.toString.call(o).slice(8, -1) === "Object"
}

function isArray(o) {
  return Object.prototype.toString.call(o).slice(8, -1) === "Array"
}

function isRegExp(o) {
  return Object.prototype.toString.call(o).slice(8, -1) === "RegExp"
}


// console.log(isRegExp(/\{\{[a-zA-Z\.\_]+\}\}/g))
/////////////////////////////////


const strTypeConversion= {
  String,
  Number,
  Boolean,
  // RegExp,
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
  // console.log( type )
  try{
    if(isRegExp(type) ) {
      // console.log(type.test(postMap[key]))

      if(type.test(postMap[key])) {
        console.log('..........',type.test(postMap[key]))
        return postMap[key]
      };
    }
    return type ? strTypeConversion[ type.name || String(type) ](postMap[key]) : postMap[key]
  }catch(err){
    if(_default) return _default
  }
}



class DataDridge{
  constructor(){
    this.postMap = {}
  }

  assign(macro){
    isObj(macro) && Object.assign(this.postMap, macro)
  }

  get(schema){
    if(!isObj(schema)) throw Error(`${this} schema is not a JSON`);
    let a = {}
    for (const key in schema) {
      if (schema.hasOwnProperty(key)) {
        const validate = schema[key];
        if(key in this.postMap){
          // console.log(validate.type)
          if( isObj(validate) && ('type' in validate || 'default' in validate)) a[key] = minSchema(this.postMap, key, validate);
        }else{
          'default' in validate && (a[key] = validate['default'])
        }

      }
    }

    return Object.freeze(a)
  }

}





/////////////////////////////////////










const TemplateCharacter = /^\{\{[a-zA-Z\.\_]+\}\}/g;
const scriptMacro = new DataDridge()

function parseStringJson(strJson) {
  let a = {}
  try {
    a = JSON.parse(strJson)
    
  } catch (error) {
    console.error(error)
  }
  return a
}


// console.log(TemplateCharacter.test('{"a":{"b":1}}'));

/**
 * <script macro type="text/template">{}</script>
 */
function init(){
  try {
    let macrotemplate = document.querySelectorAll('script[macro][type="text/template"]')
    Array.from(macrotemplate).forEach(tag=>{
      let macro = tag.innerHTML
      console.log(macro)

      parseStringJson(macro)
    })
  } catch (error) {
    console.error(error)
  }
  // Object.freeze(postMap)
}
init()

scriptMacro.assign(
  {a:100,b:"sssss"}
)

scriptMacro.assign(
  {a:100,c:[1,2,3],d:'{{a.val}}'}
)



// let str = '{"a":{"b":1}}'
// TemplateCharacter.test(str)


const jsonStrData = scriptMacro.get({
  a:{
    type: String,
    default:111
  },
  ax:{
    type: Number,
    default:2222
  },
  d:{
    type:TemplateCharacter,
    default:'aaaa'
  }
})


console.log(scriptMacro.postMap);
console.log(jsonStrData)

