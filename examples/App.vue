<template>
  <input
    v-model="observer.test"
    type="text"
  >
  {{ observer.test }}
  <button @click="observer.test ++">
    +++
  </button>
</template>
<script setup lang="ts">

import { observer } from './index'

</script>

<style scoped lang="scss">

.parent{
  position: relative;
  width: 100%;
  height: 400px;
  overflow-y: auto;
  .child1{
    position: absolute;
    top:500px;
    left: 400px;
    width: 1400px;
    height: 1400px;
    overflow: auto;
    background: #000;
    .child11{
      position: absolute;
      top:600px;
      left: 500px;
      width: 400px;
      height: 400px;
      background: #fff;
    }
  }
  // .child{
  //   position: absolute;
  //   top:1500px;
  //   left: 2400px;
  //   width: 400px;
  //   height: 400px;
  //   background: #000;
  // }
}
</style>
