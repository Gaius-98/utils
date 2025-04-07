import type { Component } from 'vue'
/**
 * 通用对象
 */
export interface Obj {
    [key:string]:any
  }
  
/**
 * 指令的绑定对象
 */
export interface BindType {
    arg:string,
    oldValue:any,
    value:any,
    modifiers:Obj,
    dir:Obj
  }
/**
 * ---------------Gu-dialog------------
 */
export enum SizeType{
  small,
  default,
  large
}

export interface GuDialogType {
  title:string,
  size?:keyof typeof SizeType,
  width?:number,
  height?:number,
  footer?:boolean,
  content:Component,
  componentProps:any,
}

export interface DialogType extends GuDialogType{
    onConfirm:(val:Record<'value', any>)=>void,
    onCancel:(val:Record<'value', any>)=>void
}
export enum OptType {
  ok,
  cancel
}
export type CallBackFn = (value:{type:keyof typeof OptType, data:Record<'value', any>}) => void
/**
 * -----------Gu-Drag-Resize------------
 */
export interface DragResizeProps {
  minh?:number,
  minw?:number,
  disabled?:boolean|string,
  width?:number,
  height?:number,
  top?:number,
  left?:number,
  nodeKey?:number|string
}
export type DragResizeData = Pick<Required<DragResizeProps>, 'height'|'width'|'top'|'left'|'nodeKey'>
/**
 * ---------Gu-V-List
 */
export type ReplaceFieldType = {
  children?:string,
  value?:string,
  label?:string,
  key?:string,
  [field:string]:any
} 
export interface VirtualProps {
  itemHeight?:number,
  list:Obj[],
  replaceField?: ReplaceFieldType
}