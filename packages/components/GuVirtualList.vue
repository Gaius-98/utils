<template>
  <div
    ref="guList"
    class="gu-list"
    @scroll="onScroll"
  >
    <ul
      ref="virtualList" 
      class="gu-virtual-list"
    >
      <li
        v-for="item in showList"
        :key="item[field.key]"
        class="gu-virtual-list-item"
        :class="active == item[field.value] ? 'active' :''"
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
import { vList, replaceField } from '../../types/virtualList'
import { obj } from '../../types/common'

interface Props {
  itemHeight:number,
  list:vList,
  replaceField:replaceField
}
const defaultField = {
  children: 'children',
  value: 'value',
  label: 'label',
  key: 'key',
}
const props = withDefaults(defineProps<Props>(), {
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
const itemHeightPx = computed(() => `${itemHeight.value}px`)
const totalHeightPx = computed(() => `${
  itemHeight.value * (list.value.length - needShowLength.value) 
  - scrollTop.value}px`)
const paddingTopPx = computed(() => `${scrollTop.value}px`)

const field = computed(() => ({
  ...defaultField,
  ...propField.value,
}))

const active = ref('')
const emits = defineEmits(['onClickItem'])
const onClick = (item:obj) => {
  active.value = item[field.value.value]
  emits('onClickItem', item)
}
// 展示列表data
const showList = ref<obj[]>([])
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
    height:v-bind(totalHeightPx);
    padding: 0;
    padding-top:v-bind(paddingTopPx);
    margin: 0;
    .gu-virtual-list-item{
      height:v-bind(itemHeightPx) ;
      list-style: none;
      &.active{
        background: rgba($color: #ccc, $alpha: .5);
      }
    }
  }
}
</style>