import GuDialog, { GuDialogType } from './GuDialog.vue'
import { createApp } from 'vue'
import type { Component } from 'vue'

class Dialog {
  title:string

  size:string

  width:number|undefined

  height:number|undefined

  footer:Boolean

  content:Component

  componentProps:any

  modal:any
  
  cb:Function

  constructor(obj:GuDialogType) {
    const { title, size, width, height, footer, content, componentProps, cb } = obj
    this.title = title
    this.size = size || 'default'
    this.width = width
    this.height = height
    this.footer = footer || true
    this.content = content
    this.componentProps = componentProps
    this.cb = cb
  }

  create() {
    this.modal = createApp(GuDialog, this.getOption()).mount(document.createElement('div')).$el
    document.body.appendChild(this.modal)
  }

  destroyed() {
    document.body.removeChild(this.modal)
  }

  getOption() {
    return {
      title: this.title,
      size: this.size,
      width: this.width,
      height: this.height,
      footer: this.footer,
      content: this.content,
      componentProps: this.componentProps,
      cb: this.cb,
    }
  }
}
export default Dialog