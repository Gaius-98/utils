import { createApp } from 'vue'
import type { Component } from 'vue'
import GuContextMenuTemplate, { MenuReplaceFields } from './GuContextMenuTemplate.vue'

interface GuContextMenuType {
    list:any[],
    replaceFields?:MenuReplaceFields
}
class GuContextMenu {
  list:any[]

  replaceFields:MenuReplaceFields

  contextmenu:any

  showFlag:boolean

  constructor(cfg:GuContextMenuType) {
    const { list, replaceFields } = cfg
    this.list = list
    this.replaceFields = replaceFields
    this.showFlag = false
  }

  createMenu() {
    this.contextmenu = createApp(GuContextMenuTemplate, this.getOption()).mount(document.createElement('div')).$el
    document.body.appendChild(this.contextmenu)
  }

  getOption() {
    return {
      list: this.list,
      replaceFields: this.replaceFields,
      left: 0,
      top: 0,
    }
  }

  show() {
    this.showFlag = true
    this.update()
  }

  hide() {
    this.showFlag = false
  }

  update() {
    console.log(createApp(GuContextMenuTemplate, this.getOption()))
    console.log(this.contextmenu.instance)
  }
}
export default GuContextMenu