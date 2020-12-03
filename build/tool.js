
class Argvs {
  constructor() {
    this.argvsAll = this.argvsAll();
  }
  argvsAll() {
    return process.argv.slice(2).reduce((acc, item) => {
      item = item.split(/=/);
      const [k, v] = [item[0].replace(/-/gi, ''), item[1]];
      acc.push({
        [k]: v
      });
      return acc;
    }, [])
  }

  argvsGet(k) {
    return this.argvsAll.reduce((acc, item) =>
      acc ?
      acc :
      (k in item) ?
      acc = item[k] :
      acc, false)
  }

  argvsKeys(argvsAll) {
    if (!argvsAll) argvsAll = this.argvsAll;
    return argvsAll.reduce((acc, item) => {
      return [...acc, ...Object.keys(item)]
    }, [])
  }
  argvsHas(k) {
    return Object.is(this.argvsKeys().indexOf(k), -1) ? false : true;
  }
}


// 获取本地
function getIPAdress() {
  var interfaces = require('os').networkInterfaces()
  for (var devName in interfaces) {
      var iface = interfaces[devName];
      for (var i = 0; i < iface.length; i++) {
          var alias = iface[i];
          if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
              return alias.address;
          }
      }
  }
}



/*
    param1 JSONstr 未格式化的JSON字符串
    return 去【类空格字符】后的JSON字符串
*/
function JSONTrim(JSONstr) {
  try {
      JSONstr = JSONstr.replace(/'/g, '"');
      JSONstr = JSON.stringify(JSON.parse(JSONstr));
  } catch (error) {
      // 转换失败错误提示
      console.error('json数据格式有误...');
      console.error(error);
      JSONstr = null;
  }
  return JSONstr;
}



module.exports = {
  Argvs:Argvs,
  getIPAdress: getIPAdress,
  JSONTrim
}
