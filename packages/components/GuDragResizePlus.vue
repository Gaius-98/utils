<template>
  <div
    ref="guDragResizePlusRef"
    class="gu-drag-resize-plus active"
    @mousedown.stop="onDrag">
    <div class="container">
      <slot></slot>
    </div>
    <div
      v-for="point in points"
      :key="point.name"
      class="resize-point"
      :class="point.name"
      @mousedown.stop="onResize($event, point)"></div>
  </div>
</template>

<script lang="ts" setup>
import { reactive, toRefs, ref, onMounted } from "vue";
import { v4 as uuid } from "uuid";

export interface DragResizeProps {
  minh?: number;
  minw?: number;
  disabled?: boolean;
  width?: number;
  height?: number;
  top?: number;
  left?: number;
  nodeKey?: number | string;
  scaleX: number;
  scaleY: number;
}
export interface ResizePoint {
  name: string;
  direction: "t" | "l" | "b" | "r";
}
export interface DragResizeNodeInfo {
  width: number;
  height: number;
  left: number;
  top: number;
}
const guDragResizePlusRef = ref<HTMLElement | null>(null);
const props = withDefaults(defineProps<DragResizeProps>(), {
  nodeKey: uuid(),
  minh: 10,
  minw: 10,
  disabled: false,
  width: 100,
  height: 100,
  top: 0,
  left: 0,
  scaleX: 1,
  scaleY: 1,
});
const points = ref<ResizePoint[]>([
  {
    name: "top-point",
    direction: "t",
  },
  {
    name: "left-point",
    direction: "l",
  },
  {
    name: "bottom-point",
    direction: "b",
  },
  {
    name: "right-point",
    direction: "r",
  },
]);

const {
  nodeKey,
  minh,
  minw,
  disabled,
  height,
  width,
  left,
  top,
  scaleX,
  scaleY,
} = toRefs(props);
const onResize = (event: MouseEvent, point: ResizePoint) => {
  const { direction } = point;
  const startX = event.x;
  const startY = event.y;
  const { top, left, width, height } = getTransformValue(
    guDragResizePlusRef.value!
  );
  const move = (event: MouseEvent) => {
    const lastInfo = {
      width,
      top,
      left,
      height,
    };
    const diffY = event.y - startY;
    const diffX = event.x - startX;
    switch (direction) {
      case "t":
        lastInfo.height = height - diffY;
        lastInfo.top = top + diffY;
        break;
      case "l":
        lastInfo.width = width - diffX;
        lastInfo.left = left + diffX;
        break;
      case "b":
        lastInfo.height = height + diffY;
        break;
      case "r":
        lastInfo.width = width + diffX;
        break;
    }
    onUpdate(lastInfo);
  };
  const up = () => {
    document.removeEventListener("mousemove", move);
    document.removeEventListener("mouseup", up);
  };
  document.addEventListener("mousemove", move);
  document.addEventListener("mouseup", up);
};
const onDrag = (event: MouseEvent) => {
  const startX = event.x;
  const startY = event.y;
  const { top, left, width, height } = getTransformValue(
    guDragResizePlusRef.value!
  );
  const move = (event: MouseEvent) => {
    const lastInfo = {
      width,
      top,
      left,
      height,
    };
    const diffY = (event.y - startY) / scaleY.value;
    const diffX = (event.x - startX) / scaleX.value;
    lastInfo.left = left + diffX;
    lastInfo.top = top + diffY;
    onUpdate(lastInfo);
  };
  const up = () => {
    document.removeEventListener("mousemove", move);
    document.removeEventListener("mouseup", up);
  };
  document.addEventListener("mousemove", move);
  document.addEventListener("mouseup", up);
};
const getTransformValue = (
  dom: HTMLElement
): { left: number; top: number; width: number; height: number } => {
  let reg = /(\d+px, \d+px)/;
  const transformString = dom.style.transform;
  let left = "0",
    top = "0";
  if (transformString) {
    [left, top] = transformString.match(reg)![0].split(",");
  }
  return {
    left: parseFloat(left),
    top: parseFloat(top),
    width: parseFloat(dom.style.width),
    height: parseFloat(dom.style.height),
  };
};
const onUpdate = (info: DragResizeNodeInfo) => {
  const { top, left, width, height } = info;
  if (guDragResizePlusRef.value) {
    const lastTransform = guDragResizePlusRef.value.style.transform;
    guDragResizePlusRef.value.style.width = `${width.toFixed(2)}px`;
    guDragResizePlusRef.value.style.height = `${height.toFixed(2)}px`;
    guDragResizePlusRef.value.style.transform = `${removeTransform(
      lastTransform
    )} translate3d(${left.toFixed(2)}px, ${top.toFixed(2)}px,0)`;
  }
};
const removeTransform = (cssString: string) => {
  if (cssString) {
    return cssString.replace(/^translate3d\([^)]+\)$/, "");
  }
  return "";
};

onMounted(() => {
  onUpdate({
    width: width.value,
    height: height.value,
    left: left.value,
    top: top.value,
  });
});
</script>
<style scoped lang="scss">
.gu-drag-resize-plus {
  position: absolute;
  width: 200px;
  height: 200px;
  .container {
    position: relative;
    width: 100%;
    height: 100%;
  }
  &.active {
    .container {
      border: 1px dashed #ccc;
    }
    .resize-point {
      display: block;
    }
  }
  .resize-point {
    display: none;
    position: absolute;
    width: 6px;
    height: 6px;
    background-color: #fff;
    border: 1px solid #ccc;
    &.top-point {
      top: 0;
      left: 50%;
      transform: translate(-50%, -50%);
      cursor: ns-resize;
    }
    &.left-point {
      top: 50%;
      left: 0;
      transform: translate(-50%, -50%);
      cursor: ew-resize;
    }
    &.bottom-point {
      bottom: 0;
      left: 50%;
      transform: translate(-50%, 50%);
      cursor: ns-resize;
    }
    &.right-point {
      top: 50%;
      right: 0;
      transform: translate(50%, -50%);
      cursor: ew-resize;
    }
  }
}
</style>
