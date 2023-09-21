import { onBeforeUnmount } from 'vue'
import { generateHash } from '../functions/functions'
import { obj } from '../../types/common'

interface opt {
    name?:string,
}
/**
 * 便于操作localstorage，同时监听localstorage的变化
 * @param initObj  初始化对象，存入到localstorage
 * @param callback  当对象发生变化后的回调
 * @param opts 
 * @returns 
 */
const useObserverLocalStorage = (initObj:obj, callback:Function, opts:opt = {
  name: 'Gaius',
}) => {
  let init = new Proxy(initObj, {
    get(target, key:string) {
      return target[key]
    },
    set(target, key:string, value) {
      let oldValue = {
        ...target,
      }
      if (oldValue[key] !== value) {
        target[key] = value
        saveObj(target)
        callback({ key, oldValue, newValue: target })
      }
      return true
    },
  })
  const { name } = opts
  let hashName = `${name}-${generateHash(4)}`
  /**
   * 
   * @param obj 
   */
  const saveObj = (obj:obj) => {
    let str = JSON.stringify(obj)
    localStorage.setItem(hashName, str)
  }
  saveObj(initObj)
  onBeforeUnmount(() => {
    localStorage.removeItem(hashName)
  })
  return {
    init,
  }
}
export default useObserverLocalStorage