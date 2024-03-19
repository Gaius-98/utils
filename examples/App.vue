<template>
  <button
    v-for="item in ['click','dbClick','one']"
    :key="item"
    @click="onClick(item)"
  >
    {{ item }}
  </button>
  <div style="width:200px;height: 40vh;">
    <gu-dynamic-height-list
      :list="arr"
      :pre-height="30"
    ></gu-dynamic-height-list>
  </div>
</template>
<script setup lang="ts">
import GuDynamicHeightList from '../packages/components/GuDynamicHeightList.vue'
import { generateHash } from '../packages/functions/functions'
import { toRefs, ref, computed, onMounted } from 'vue'
import { Obj } from '../types/utilsType'

const arr = ref<Obj>([])
arr.value = new Array(40000).fill(0).map((e, idx) => ({
  label: 'item' + generateHash(Math.random() * 100),
  value: idx,
  key: idx,
}))

</script>

<style scoped lang="scss">

</style>
