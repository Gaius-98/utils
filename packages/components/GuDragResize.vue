<template>
  <div
    ref="dragResize"
    class="drag-resize"
    :class="judgeDisabled(disabled, 'drag') ? 'disabled' : ''"
    @mousedown="onDrag">
    <div class="drag-resize-container">
      <div v-if="status" class="tip">
        {{ tip }}
      </div>
      <slot> </slot>
    </div>
    <div
      v-if="!judgeDisabled(disabled, 'resize')"
      ref="resizeNode"
      :class="judgeDisabled(disabled, 'resize') ? 'disabled' : ''"
      class="resize-node"
      @mousedown.stop="onResize"></div>
  </div>
</template>

<script lang="ts" setup>
import { toRefs, ref, onMounted, watch, computed, reactive } from "vue";
import { v4 as uuid } from "uuid";

export interface DragResizeProps {
  minh?: number;
  minw?: number;
  disabled?: boolean | string;
  width?: number;
  height?: number;
  top?: number;
  left?: number;
  nodeKey?: number | string;
}
type DragResizeData = Pick<
  Required<DragResizeProps>,
  "height" | "width" | "top" | "left" | "nodeKey"
>;
const props = withDefaults(defineProps<DragResizeProps>(), {
  nodeKey: () => uuid(),
  minh: 10,
  minw: 10,
  disabled: false,
  width: 100,
  height: 100,
  top: 0,
  left: 0,
});
const { nodeKey, minh, minw, disabled, height, width, left, top } =
  toRefs(props);
const dragResize = ref();
const status = ref<string | null>(null);
const emits = defineEmits(["onDragResize", "onDrag", "onResize"]);
const point = reactive({
  left: 0,
  top: 0,
  width: 0,
  height: 0,
});
const tip = computed(() => {
  const { left, top, width, height } = point;
  return status.value == "drag" ? `[${left},${top}]` : `${height}*${width}`;
});
const onDrag = (e: MouseEvent) => {
  if (!judgeDisabled(disabled.value, "drag")) {
    const parentDom = dragResize.value.parentElement;
    let oldPostion = parentDom.style.position;
    parentDom.style.position = "relative";
    let { left: curX, top: curY } = transformToValue();
    let disX =
      e.clientX - parseFloat(curX.toString()) || dragResize.value.offsetLeft;
    let disY =
      e.clientY - parseFloat(curY.toString()) || dragResize.value.offsetTop;
    e.preventDefault();
    // 边界设定
    document.onmousemove = function (e) {
      status.value = "drag";
      let x = e.clientX - disX;
      let y = e.clientY - disY;
      if (x < 0) {
        x = 0;
      } else if (x > parentDom.clientWidth - dragResize.value.clientWidth) {
        x = parentDom.clientWidth - dragResize.value.clientWidth;
      }
      if (y < 0) {
        y = 0;
      } else if (y > parentDom.clientHeight - dragResize.value.clientHeight) {
        y = parentDom.clientHeight - dragResize.value.clientHeight;
      }
      point.left = x;
      point.top = y;
      dragResize.value.style.transform = `translate3d(${x}px, ${y}px,0)`;
      emits("onDrag", {
        left: x,
        top: y,
        height: dragResize.value.style.height,
        width: dragResize.value.style.width,
        nodeKey: nodeKey.value,
      });
    };
    document.onmouseup = function () {
      document.onmousemove = null;
      document.onmouseup = null;
      parentDom.style.position = oldPostion;
      status.value = null;
      let { left, top } = transformToValue();
      emits("onDragResize", <DragResizeData>{
        left,
        top,
        height: dragResize.value.style.height,
        width: dragResize.value.style.width,
        nodeKey: nodeKey.value,
      });
    };
  } else {
    console.warn("拖拽功能已被禁用");
  }
};
const onResize = () => {
  if (!judgeDisabled(disabled.value, "resize")) {
    const parentDom = dragResize.value.parentElement;
    const event = window.event as MouseEvent;
    event?.stopPropagation();
    event?.preventDefault();
    const height = dragResize.value.clientHeight;
    const width = dragResize.value.clientWidth;
    const startX = event.clientX;
    const startY = event.clientY;
    const move = (moveEvent: MouseEvent) => {
      const currX = moveEvent.clientX;
      const currY = moveEvent.clientY;
      const disY = currY - startY;
      const disX = currX - startX;
      status.value = "resize";
      const newHeight =
        height + disY > minh.value
          ? height + disY > parentDom.clientHeight
            ? parentDom.clientHeight
            : height + disY
          : minh.value;
      const newWidth =
        width + disX > minw.value
          ? width + disX > parentDom.clientWidth
            ? parentDom.clientWidth
            : width + disX
          : minw.value;
      point.width = newWidth;
      point.height = newHeight;
      dragResize.value.style.width = newWidth + "px";
      dragResize.value.style.height = newHeight + "px";
      let { left, top } = transformToValue();
      emits("onResize", {
        left,
        top,
        height: dragResize.value.style.height,
        width: dragResize.value.style.width,
        nodeKey: nodeKey.value,
      });
    };

    const up = () => {
      document.removeEventListener("mousemove", move);
      document.removeEventListener("mouseup", up);
      let { left, top } = transformToValue();
      status.value = null;
      emits("onDragResize", {
        left,
        top,
        height: dragResize.value.style.height,
        width: dragResize.value.style.width,
        nodeKey: nodeKey.value,
      });
    };

    document.addEventListener("mousemove", move);
    document.addEventListener("mouseup", up);
  } else {
    console.warn("设置大小功能已被禁用");
  }
};
const transformToValue = (): { left: number; top: number } => {
  let reg = /(\d+px, \d+px)/;
  let [left, top]: [number, number] = dragResize.value.style.transform
    .match(reg)[0]
    .split(",");
  return {
    left,
    top,
  };
};
const judgeDisabled = (disabled: boolean | string, type: "drag" | "resize") => {
  if (typeof disabled == "boolean") {
    return disabled;
  }
  if (type == disabled) {
    return true;
  }
  return false;
};
const setPositonSize = () => {
  dragResize.value.parentElement.style.position = "relative";
  dragResize.value.style.height = height.value + "px";
  dragResize.value.style.width = width.value + "px";
  dragResize.value.style.transform = `translate3d(${left.value}px, ${top.value}px,0)`;
};
watch(
  () => [left.value, top.value, width.value, height.value],
  () => {
    setPositonSize();
  }
);
onMounted(() => {
  setPositonSize();
});
</script>
<style scoped lang="scss">
.drag-resize {
  position: absolute;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  padding: 10px;
  .drag-resize-container {
    width: 100%;
    height: 100%;
    z-index: 1;
    overflow: auto;
    .tip {
      position: absolute;
      top: -20px;
      left: 0;
      font-size: 12px;
    }
    &::-webkit-scrollbar {
      width: 5px;
      height: 5px;
    }

    /*滚动条的滑块*/
    &::-webkit-scrollbar-thumb {
      background-color: rgb(185, 221, 255);
      border-radius: 5px;
    }

    &::-webkit-scrollbar-thumb:hover {
      background: rgba(24, 144, 255, 0.8);
    }
  }
  &:active {
    background-color: rgba(119, 221, 178, 0.3);
    .resize-node {
      bottom: 0px;
      right: 0px;
      width: 20px;
      height: 20px;
      z-index: 999;
    }
  }
  &:hover {
    background-color: rgba(119, 221, 178, 0.3);
    cursor: move;
    .resize-node {
      display: block;
    }
  }
  .resize-node {
    display: none;
    box-sizing: border-box;
    position: absolute;
    bottom: 10px;
    right: 10px;
    width: 15px;
    height: 15px;
    border-bottom: 2px solid #000;
    border-right: 2px solid #000;
    transition-duration: 200ms;
    &:hover {
      bottom: 0px;
      right: 0px;
      width: 20px;
      height: 20px;
      cursor: nw-resize;
    }
  }
}
.disabled {
  cursor: not-allowed !important;
}
</style>
