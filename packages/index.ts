import { App } from 'vue'
import copy from './directives/copy'
import { scrollToDom, getVarType, getLowerCase, getUpperCase } from './functions/functions'
import GuDragResize from './components/GuDragResize.vue'
import GuChart from './components/GuChart.vue'
import GuVirtualList from './components/GuVirtualList.vue'
import useGuLocalStorage from './hooks/useGuLocalStorage'
import useGuObserver from './hooks/useGuObserver'
import useGuDialog from './hooks/useGuDialog'

const directives = import.meta.glob('./directives/*.ts', { eager: true })
const compModules = import.meta.glob('./components/*.vue', { eager: true })

const install = (app:App) => {
  for (const path in directives) {
    const directive:any = directives[path]
    app.directive(directive.default.name, directive.default.options)
  }
  for (const path in compModules) {
    const module:any = compModules[path]
    module.default.props.version = '5'
    console.log(module.default)
    app.component(module.default.name, module.default)
  }
}
export { 
  scrollToDom,
  getVarType,
  getLowerCase,
  getUpperCase,
  GuDragResize,
  GuChart,
  GuVirtualList,
  copy,
  useGuObserver,
  useGuLocalStorage,
  useGuDialog,
}

export default { install }