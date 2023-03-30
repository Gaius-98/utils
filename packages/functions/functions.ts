/**
 * 滚动container 定位容器
 * @param container -- Element dom的容器
 * @param to -- Element  需要定位到的dom
 */
const scrollToDom = (to: Element, container?:Element) => {
  if (container) {
    const { left: cLeft, top: cTop } = container?.getBoundingClientRect() as DOMRect
    const { left: tLeft, top: tTop } = to.getBoundingClientRect()
    const isScroll = (dom:Element) => ({
      y: dom.scrollHeight - dom.clientHeight > 0,
      x: dom.scrollWidth - dom.clientWidth > 0,
    })
    const { x, y } = isScroll(container)
    let top = tTop - cTop + container.scrollTop 
    let left = tLeft - cLeft + container.scrollLeft
    container.scrollTo({
      top: y ? top : container.scrollTop,
      left: x ? left : container.scrollLeft,
    })
  } else {
    const { left: tLeft, top: tTop } = to.getBoundingClientRect()
    window.scrollTo({
      left: tLeft,
      top: tTop,
    })
  }
}
/**
 * 返回当前变量的类型
 * @param variable 
 * @returns {string} type  
 * @example getVarType('1') return 'string'
 */
const getVarType = (variable:any) => {
  const reg = /(\[object\s)(\w*)\]/
  let obj = Object.prototype.toString.call(variable).match(reg)
  if (obj) {
    return getLowerCase(obj[2] as string)
  }
  return '匹配类型失败'
}
/**
 * 将word的部分字母小写后返回 默认首字母小写
 * @param {string} word 
 * @returns {string} 
 */
const getLowerCase = (word:string, startIndex = 0, endIndex = 1) => {
  if (startIndex > word.length || endIndex > word.length) {
    return 'error:word长度不够'
  }
  return word.slice(startIndex, endIndex).toLocaleLowerCase() + word.slice(endIndex)
}

/**
 * 将word的部分字母大写后返回 默认首字母大写
 * @param {string} word 
 * @returns {string} 
 */
const getUpperCase = (word:string, startIndex = 0, endIndex = 1) => {
  if (startIndex > word.length || endIndex > word.length) {
    return 'error:word长度不够'
  }
  return word.slice(startIndex, endIndex).toLocaleUpperCase() + word.slice(endIndex)
}
export { scrollToDom, getVarType, getLowerCase, getUpperCase }