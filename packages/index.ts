import { App } from 'vue'
import copy from './directives/copy'
import scrollToDom from './functions/scrollToDom'
import GuDragResize from './components/GuDragResize.vue'
import GuChart from './components/GuChart.vue'
import GuVirtualList from './components/GuVirtualList.vue'

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
  GuDragResize,
  GuChart,
  GuVirtualList,
  copy,
}

export default { install }