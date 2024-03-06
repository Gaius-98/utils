<template>
  <div style="width:200px;height: 40vh;">
    <gu-test-list :list="arr"></gu-test-list>
  </div>
</template>
<script setup lang="ts">
import GuTestList from '../packages/components/GuTestList.vue'
import { generateHash } from '../packages/functions/functions'

const arr = new Array(40000).fill(0).map((e, idx) => ({
  label: 'item' + generateHash(Math.random() * 100),
  value: idx,
  key: idx,
}))
</script>

<style scoped lang="scss">

</style>
