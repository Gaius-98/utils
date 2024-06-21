<template>
  <button
    v-for="item in ['click', 'dbClick', 'one']"
    :key="item"
    @click="onClick(item)">
    {{ item }}
  </button>
  <div style="width: 200px; height: 40vh">
    <gu-dynamic-height-list
      :list="arr"
      :pre-height="30"></gu-dynamic-height-list>
  </div>
  <div class="container">
    <gu-drag-resize-plus :top="200" :left="100" :scale-x="0.8" :scale-y="0.9">
      test
    </gu-drag-resize-plus>
  </div>
</template>
<script setup lang="ts">
import GuDynamicHeightList from "../packages/components/GuDynamicHeightList.vue";
import GuDragResize from "../packages/components/GuDragResize.vue";
import GuDragResizePlus from "../packages/components/GuDragResizePlus.vue";
import { generateHash } from "../packages/functions/functions";
import { toRefs, ref, computed, onMounted } from "vue";
import { Obj } from "../types/utilsType";

const arr = ref<Obj>([]);
arr.value = new Array(40000).fill(0).map((e, idx) => ({
  label: "item" + generateHash(Math.random() * 100),
  value: idx,
  key: idx,
}));
const dragArr = ref<Obj[]>([
  {
    key: "123",
  },
  {
    key: "456",
  },
]);
</script>

<style scoped lang="scss">
.container {
  margin-top: 15px;
  width: 800px;
  height: 400px;
  background-color: #000;
  transform: scale(0.8, 0.9);
}
</style>
