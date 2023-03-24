import { App } from 'vue'
import copy from './directives/copy'
import scrollToDom from './functions/scrollToDom'
import GuDragResize from './components/GuDragResize.vue'
import GuChart from './components/GuChart.vue'
import GuVirtualList from './components/GuVirtualList.vue'

const install = (app:App) => {
  app.directive(copy.name, copy.options)
  app.component(GuChart.name, GuChart)
  app.component(GuDragResize.name, GuDragResize)
  app.component(GuVirtualList.name, GuVirtualList)
}

export {
  scrollToDom,
  GuChart,
  GuDragResize,
  copy,
}
export default { install }