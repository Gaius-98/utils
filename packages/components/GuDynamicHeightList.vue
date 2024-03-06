<template>
  <div
    ref="guList"
    class="gu-list"
    @scroll="onScroll"
  >
    <ul
      ref="virtualList" 
      class="gu-virtual-list"
      :style="{
        height:ListHeight + 'px'
      }"
    >
      <li
        v-for="(item,idx) in showList"
        :key="item[field.key]"
        class="gu-virtual-list-item"
        :class="[active == item[field.value] ? 'active' :'']"
        :style="{
          top:`${ reduceHeight(startIndex+idx) }px`
        }"
        :idx="idx"
        :startIdx="startIndex"
        @click="onClick(item)"
      >
        <slot
          name="content"
          :item="item"
        >
          {{ item[field.label] }}
        </slot>
      </li>
    </ul>
  </div>
</template>
  
<script lang='ts' setup name="GuDynamicHeightList">
import { toRefs, ref, computed, onMounted } from 'vue'
import { Obj } from '../../types/utilsType'
  
export type ReplaceFieldType = {
  children?:string,
  value?:string,
  label?:string,
  key?:string,
  [field:string]:any
} 
interface VirtualProps {
  preHeight?:number,
  list:Obj[],
  replaceField?: ReplaceFieldType
}
const defaultField = {
  children: 'children',
  value: 'value',
  label: 'label',
  key: 'key',
}
const props = withDefaults(defineProps<VirtualProps>(), {
  preHeight: 26,
  list: () => ([]),
  replaceField: () => ({
    children: 'children',
    value: 'value',
    label: 'label',
    key: 'key',
  }),
})
const { list, replaceField: propField, preHeight } = toRefs(props)
// 所有项的真实高度
const allHeightList = ref<number[]>([])
const knownHeight = computed(() => allHeightList.value.reduce((p, c) => {
  p += c
  return p
}, 0))
// 总高度
const ListHeight = computed(() => {
  let idx = allHeightList.value.length
  return knownHeight.value + (list.value.length - idx) * preHeight.value
})
  
const field = computed(() => ({
  ...defaultField,
  ...propField.value,
}))
  
const active = ref('')
const emits = defineEmits(['onClickItem'])
const onClick = (item:Obj) => {
  active.value = item[field.value.value]
  emits('onClickItem', item)
}
// 展示列表data
const showList = ref<Obj[]>([])
const guList = ref()
// 裁剪数组开始项
const startIndex = ref(0)
// 裁剪数组结束项
const endIndex = ref(0)
// 计算需要展示的元素个数
const needShowLength = ref(0)
const timer = ref(0)
const virtualList = ref()
const scrollTop = ref(0)
const onScroll = () => {
  setAllHeight()
  const { height } = guList.value.getBoundingClientRect()
  scrollTop.value = guList.value.scrollTop
  if (scrollTop.value + height > knownHeight.value) {
    startIndex.value = allHeightList.value.length
    needShowLength.value = Math.ceil(height / preHeight.value)
    endIndex.value = startIndex.value + needShowLength.value
  } else {
    let i = 0
    let res = 0
    while (res <= scrollTop.value) {
      res += allHeightList.value[i]
      i++
    }
    startIndex.value = i - 1
    if (knownHeight.value - res >= height) {
      while (res <= scrollTop.value + height) {
        res += allHeightList.value[i]
        i++
      }
      endIndex.value = i
    } else {
      let defineLen = allHeightList.value.length - startIndex.value
      endIndex.value = defineLen + Math.ceil(height - (knownHeight.value - res) / preHeight.value)
    }
  }
  showList.value = list.value.slice(startIndex.value, endIndex.value)
}
const setAllHeight = () => {
  let nodes = document.querySelectorAll('.gu-virtual-list-item')
  for (let i = 0; i < nodes.length; i++) {
    let node = nodes[i]
    let idx = startIndex.value + Number(node.getAttribute('idx'))
    if (idx > allHeightList.value.length - 1) {
      allHeightList.value[idx] = node.clientHeight
    }
  }
}
const reduceHeight = (idx:number) => {
  if (allHeightList.value.length > idx) {
    return allHeightList.value.slice(0, idx).reduce((p, c) => {
      p += c
      return p
    }, 0)
  }
  return knownHeight.value + (idx - allHeightList.value.length) * preHeight.value
}
const rsOb = new ResizeObserver((() => {
  if (timer.value) clearTimeout(timer.value)
  timer.value = window.setTimeout(() => {
    onScroll()
  }, 50)
}))
onMounted(() => {
  onScroll()
  rsOb.observe(guList.value)
})
</script>
<style scoped lang='scss'>
.gu-list{
  width: 100%;
  height: 100%;
  overflow-y:auto ;
  .gu-virtual-list{
    position: relative;
    padding: 0;
    margin: 0;
    .gu-virtual-list-item{
      position: absolute;
      list-style: none;
      cursor: pointer;
      padding: 0px 5px;
      word-break:break-all;
      left:0;
      &.active{
        background: rgba(24,144,255,.8);
        color: #fff;
      }
    }
  }
}
</style>
