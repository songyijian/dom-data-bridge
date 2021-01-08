/*
 * @Description: 
 * @Author: yijian.song
 * @Date: 2021-01-08 11:05:19
 * @LastEditors: yijian.song
 * @LastEditTime: 2021-01-08 12:34:08
 */
import DataDridge from './DataDridge';

export default function domDataDridge(params={}) {
  console.log(
    document.querySelectorAll('[data-dridge]')
  );

  return new DataDridge(params)
}
