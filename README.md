# dom-data-bridge
> json解析（整理解析不标准数据）按照规则读取;
JSON text analysis, rule validation value


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
## 引入
```JS
import {
  DataDridge,
  parseMuster,
  superParse,
  domDataDridge,
} from 'dom-data-bridge'
```

### superParse
> superParse 字符串json解析，可针对非标准开启风险解析
<!-- > superParse > parseMuster > DataDridge 内的解析规则 -->
```js
/**
 * @Description: 支持高风险的json字符串解析
 * @param {string} strs 要解析的'{字符串}'对象, 不可‘[]’
 * @param {boolean} risk 利用eval可以解析一些不规范的{json}
 * @return {object} 
 */
superParse(string,risk)
  // string : '{}' | '[]'
  // risk :true = 可以解析一些不规范的{json} 但是存在风险，谨慎使用

// Object '{}'
superParse('{a:1}') // Error
superParse('{"a":1}') // {a:1}
superParse('{a:1}',true) // {a:1}

// Array '[]'
superParse('{a:1}',true) // Error
superParse('[{a:1},2]') // Error
superParse('[{a:1},2]',true) // [{…}, 2]

```


### parseMuster
> superParse > parseMuster ,DataDridge 内的解析（验证）规则
```js
let {Object, Array, String, Boolean, Number} = parseMuster;

/**
 * @Description: 解析验证数据类型
 * @param {Object, Array, String, Boolean, Number} strs 要解析的'{字符串}'对象, 不可‘[]’
 * @param {boolean} risk 利用eval可以解析一些不规范的{json}
 * @throw {Error} 解析+验证 失败
 */
parseMuster[key]() // Object&Array == <superParse>

// Object {}
parseMuster.Object('{a:1}') // Error
parseMuster.Object('{"a":1}') // {a:1}
parseMuster.Object('{a:1}',true) // {a:1}

// Array []
parseMuster.Array('{a:1}',true) // Error
parseMuster.Array('[{a:1},2]') // Error
parseMuster.Array('[{a:1},2]',true) // [{…}, 2]

// Number 对NaN做了处理
parseMuster.Number == Number() 
parseMuster.Number(NaN) //Error

parseMuster.String === String()
parseMuster.Boolean === Boolean()
```


## DataDridge
> 整理解析不标准数据，按照规则读取
```js
var globeconfig = { // 全局配置
  risk:  false, // <superParse> 接受风险解析非标准json
  filter: a => a  // 过滤函数
}

const demo = new DataDridge(globeconfig)

      demo.dataMap = {}   // 原始数据源
      demo.config = globeconfig // 全局排除规则


/**
 * @Description: 插入数据
 * @param {object｜'{}'｜key} wkey 【json｜‘{}’】会被解析成对象合并到dataMap，【string】生成{[wkey]:val}
 * @param {*} val 当wkey=‘{}’时val必填
 * @param {*} risk wkey=‘{}’ 是否利用superParse解析
 */
demo.push( wkey, val = '', risk = globeconfig.risk )
  // demo.push( 'a', '1',) //yes
  // demo.push( {a:1}, '') //yes
  // demo.push( '{a:1}', '', true) //yes
  // demo.push( '{"a":1}') // yes
  // demo.push( '{a:1}', '') // error
  // demo.push( '[]', '', true) //error

/**
 * @Description: 根据（解析｜验证规则）获取数据
 * @Author: yijian.song
 * @Date: 2021-01-07 15:31:18
 * @param {object} schema {filter:function,risk:boolean,type:<parseMuster>,default} 解析｜验证规则
 * @param {boolean} risk parseMuster规则
 * @return {object} schema 验证通过的{}
 */
get(schema, risk = globeconfig.risk)  

  schema = {
    key:{
      filter:(a)=>a,
      risk:false,
      type: "Object|Array|String|Boolean|Number｜RegExp", //  parseMuster| RegExp正则验证
      default:2 // 默认值
    }
  }

  // 数据处理流程
  // filter > type( Object|Array ？ risk) > default

```



## 解析json格式的字符串数据 
字符串应是一个标准json格式。 

```js
const pjson = new DataDridge()

pjson.push(
  `{ 
    "star":"4.5", 
    "CONTENT":"一段内容", 
    "ITEMS":"[1,2,3,4]",
    "URL":"https://github.com/songyijian/dom-data-bridge",
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
  }
})


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