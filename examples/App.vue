<template>
  <div style="width:200px;height: 600px;">
    <gu-virtual-list :list="arr"></gu-virtual-list>
  </div>
</template>
<script setup lang="ts">
const arr = new Array(20000).fill(0).map((e, idx) => ({
  label: 'item' + idx,
  value: idx,
  key: idx,
}))
</script>

<style scoped lang="scss">

</style>
