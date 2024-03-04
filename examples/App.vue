<template>
  <div style="width:200px;height: 40vh;">
    <gu-virtual-list :list="arr"></gu-virtual-list>
  </div>
</template>
<script setup lang="ts">
import GuVirtualList from '../packages/components/GuVirtualList.vue'

const arr = new Array(400).fill(0).map((e, idx) => ({
  label: 'item' + idx,
  value: idx,
  key: idx,
}))
</script>

<style scoped lang="scss">

</style>
