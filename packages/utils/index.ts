export const debounce = (func:Function, wait:number, ...args:any[]):Function => {
  let time:number|null = null
  return () => {
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