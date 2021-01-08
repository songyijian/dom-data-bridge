import DataDridge from './DataDridge';

export default function domDataDridge(creatfilter) {

  let domdridge = new DataDridge()
  let dridge = document.querySelectorAll('[data-dridge]')

  Array.from(dridge).forEach(i=>{
    var key = i.dataset.dridge;
    var val =  'value' in i ? i.value : i.innerText;
    if (typeof creatfilter === 'function') {
      let {key:fkey, val:fval} = creatfilter({ key, val})
      fkey && fval && domdridge.push(fkey, fval)
    }else{
      key && val && domdridge.push(key, val)
    }
  })

  return domdridge
}
