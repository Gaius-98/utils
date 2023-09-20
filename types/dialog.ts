import type { Component } from 'vue'

enum SizeType{
    small='small',
    default='default',
    large='large'
  }
export interface GuDialogType {
    title:string,
    size?:keyof typeof SizeType,
    width?:number|undefined,
    height?:number|undefined,
    footer?:boolean,
    content:Component,
    componentProps:any,
  }
export interface DialogType extends GuDialogType{
    onConfirm:Function,
    onCancel:Function
}