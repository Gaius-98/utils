import GuResObserver from '../share/GuObserver'
import { obj } from '../../types/common'
/**
 * 监听对象变化,用于组件之前交互。
 * A component 发布值，B、C等组件通过watchItem 监听A组件属性的变化，触发对应的回调函数
 * @param init 初始化对象
 * @returns {observer,watchItem,removeItemListen}
 */
const useGuObserver = (init:obj) => {
  let ob = new GuResObserver(init)
  /**
   * 响应对象
   */
  const { obj: observer } = ob
  /**
   * 监听对象的某一属性
   * @param key 对象属性
   * @param callback 对象变化后的回调函数
   */
  const watchItem = (key:string, callback:Function) => {
    ob.setWatchItem(key, callback)
  }
  /**
   * 移除对象上的某一属性的监听事件
   * @param key 对象属性
   * @param callback 监听事件
   */
  const removeItemListen = (key:string, callback:Function) => {
    ob.removeItem(key, callback)
  }
  return {
    observer, 
    watchItem, 
    removeItemListen,
  }
}
export default useGuObserver