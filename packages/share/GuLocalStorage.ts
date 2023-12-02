import { obj } from '../../types/common'
import { getVarType } from '../functions/functions'

const objToStrObj = (obj:obj) => {
  let cloneObj = {}
  const deep = (newObj:obj, oldObj:obj) => {
    Object.keys(oldObj).forEach(key => {
      let type = getVarType(oldObj[key])
      if (type == 'function') {
        newObj[key] = `Gaius|${oldObj[key].toString()}|function` 
      } else if (type == 'date') {
        newObj[key] = `Gaius|${oldObj[key].getTime()}|date`
      } else if (type == 'object') {
        newObj[key] = {}
        deep(newObj[key], oldObj[key])
      } else if (type == 'array') {
        newObj[key] = []
        deep(newObj[key], oldObj[key])
      } else {
        newObj[key] = oldObj[key]
      }
      return newObj
    })
  }
  deep(cloneObj, obj)
  return cloneObj
}
const strObjToObj = (strObj:obj):obj => {
  let cloneObj = {}
  const deep = (newObj:obj, oldObj:obj) => {
    Object.keys(oldObj).forEach(key => {
      let type = getVarType(oldObj[key])
      let typeReg = {
        function: /^Gaius.*function$/gs,
        date: /^Gaius.*date$/g,
      }
      if (type == 'object') {
        newObj[key] = {}
        deep(newObj[key], oldObj[key])
      } else if (type == 'array') {
        newObj[key] = []
        deep(newObj[key], oldObj[key])
      } else if (typeReg.function.test(oldObj[key])) {
        let fnStr = oldObj[key].split('|')[1]
        newObj[key] = eval(fnStr)
      } else if (typeReg.date.test(oldObj[key])) {
        let dateTemp = Number(oldObj[key].split('|')[1])
        newObj[key] = new Date(dateTemp)
      } else {
        newObj[key] = oldObj[key]
      }
      return newObj
    })
  }
  deep(cloneObj, strObj)
  return cloneObj
}
/**
 * 基于localstorage封装的实例
 */
class GuLocalStorage {
  #eventObserve:obj

  keys:string[]

  constructor() {
    this.#eventObserve = {

    }
    this.keys = []
  }

  setItem(key:string, value:any) {
    let gaiusObj = {
      [key]: value,
    }
    const obj = objToStrObj(gaiusObj)
    if (Object.keys(this.#eventObserve).includes(key)) {
      this.run(key, this.getItem(key), value)
    }
    this.keys.push(key)
    localStorage.setItem(key, JSON.stringify(obj))
  }

  getItem(key:string):obj|undefined {
    const strObj = JSON.parse(localStorage.getItem(key) as string)
    if (strObj) {
      const realObj = strObjToObj(strObj)
      return realObj ? realObj[key] : undefined
    }
    return undefined
  }

  removeItem(key:string) {
    localStorage.removeItem(key)
  }

  watchItem(key:string, callback:Function) {
    if (this.#eventObserve[key]) {
      this.#eventObserve[key].push(callback)
    } else {
      this.#eventObserve[key] = [callback]
    }
  }

  run(key:string, oldValue:any, newValue:any) {
    if (this.#eventObserve[key]) {
      this.#eventObserve[key].forEach((fn:Function) => {
        fn(oldValue, newValue)
      })
    } else {
      console.error('error: no Function')
    }
  }
}
export default GuLocalStorage