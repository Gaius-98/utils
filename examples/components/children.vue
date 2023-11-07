<template>
  {{ text }}
</template>

<script lang='ts' setup>
import { reactive, toRefs, ref } from 'vue'

export interface Props {
  text:String
}
const props = withDefaults(defineProps<Props>(), {
  text: 1,
})
const { text } = toRefs(props)
</script>
<style scoped lang='scss'>
</style>