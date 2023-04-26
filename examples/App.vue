<script setup lang="ts">
import { scrollToDom } from '../packages/index'
import option from './chart.json'
import { ref } from 'vue'

const testFunc = () => {
  scrollToDom(
    document.querySelector('.listval5') as Element,
    document.querySelector('.test') as Element,
  )
}
const arr = ref<any[]>([])
arr.value = new Array(20000).fill(1).map((item, idx) => ({
  label: 'label' + idx,
  value: 'val' + idx,
  key: 'key' + idx,
}))

</script>

<template>
  <div
    v-copy="'test'"
    style="width:400px;height:200px;border:1px solid #ccc"
    @click="testFunc"
  >
    <gu-drag-resize>
      <gu-chart :insert-option="option">
      </gu-chart>
    </gu-drag-resize>
  </div>
  <gu-virtual-list
    :list="arr"
    style="height:240px"
    :item-height="20"
    class="test"
  >
    <template #content="scope">
      <div :class="'list'+scope.item.value">
        {{ scope.item.label + '('+scope.item.value+')' }}
      </div>
    </template>
  </gu-virtual-list>
  <img
    v-lazy-img="'https://img0.baidu.com/it/u=697903734,1544489081&fm=253&app=138&size=w931&n=0&f=JPEG&fmt=auto?sec=1682614800&t=2dde78ba9fc700c509d3e0f24419ca45'"
    alt=""
  >
  <div style="height:400px;width:400px">
    <img
      v-lazy-img="'https://img0.baidu.com/it/u=697903734,1544489081&fm=253&app=138&size=w931&n=0&f=JPEG&fmt=auto?sec=1682614800&t=2dde78ba9fc700c509d3e0f24419ca45'"
      alt=""
    >
  </div>
  <div style="height:400px;width:400px">
    <img
      v-lazy-img="'https://img0.baidu.com/it/u=697903734,1544489081&fm=253&app=138&size=w931&n=0&f=JPEG&fmt=auto?sec=1682614800&t=2dde78ba9fc700c509d3e0f24419ca45'"
      alt=""
    >
  </div>
  <div style="height:400px;width:400px">
    <img
      v-lazy-img="'https://img0.baidu.com/it/u=697903734,1544489081&fm=253&app=138&size=w931&n=0&f=JPEG&fmt=auto?sec=1682614800&t=2dde78ba9fc700c509d3e0f24419ca45'"
      alt=""
    >
  </div>
  <div style="height:400px;width:400px">
    <img
      v-lazy-img="'https://t13.baidu.com/it/u=1084184136,781431096&fm=224&app=112&size=w931&n=0&f=JPEG&fmt=auto?sec=1682614800&t=41d07e09573e7ea98dca21d53348e366'"
      alt=""
    >
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
