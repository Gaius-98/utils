<template>
  <div ref="guList" class="gu-list" @scroll="onScroll">
    <ul
      ref="virtualList"
      class="gu-virtual-list"
      :style="{
        paddingTop: paddingTop + 'px',
        height: ListHeight + 'px',
      }">
      <li
        v-for="item in showList"
        :key="item[field.key]"
        class="gu-virtual-list-item"
        :class="active == item[field.value] ? 'active' : ''"
        :style="{
          height: itemHeight + 'px',
        }"
        @click="onClick(item)">
        <slot name="content" :item="item">
          {{ item[field.label] }}
        </slot>
      </li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
import { toRefs, ref, computed, onMounted } from "vue";

export type ReplaceFieldType = {
  children?: string;
  value?: string;
  label?: string;
  key?: string;
  [field: string]: any;
};
interface VirtualProps {
  itemHeight?: number;
  list: Record<string, any>[];
  replaceField?: ReplaceFieldType;
}
const defaultField = {
  children: "children",
  value: "value",
  label: "label",
  key: "key",
};
const props = withDefaults(defineProps<VirtualProps>(), {
  itemHeight: 25,
  list: () => [],
  replaceField: () => ({
    children: "children",
    value: "value",
    label: "label",
    key: "key",
  }),
});
const { itemHeight, list, replaceField: propField } = toRefs(props);
const ListHeight = computed(
  () => itemHeight.value * list.value.length - paddingTop.value
);

const field = computed(() => ({
  ...defaultField,
  ...propField.value,
}));

const active = ref("");
const emits = defineEmits(["onClickItem"]);
const onClick = (item: Record<string, any>) => {
  active.value = item[field.value.value];
  emits("onClickItem", item);
};
// 展示列表data
const showList = ref<Record<string, any>[]>([]);
const guList = ref();
// 裁剪数组开始项
const startIndex = ref(0);
// 裁剪数组结束项
const endIndex = ref(0);
// 计算需要展示的元素个数
const needShowLength = ref(0);
// 容器的paddingTop随动
const paddingTop = ref(0);
const timer = ref(0);
const virtualList = ref();
const onScroll = () => {
  const { height } = guList.value.getBoundingClientRect();
  paddingTop.value = guList.value.scrollTop;
  guList.value.style.paddingTop = paddingTop.value;
  needShowLength.value = Math.ceil(height / itemHeight.value);
  startIndex.value = Math.floor(paddingTop.value / itemHeight.value);
  endIndex.value = startIndex.value + needShowLength.value;
  if (endIndex.value >= list.value.length) {
    endIndex.value = list.value.length;
    guList.value.scrollTop = itemHeight.value * list.value.length - height;
    let diff = needShowLength.value * itemHeight.value - height;
    paddingTop.value = itemHeight.value * list.value.length - height - diff;
    startIndex.value = endIndex.value - needShowLength.value;
  }
  showList.value = list.value.slice(startIndex.value, endIndex.value);
};

const rsOb = new ResizeObserver(() => {
  if (timer.value) clearTimeout(timer.value);
  timer.value = window.setTimeout(() => {
    onScroll();
  }, 50);
});
onMounted(() => {
  onScroll();
  rsOb.observe(guList.value);
});
</script>
<style scoped lang="scss">
.gu-list {
  width: 100%;
  height: 100%;
  overflow-y: auto;
  .gu-virtual-list {
    padding: 0;
    margin: 0;
    .gu-virtual-list-item {
      list-style: none;
      cursor: pointer;
      padding: 0px 5px;
      &.active {
        background: rgba(24, 144, 255, 0.8);
        color: #fff;
      }
    }
  }
}
</style>
