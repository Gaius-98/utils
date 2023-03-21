/**
 * 通用对象
 */
export interface obj {
  [key:string]:any
}

/**
 * 请求结构
 */
export interface reqForm{
  url:string,
  method:'get'|'post',
  params:obj,
  data:obj,
  headers:obj
}