
import DomDataDridge from './mian.js'



// /**
//  * 解析 json 格式的字符串 
//  */
// const pjson = new DomDataDridge(
//   // {
//   //   exclude:/^\{\{[a-zA-Z\.\_]+\}\}/g  // 作用所有字段；利用其排除{{xx}}模版字符串等
//   // }
// )
// let templateData = document.querySelectorAll('script[macro][type="text/template"]')
// Array.from(templateData).forEach(tag=>{
//   let macro = tag.innerHTML
//   pjson.push(macro)
// })


// const getJsonStr = pjson.get({
//   star:{
//     type: Number
//   },
//   CONTENT:{
//     type: String,
//   },
//   URL:{
//     type:/(http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&:/~\+#]*[\w\-\@?^=%&/~\+#])?/,
//     default:'http://www.baidu.com'
//   },
//   ITEMS:{
//     type:Array,
//     default:[] //不能被解析成字符串就走
//   },
//   UNDFUND:{
//     type:String,
//     default:'默认值'
//   },
//   TEMP_ERR:{
//     type:String,
//     // {{TEMP_ERR}} 替换失败的模版，利用 exclude 统一排除
//   }
// })

// console.log(pjson.dataMap)
// console.log(getJsonStr)




/***
 * 
 * 解析 dom dataset 数据 
 * 
 */

// 作用所有字段；利用其排除{{xx}}模版字符串等
const pdataset = new DomDataDridge({ exclude:/^\{\{[a-zA-Z\.\_]+\}\}/g })

let datasetData = document.querySelectorAll('meta[macro]')
Array.from(datasetData).forEach(tag=>{
  pdataset.push(tag.dataset)
})


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
    // {{TEMP_ERR}} 替换失败的模版，利用 exclude 统一排除
  }
})


console.log(pdataset.dataMap)
console.log(getDataSet)

