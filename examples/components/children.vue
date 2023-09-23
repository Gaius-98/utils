<template>
  {{ test.value }}
</template>

<script lang='ts' setup>
import { reactive, toRefs, ref } from 'vue'
import { watchItem } from '../index'

const test = ref({
  value: 1,
})
watchItem('test', ({ newValue, oldValue }) => {
  test.value.value = newValue
})
</script>
<style scoped lang='scss'>
</style>