# dom-data-bridge
用于解析html内的数据对象

## 安装
```JS
// npm 
npm install dom-data-bridge  // 装载
npm update dom-data-bridge   // 更新

// yarn
yarn add dom-data-bridge     // 装载
yarn upgrade dom-data-bridge // 更新

// Browserify(https://github.com/songyijian/dom-data-bridge)
<script src="../dist/index.js"></script> 
```
## API
```JS
import DomDataDridge from 'dom-data-bridge'

const demo = new DomDataDridge({
  exclude:<RegExp>    // 排除指定字符 /^\{\{[a-zA-Z\.\_]+\}\}/g = {{xx}}
})

FN
  // 插入（合并）要解析的内容
  demo.push( "{json}"| <DOMStringMap> )

  // 获取数据
  demo.get(
    { // 解析｜验证规则
      key:{
        type: Number, // 解析类型 （String|Number|Boolean|Object|Array) || RegExp正则验证
        default:2 // 默认值
      },
    }, 
    true // 建议开启Object.freeze（保护数被串改）
  )

ATTR
  this.dataMap = {}   // 原始数据源
  this.exclude = data.exclude // 全局排除规则

```

## 解析json格式的字符串数据 
字符串应是一个标准json格式。 


```js
const pjson = new DomDataDridge({exclude:/^\{\{[a-zA-Z\.\_]+\}\}/g}) // 排除未替换的{{xx}}模版字符串

pjson.push(
`{ 
"star":"4.5", 
"CONTENT":"一段内容", 
"ITEMS":"[1,2,3,4]",
"URL":"https://github.com/songyijian/dom-data-bridge",
"TEMP_ERR":"{{TEMP_ERR}}"
}`
 )

const getdata = pjson.get({
  star:{
    type: Number,
    default:2
  },
  CONTENT:{
    type: String,
  },
  URL:{
    type:/(http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&:/~\+#]*[\w\-\@?^=%&/~\+#])?/,
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
    type:String,
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
  TEMP_ERR: "{{TEMP_ERR}}" //模版没有正确被替换
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

## 解析 dom dataset 数据 
属性解析现在只能用data- 利用dataset的DOMStringMap属性来实现（html不区分大小写， data-（强制解析成小写）取值时要注意）
```html
     
<meta macro 
  data-star=4.5
  data-CONTENT=字符串内容的'双引号'要编译更不要出现
  data-ITEMS=[1,2,3,4]
  data-URL=https://github.com/songyijian/dom-data-bridge
  data-TEMP_ERR={{TEMP_ERR}}
>
```
```js
const pdataset = new DomDataDridge({ exclude:/^\{\{[a-zA-Z\.\_]+\}\}/g })
Array.from(document.querySelectorAll('meta[macro]')).forEach(tag=>pdataset.push(tag.dataset))

const getDataSet = pdataset.get({
  star:{
    type: Number
  },
  CONTENT:{
    type: String,
    default:'key大写一定取不到' //不能被解析，默认值
  },
  URL:{
    type:/(http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&:/~\+#]*[\w\-\@?^=%&/~\+#])?/,
    default:'http://www.baidu.com'
  },
  ITEMS:{
    type:Array,
    default:[]
  },
  temp_err:{
    type: String,
    // {{TEMP_ERR}} 替换失败的模版字符串，利用 exclude 统一排除
  }
})

/*
pdataset.dataMap = {star: "4.5", content: "字符串内容的'双引号'要编译更不要出现", items: "[1,2,3,4]", url: "https://github.com/songyijian/dom-data-bridge", temp_err: "{{TEMP_ERR}}"}
getDataSet = {star: 4.5, CONTENT: "key大写一定取不到", URL: "http://www.baidu.com", ITEMS: Array(0)}
*/

```