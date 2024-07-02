export const debounce = (func: Function, wait: number):(...args:any[])=>void => {
  let time: number | null = null
  return (...args:any[]) => {
    if (time) clearTimeout(time)
    const callNow = !time
    time = window.setTimeout(() => {
      func.apply(this, args)
    }, wait)
    if (callNow) {
      func.apply(this, args)
    }
  }
}
export const throttle = (func:Function, wait:number):(...args:any[])=>void => {
  let time:number | null = null
  return (...args:any[]) => {
    if (!time) {
      func.apply(this, args)
      time = window.setTimeout(() => {
        time = null
      }, wait)
    }
  }
}