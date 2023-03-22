import { App } from 'vue'
import copy from './directives/copy'
import scrollToDom from './functions/scrollToDom'
import GuDragResize from './components/GuDragResize.vue'
import GuChart from './components/GuChart.vue'
const install = (app:App) => {
  app.directive(copy.name, copy.options)
  app.component(GuChart.name, GuChart)
  app.component(GuDragResize.name, GuDragResize)
}

export {
  scrollToDom,
  // GuChart,
  GuDragResize,
}
export default { install }