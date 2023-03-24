<template>
  <div
    ref="guChart"
    class="gu-chart"
  >
  </div>
</template>

<script lang='ts' setup name="GuChart">
import { init, EChartsType } from 'echarts'
import { reactive, toRefs, ref, onMounted, watch } from 'vue'
import axios from 'axios'
import { useRoute } from 'vue-router'
import { obj, reqForm } from '../../types/common'

export interface Props {
  insertOption?:obj,
  option?:obj
}
const props = withDefaults(defineProps<Props>(), {
  insertOption: () => ({}),
  option: () => ({}),
})

const loading = ref(true)
const route = useRoute()
const { insertOption, option } = toRefs(props)
const chartOption = reactive<obj>({})
const req = reactive<reqForm>({
  url: '',
  method: 'get',
  params: {

  },
  data: {

  },
  headers: {
    
  },
})
const oldParams = reactive<obj>({})
const variable = reactive<obj>({})
const handleDatajs = ref('')
if (insertOption.value) {
  loading.value = true
  const data = insertOption.value
  Object.assign(req, data.reqOption)
  if (req.method == 'get') {
    Object.assign(oldParams, req.params)
  } else {
    Object.assign(oldParams, req.data)
  }
  Object.assign(variable, data.variable)
  axios({
    ...req,
  }).then(reqData => {
    const option = data.option
    handleDatajs.value = data.handleDatajs
    try {
      eval(data.handleDatajs)
    } catch (error) {
      console.log(error)
    }
    Object.assign(chartOption, option)
    initEchart()
  }).catch((err) => {
    console.error(err)
    loading.value = false
  })
} else {
  Object.assign(chartOption, option.value)
}
const guChart = ref()
let guChartInstance:EChartsType
const timer = ref(0)
const initEchart = () => {
  if (guChartInstance) {
    guChartInstance.clear()
    guChartInstance.setOption(chartOption)
  } else if (guChart.value) {
    guChartInstance = init(guChart.value)
    guChartInstance.setOption(chartOption)
  }
  loading.value = false
}
const rsOb = new ResizeObserver((e => {
  if (timer.value) clearTimeout(timer.value)
  timer.value = window.setTimeout(() => {
    try {
      guChartInstance.resize()
    } catch (error) {
      console.warn(`chart重新设置大小失败,失败原因：${error}`)
    }
  }, 50)
}))
onMounted(() => {
  initEchart()
  rsOb.observe(guChart.value)
  window.addEventListener('hashchange', () => {
    let url = window.location.href
    if (url.includes('?')) {
      let urlStr = url.split('?')[1]
      const urlSearchParams = new URLSearchParams(urlStr)
      const query = Object.fromEntries(urlSearchParams.entries())
      handleUrl(query)
    }
  })
})

watch(option, () => {
  Object.assign(chartOption, option.value)
  initEchart()
}, { deep: true })

watch(route, () => {
  const { query } = route
  handleUrl(query)
}, { deep: true })

const handleUrl = (query:obj) => {
  const variableNames:any[] = [] 
  Object.keys(variable).forEach(key => {
    variableNames.push({
      realParamsName: key,
      alias: variable[key] || key,
    })
  })
  variableNames.forEach(params => {
    if (query[params.alias]) {
      if (req.method == 'get') {
        req.params[params.realParamsName] = query[params.alias]
      } else {
        req.data[params.realParamsName] = query[params.alias]
      }
    }
  })
  handleVar()
}
const handleVar = () => {
  loading.value = true
  axios({
    ...req,
  }).then(reqData => {
    const option = chartOption
    eval(handleDatajs.value)
    Object.assign(chartOption, option)
    initEchart()
  })
}
const emits = defineEmits([''])
</script>
<style scoped lang='scss'>
.gu-chart{
  width: 100%;
  height: 100%;
}
</style>