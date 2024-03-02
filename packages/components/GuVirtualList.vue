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
        paddingTop:scrollTop + 'px',
        height:totalHeightPx
      }"
    >
      <li
        v-for="item in showList"
        :key="item[field.key]"
        class="gu-virtual-list-item"
        :class="active == item[field.value] ? 'active' :''"
        :style="{
          height:itemHeight + 'px'
        }"
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

<script lang='ts' setup name="GuVirtualList">
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
  itemHeight?:number,
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
  itemHeight: 25,
  list: () => ([]),
  replaceField: () => ({
    children: 'children',
    value: 'value',
    label: 'label',
    key: 'key',
  }),
})
const { itemHeight, list, replaceField: propField } = toRefs(props)
const totalHeightPx = computed(() => `${itemHeight.value * list.value.length - scrollTop.value}px`)

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
// 容器scrollTop
const scrollTop = ref(0)
const timer = ref(0)
const virtualList = ref()
const onScroll = () => {
  const { height } = guList.value.getBoundingClientRect()
  scrollTop.value = guList.value.scrollTop
  guList.value.style.paddingTop = scrollTop
  needShowLength.value = Math.floor(height / itemHeight.value)
  startIndex.value = Math.floor((scrollTop.value) / itemHeight.value)
  endIndex.value = Math.floor((startIndex.value + needShowLength.value + 2))
  if (endIndex.value >= list.value.length) {
    endIndex.value = list.value.length
    startIndex.value = endIndex.value - needShowLength.value + 2
  }
  showList.value = list.value.slice(startIndex.value, endIndex.value)
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
    padding: 0;
    margin: 0;
    .gu-virtual-list-item{
      list-style: none;
      cursor: pointer;
      padding: 2px 5px;
      &.active{
        background: rgba(24,144,255,.8);
        color: #fff;
      }
    }
  }
}
</style>