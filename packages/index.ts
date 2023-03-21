import { App } from 'vue'
import copy from './directives/copy'
import scrollToDom from './functions/scrollToDom'
import GuChart from './components/GuChart.vue'

const install = (app:App) => {
  app.directive(copy.name, copy.options)
  app.component(GuChart.name, GuChart)
}

export {
  scrollToDom,
}
export default { install }