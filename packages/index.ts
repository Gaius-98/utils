import { App } from 'vue'
import copy from './directives/copy'
import { scrollToDom, getVarType, getLowerCase, getUpperCase, flat, unflat } from './functions/functions'
import GuDragResize from './components/GuDragResize.vue'
import GuVirtualList from './components/GuVirtualList.vue'
import GuDynamicHeightList from './components/GuDynamicHeightList.vue'
import useGuDialog from './hooks/useGuDialog'
import { GuPubSub } from './module/PubSub'

export * from '../types/utilsType'
const directives = import.meta.glob('./directives/*.ts', { eager: true })
const compModules = import.meta.glob('./components/*.vue', { eager: true })

const install = (app:App) => {
  for (const path in directives) {
    const directive:any = directives[path]
    app.directive(directive.default.name, directive.default.options)
  }
  for (const path in compModules) {
    const module:any = compModules[path]
    app.component(module.default.name, module.default)
  }
}
export { 
  scrollToDom,
  getVarType,
  getLowerCase,
  getUpperCase,
  GuDragResize,
  GuVirtualList,
  GuDynamicHeightList,
  copy,
  useGuDialog,
  flat,
  unflat,
  GuPubSub,
}

export default { install }