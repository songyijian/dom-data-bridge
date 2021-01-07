'use strict';

// import {isObj, isRegExp, isString, isFunction, isType, isObjStr, isBoolean} from './isfn' ;
import {parseMuster} from './tool' ;
import superParse from './superParse';
import DataDridge from './DataDridge';

function domDataDridge(params) {
  return new DataDridge(params)
}


export {
  DataDridge,
  parseMuster,
  superParse,
  domDataDridge
}
