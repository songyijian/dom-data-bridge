import DataDridge from './DataDridge';

export default function domDataDridge(params={}) {
  let config = {
    
  }

  let domdridge = new DataDridge(params)
  let risk = true;
  let dridge = document.querySelectorAll('[data-dridge]')
  Array.from(dridge).forEach(i=>{
    let key = i.dataset.dridge;
    let val =  'value' in i ? i.value : i.innerText;
    !!key ? domdridge.push(key,val,risk) : domdridge.push(val,'',risk)
  })
  return domdridge
}
