
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



module.exports = {
  Argvs,
  getIPAdress
}
