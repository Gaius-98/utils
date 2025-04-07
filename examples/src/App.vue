<template>
  <GuDragResize> </GuDragResize>
  <GuVirtualList></GuVirtualList>
</template>
<script setup lang="ts">
  import {
    useGuDialog,
    GuDragResize,
    GuPubSub,
    GuVirtualList,
  } from "@utils/packages";
  console.log(GuPubSub);
</script>

<style scoped lang="scss"></style>
