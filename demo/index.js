
import {
  DataDridge,
  parseMuster,
  superParse,
  domDataDridge,
} from '../src/mian.js'

// domDataDridge()

var button = document.querySelector('button')
var resultbox = document.getElementById('result')
button.onclick = go;
go();


function go() {

  function creatfilter({key,val}) {
    if (key === ''){
      key = 'object'
      val = 'data-dridge="", 被creatfilter过滤处理'
    }
    return {key, val}
  }

  let demo = domDataDridge(creatfilter)

  var getdata = demo.get({
    object: {
      // type: Object,
      // default:{d1:'验证失败'}
    },
    array: {
      risk: true,
      type: Array,
      default: 'array error'
    },
    number: {
      filter: a => a.replace(/\D+/g, ''),
      type: Number,
      default: 1000
    },
    risk: {
      risk: true,
      type: Object,
      default: 'risk可以规避掉一部分危险行为，但不穷尽，请谨慎使用！'
    },
    url: {
      type: /(http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&:/~\+#]*[\w\-\@?^=%&/~\+#])?/,
      default: 'https://www.google.com/'
    },
    source: {
      filter: a => {
        a = a.replace(/\n+/g, '').replace(/\s+</g, '<') //.replace(/\"/g, '')
        a = 'get filter 预先处理内容:' + a;
        return a
      },
      type: String,
      default: '<h1> 解析失败 </h1>'
    },
    defaultTset: {
      type: String,
      default: '找不到就走这里'
    }
  })

  console.log(`demo.dataMap: `,demo.dataMap);
  console.log(`getdata: `, getdata);

  resultbox.value = JSON.stringify(getdata, null, 2)
}



// function filter(a) {
//   return typeof a === 'string' ? a.replace(/\s/g, '').replace(/\n+/g, '') : a
// }

// let demo = new DataDridge({
//   filter
// })

// var domdata = document.querySelectorAll('[name="dom-data"]')

// Array.from(domdata).forEach(i=>{
//   let val = i.value
//   if (i.id === "obj"){
//     demo.push(val,'' ,true)
//   }else{
//     demo.push(i.id, val,true)
//   }
// })
