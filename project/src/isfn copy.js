
export function isString(o) {
  return Object.prototype.toString.call(o).slice(8, -1) === "String"
}

export function isNumber(o) {
  return Object.prototype.toString.call(o).slice(8, -1) === "Number"
}

export function isBoolean(o) {
  return Object.prototype.toString.call(o).slice(8, -1) === "Boolean"
}

export function isFunction(o) {
  return Object.prototype.toString.call(o).slice(8, -1) === "Function"
}

export function isNull(o) {
  return Object.prototype.toString.call(o).slice(8, -1) === "Null"
}

export function isUndefined(o) {
  return Object.prototype.toString.call(o).slice(8, -1) === "Undefined"
}

export function isObj(o) {
  return Object.prototype.toString.call(o).slice(8, -1) === "Object"
}

export function isArray(o) {
  return Object.prototype.toString.call(o).slice(8, -1) === "Array"
}

export function isDate(o) {
  return Object.prototype.toString.call(o).slice(8, -1) === "Date"
}

export function isRegExp(o) {
  return Object.prototype.toString.call(o).slice(8, -1) === "RegExp"
}

export function isError(o) {
  return Object.prototype.toString.call(o).slice(8, -1) === "Error"
}

export function isSymbol(o) {
  return Object.prototype.toString.call(o).slice(8, -1) === "Symbol"
}

export function isPromise(o) {
  return Object.prototype.toString.call(o).slice(8, -1) === "Promise"
}

export function isSet(o) {
  return Object.prototype.toString.call(o).slice(8, -1) === "Set"
}

export function isMap(o) {
  return Object.prototype.toString.call(o).slice(8, -1) === "Map"
}

export function isFalse(o) {
  if (!o || o === "null" || o === "undefined" || o === "false" || o === "NaN") return true;
  return false
}

export function isTrue(o) {
  if (!o || o === "null" || o === "undefined" || o === "false" || o === "NaN") return false;
  return true
}

export function isType(o) {
  return Object.prototype.toString.call(o).slice(8, -1)
}
