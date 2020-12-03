# dom-data-bridge
js读取写在dom内的数据



## 支持 innerText Json 注入
```js

import DomDataDridge from './mian.js'

const pjson = new DomDataDridge({
  // 作用所有字段；利用其排除{{xx}}模版字符串等
  exclude:/^\{\{[a-zA-Z\.\_]+\}\}/g  
})

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
Array.from(macrotemplate).forEach(tag=>{
  let macro = tag.innerHTML
  pjson.push(macro)
})


var isUrl = /(http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&:/~\+#]*[\w\-\@?^=%&/~\+#])?/;

const getdata = pjson.get({
  star:{
    type: Number,
    default:2
  },
  CONTENT:{
    type: String,
  },
  URL:{
    type:isUrl,
    default:'http://www.baidu.com'
  },
  ITEMS:{
    type:Array,
    default:[] //不能被解析成字符串就走
  },
  UNDFUND:{
    type:String,
    default:'默认值'
  },
  TEMP_ERR:{
    // {{TEMP_ERR}} 替换失败的模版，利用 exclude 统一排除
  }
})


console.log(pjson.dataMap, getdata)


/*
pjson.dataMap = {
  star: "4.5", 
  CONTENT: "一段内容", 
  ITEMS: "[1,2,3,4]", 
  URL: "https://github.com/songyijian/dom-data-bridge", 
  TEMP_ERR: "{{TEMP_ERR}}"
}

getdata = {
  star: 4.5, 
  CONTENT: "一段内容", 
  URL: "https://github.com/songyijian/dom-data-bridge", 
  ITEMS: Array(4), 
  UNDFUND: "默认值"
}
*/

```