import { createApp } from 'vue'
import App from './App.vue'
import plugin from '../packages/index'

console.log(plugin)
createApp(App).use(plugin).mount('#app')