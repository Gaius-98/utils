<template>
  <ul
    v-show="show"
    class="gu-contextmenu"
    :style="pointPosition"
  >
    <li
      v-for="item in list"
      :key="item.value"
      class="gu-contextmenu-item"
      @click="onContextmenu(item)"
    >
      <span
        v-if="item[menuRepalceFields.icon]"
        class="iconfont gu-menu-item-icon"
        :class="item[menuRepalceFields.icon]"
      >
      </span>
      <span class="gu-menu-item-label">{{ item[menuRepalceFields.label] }}</span>
    </li>
  </ul>
</template>

<script lang='ts' setup name="guContextMenuTemplate">
import { reactive, toRefs, ref, computed, CSSProperties, StyleValue } from 'vue'

export interface MenuReplaceFields {
    label?:string,
    value?:string,
    icon?:string,
}
export interface Props{
    list:any[],
    replaceFields?:MenuReplaceFields,
    left:number,
    top:number,
    show:boolean
}
const props = withDefaults(defineProps<Props>(), {
  list: () => ([]),
  replaceFields: () => ({
    label: 'label',
    value: 'value',
    icon: 'icon',
  }),
  left: 0,
  top: 0,
  show: false,
})
const { left, top, replaceFields, list, show } = toRefs(props)
const pointPosition = computed(():StyleValue => ({
  left: `${left.value}px`,
  top: `${top.value}px`,
}))
const defaultReplaceFields = ref({
  label: 'label',
  value: 'value',
  icon: 'icon',
})
const menuRepalceFields = computed(() => ({
  ...defaultReplaceFields.value,
  ...replaceFields.value,
}))
const emits = defineEmits(['onContextmenu'])
const onContextmenu = (data:any) => {
  emits('onContextmenu', data)
}
</script>
<style scoped lang='scss'>
.gu-contextmenu{
    position: fixed;
    background: #fff;
    .gu-contextmenu-item{
        border-bottom: 1px solid #ccc;
    }
}
</style>