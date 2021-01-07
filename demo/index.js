
import {
  DataDridge,
  parseMuster,
  superParse,
  domDataDridge,
} from '../src/mian.js'


function filter(a) {
  return a.replace(/\s/g, '').replace(/\n+/g, '')
}
let demo = new DataDridge({
  filter
})


var domdata = document.querySelectorAll('[name="dom-data"]')

var getbox = document.getElementById('get')

Array.from(domdata).forEach(i=>{
  let val = i.value//.replace(/\n+/g, '');
  if (i.id === "obj"){
    demo.push(val,'' ,true)
  }else{
    demo.push(i.id, val,true)
  }
})

var getdata = demo.get({
  array: {
    type: Array,
    default: 'array error'
  },
  number:{
    filter: a => a.replace(/^\D+/g, ''),
    type:Number,
    default:1000
  }
})

console.log(demo.dataMap);
console.log(getdata);



getbox.value += `demo.dataMap: 

${JSON.stringify(demo.dataMap,null,2)}

---------------

获取后的数据 getdata:
${JSON.stringify(getdata,null,2)}

`