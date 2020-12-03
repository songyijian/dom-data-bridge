import { isMap,isObj,isType } from './isfn.js'
import DomDataDridge from './mian.js'




const pjson = new DomDataDridge(
  {
    exclude:/^\{\{[a-zA-Z\.\_]+\}\}/g  // 作用所有字段；利用其排除{{xx}}模版字符串等
  }
)


/**
模版；
  <script macro type="text/template">
    { "star":"{{STAT}}", "CONTENT":"{{CONTENT}}", "ITEM_LIST":"{{ITEM_LIST}}" }
  </script>

模版替换后；
  <script macro type="text/template">
    { "star":"4.5", "CONTENT":"一段内容", "ITEM_LIST":"[1,2,3,4]" }
  </script>
 */
let macrotemplate = document.querySelectorAll('script[macro][type="text/template"]')
console.log(macrotemplate);
// Array.from(macrotemplate).forEach(tag=>{
//   let macro = tag.innerHTML


//   // pjson.push(macro)
// })



// pjson.push(
//   {a:100,c:[1,2,3],d:'{{a.val}}'}
// )

// var url = /^(?=^.{3,255}$)(http(s)?:\/\/)?(www\.)?[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+(:\d+)*(\/\w+\.\w+)*([\?&]\w+=\w*)*$/


// const getdata = pjson.get({
//   star:{
//     type: Number,
//     default:2
//   },
//   CONTENT:{
//     type: String,
//   },
//   URL:{
//     type:url,
//     default:'http://www.baidu.com'
//   }
// })


// console.log(getdata,pjson.dataMap)

// console.log(pjson.dataMap, mapMacro.dataMap);