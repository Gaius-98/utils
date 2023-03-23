<script setup lang="ts">
import { scrollToDom } from '../packages/index'
import option from './chart.json'

const testFunc = () => {
  scrollToDom(
    document.querySelector('.child11') as Element,
    document.querySelector('.parent') as Element,
  )
}
const testSc = () => {
  scrollToDom(document.querySelector('.child11') as Element)
}
</script>

<template>
  <div
    v-copy:dblclick="'test'"
    style="width:400px;height:200px;border:1px solid #ccc"
    @click="testFunc"
  >
    <gu-drag-resize>
      <gu-chart :insert-option="option">
      </gu-chart>
    </gu-drag-resize>
  </div>
</template>

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
