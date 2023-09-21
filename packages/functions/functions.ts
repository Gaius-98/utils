import { obj } from '../../types/common'
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

/**
 * 对象扁平化
 * @params {obj} 要扁平化的对象
 * @return {obj} 扁平化后的对象+
 * @example flat({ a:{ b:'1' } }) => {a.b:'1'}
 */
const flat = (obj:obj) => {
  const flatten = (res:obj, curObj:any, curKey:string) => {
    // 判断当前项是否为数组
    if (Array.isArray(curObj)) {
      curObj.forEach((item, idx) => {
        // 如果是复杂对象则继续
        if (typeof item == 'object' && item !== null) {
          flatten(res, item, `${curKey}[${idx}]`)
        } else {
          res[`${curKey}[${idx}]`] = item
        }
      })
    } else {
      Object.keys(curObj).forEach(key => {
        // 复杂对象嵌套则继续
        if (typeof curObj[key] === 'object' && curObj[key] !== null) {
          flatten(res, curObj[key], `${curKey}.${key}`)
        } else {
          res[`${curKey}.${key}`] = curObj[key]
        }
      })
    }
  }
  const res:obj = {}
  Object.keys(obj).forEach(key => {
    if (typeof obj[key] === 'object' && obj[key] !== null) {
      flatten(res, obj[key], key)
    } else {
      res[key] = obj[key]
    }
  })
  return res
}
/**
 * 对象反扁平化
 * @params {obj} 扁平化的对象
 * @return {obj} 反扁平化的对象
 * @example unflat({a.b:'1'}) => { a:{ b:'1' } }
 */
const unflat = (obj:obj) => {
  const unflatten = (key:string, value:any, res:obj) => {
    const arr = key.split('.')
    let tmp = res
    for (let i = 0; i < arr.length; i++) {
      let key = arr[i]
      let nextKey = arr[i + 1]
      // 这里需要判断key 是否包含[]字符串，如果是则是数组结构
      if (/\[.+?\]/g.test(key)) {
        // 可能是多维数组，匹配数组维度
        let indexs = key.match(/\[(.+?)\]/g) as RegExpMatchArray
        // 获取数组的key值
        let _key = key.match(/^(.+?)\[/)![1]
        // 构造数组需要判断是否已经存在
        tmp[_key] = tmp[_key] ? tmp[_key] : []
        let n = tmp[_key]
              
        // 构造完数组对数组里面进行构造
        for (let j = 0; j < indexs.length; j++) {
          let index = indexs[j].replace(/\[|\]/g, '')
          let nextIndex = indexs[j + 1]
              
          // 数组包含数组
          if (nextIndex) {
            // 构造数组需要判断是否已经存在
                
            n[index] = n[index] ? n[index] : []
            // 如果还包含数组，将n指针指向下一个数组
            n = n[index]
            // 如果后面还有则构造对象
          } else if (nextKey) {
            // 构造对象需要判断是否已经存在
            n[index] = n[index] ? n[index] : {}
            tmp = n[index]
          } else {
            n[index] = value
          }
        }
        // 不是数组和之前方法保持一致
      } else if (nextKey) {
        // 构造对象需要判断是否已经存在
        tmp[key] = tmp[key] ? tmp[key] : {}
        tmp = tmp[key]
      } else {
        tmp[key] = value
      }
    }
  }
  const res:obj = {}
  Object.keys(obj).forEach(key => {
    unflatten(key, obj[key], res)
  })
  return res
}

/**
 * 生成一个指定长度的hash字符串，默认长度为8
 * @param length 生成的hash长度
 * @returns 
 */
const generateHash = (length = 8) => {
  let hash = ''  
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'  
  
  for (let i = 0; i < length; i++) {  
    const randomIndex = Math.floor(Math.random() * characters.length)  
    hash += characters[randomIndex]  
  }  
  
  return hash 
}
export { 
  scrollToDom,
  getVarType,
  getLowerCase,
  getUpperCase,
  flat,
  unflat,
  generateHash,
}