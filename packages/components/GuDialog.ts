import GuDialogTempalte, { GuDialogType } from './GuDialogTemplate.vue'
import { createApp } from 'vue'
import type { Component } from 'vue'

class GuDialog {
  title:string

  size:string

  width:number|undefined

  height:number|undefined

  footer:Boolean

  content:Component

  componentProps:any

  modal:any

  constructor(obj:GuDialogType) {
    const { title, size, width, height, footer, content, componentProps } = obj
    this.title = title
    this.size = size || 'default'
    this.width = width
    this.height = height
    this.footer = footer || true
    this.content = content
    this.componentProps = componentProps
  }

  open() {
    let p = new Promise((resolve, reject) => {
      this.modal = createApp(GuDialogTempalte, this.getOption(resolve)).mount(document.createElement('div')).$el
      document.body.appendChild(this.modal)
    })
    return p
  }

  destroyed() {
    document.body.removeChild(this.modal)
  }

  getOption(resolve) {
    return {
      title: this.title,
      size: this.size,
      width: this.width,
      height: this.height,
      footer: this.footer,
      content: this.content,
      componentProps: this.componentProps,
      onConfirm: (res) => {
        resolve({
          data: res,
          type: 'ok',
        })
        this.destroyed()
      },
      onCancel: (res) => {
        resolve({
          data: res,
          type: 'cancel',
        })
        this.destroyed()
      },
    }
  }
}
export default GuDialog