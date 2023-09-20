import { WatchValue, ResOb } from '../../types/share'
import { obj } from '../../types/common'
/**
 * base Observer watch obj  to do something
 */
class GuResObserver {
  /**
   * 响应对象
   */
  obj:ResOb

  /**
   * 监听事件对象
   */
  observer:Map<string, Set<Function>>

  constructor(obj:obj) {
    let self = this
    this.obj = new Proxy(obj, {
      get(target, key:string) {
        return target[key]
      },
      set(target, key:string, value) {
        let oldValue = target[key]
        if (target[key] != value) {
          target[key] = value
          self.runWatch(key as string, {
            newValue: value,
            oldValue,
          })
        }
        return true
      },
    })
    this.observer = new Map()
  }

  setWatchItem(key:string, callback:Function, defaultValue?:any) {
    this.obj[key] = defaultValue || this.obj[key] || null
    if (this.observer.get(key)) {
      this.observer.set(key, this.observer.get(key)!.add(callback))
    } else {
      this.observer.set(key, new Set([callback]))
    }
  }

  runWatch(key:string, val:WatchValue) {
    if (this.observer.get(key)) {
      this.observer.get(key)!.forEach((cb:Function) => {
        cb(val)
      })
    }
  }

  removeItem(key:string, callback:Function) {
    if (this.observer.get(key)) {
      this.observer.get(key)!.delete(callback)
    }
  }
}
export default GuResObserver