import { App } from 'vue'
import copy from './directives/copy'
import scrollToDom from './functions/scrollToDom'

const install = (app:App) => {
  app.directive(copy.name, copy.options)
}

export {
  scrollToDom,
}
export default { install }