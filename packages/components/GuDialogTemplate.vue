<template>
  <div class="gu-mask">
    <div
      class="gu-dialog"
      :class="size"
      :style="{
        width:`${width}px`,
        height:`${height}px`
      }"
    >
      <header class="gu-header">
        <div class="title">
          {{ title }}
        </div>
        <div
          class="close"
          @click="cancel"
        >
          X
        </div>
      </header>
      <div class="content">
        <component
          :is="content"
          v-bind="componentProps"
          ref="contentCompontent"
        ></component>
      </div>
      <div
        v-if="footer"
        class="footer"
      >
        <div class="button-group">
          <div
            class="button primary"
            @click="confirm"
          >
            确认
          </div>     
          <div
            class="button"
            @click="cancel"
          >
            取消
          </div> 
        </div>
      </div>
    </div>
  </div>
</template>

<script lang='ts' setup name="GuDialogTemplate">
import { toRefs, ref } from 'vue'
import type { Component } from 'vue'

enum SizeType{
    small='small',
    default='default',
    large='large'
  }
export interface GuDialogType {
    title:string,
    size?:keyof typeof SizeType,
    width?:number|undefined,
    height?:number|undefined,
    footer?:boolean,
    content:Component,
    componentProps:any,
  }
interface DialogType extends GuDialogType{
    onConfirm:Function,
    onCancel:Function
}
const props = withDefaults(defineProps<DialogType>(), {
  title: '默认',
  size: 'default',
  footer: true,
  width: undefined,
  height: undefined,
  componentProps: () => ({}),
})
const { title, content, footer, size, height, width, onConfirm, onCancel } = toRefs(props)
const contentCompontent = ref()
const emits = defineEmits([])
const confirm = () => {
  onConfirm.value(contentCompontent.value)
}
const cancel = () => {
  onCancel.value(contentCompontent.value)
}
</script>
<style scoped lang='scss'>
.gu-mask{
  position: fixed;
  top:0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 999;
  background: rgba($color: #000000, $alpha: .3);
}
.gu-dialog{

  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
  background: #fff;
  border-radius: 2px;
  box-shadow: 0 1px 3px rgba(0,0,0,.3);
  z-index: 9999;
  &.default{
    width: 800px;
    height: 600px;
  }
  &.large{
    width:1600px;
    height:800px
  }
  &.small{
    width:400px;
    height:150px
  }
  
  .gu-header{
    width: calc(100% - 20px);
    padding: 10px;
    display: flex;
    justify-content: space-between;
    .title{

    }
    .close{
      font-size: 16px;
      width: 16px;
      color: #333;
      cursor: pointer;
    }
  }
  .content{
    width: calc(100% - 80px);
    height: calc(100% - 80px);
    overflow: auto;
    margin: 0 auto;
  }
  .footer{
    display: flex;
    flex-direction: row-reverse;
    margin-top: 5px;
    .button-group{
      display: flex;
      .button {
        margin-right: 10px;
        padding: 5px 15px;
        font-size: 14px;
        cursor: pointer;
        box-shadow: 0 1px 3px rgba(0,0,0,.3);
        &.primary{
          background: #409eff;
          color: #fff;
        }
      }

    }
  }
}
</style>