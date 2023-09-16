interface WatchValue{
    newValue:any,
    oldValue:any
}
interface ResOb {
    [key:string]:any
}
/**
 * base Observer watch obj  to do something
 */
class GuResObserver {
  obj:ResOb

  observer:Map<string, Set<Function>>

  constructor(obj:Object) {
    let self = this
    this.obj = new Proxy(obj, {
      get(target, key) {
        return target[key]
      },
      set(target, key, value) {
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
    if (this.observer[key]) {
      this.observer[key] = this.observer[key].add(callback)
    } else {
      this.observer[key] = new Set([callback])
    }
  }

  runWatch(key:string, val:WatchValue) {
    if (this.observer[key]) {
      this.observer[key].forEach((cb:Function) => {
        cb(val)
      })
    }
  }

  removeItem(key:string, callback:Function) {
    if (this.observer[key]) {
      this.observer[key].delete(callback)
    }
  }
}
export default GuResObserver