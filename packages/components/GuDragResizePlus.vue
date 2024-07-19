<template>
  <div
    ref="guDragResizePlusRef"
    class="gu-drag-resize-plus"
    :class="{
      disabled: disabled,
      active: active,
    }"
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
import { toRefs, ref, onMounted } from "vue";
import { v4 as uuid } from "uuid";
import { throttle } from "../utils";

export interface DragResizeProps {
  minh?: number;
  minw?: number;
  disabled?: boolean;
  width?: number;
  height?: number;
  top?: number;
  left?: number;
  nodeKey?: number | string;
  active?: boolean;
  wait?: number;
  scaleX?: number;
  scaleY?: number;
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
  active: true,
  wait: 10,
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
  wait,
  scaleX,
  scaleY,
} = toRefs(props);
const onResize = (event: MouseEvent, point: ResizePoint) => {
  if (disabled.value) {
    return;
  }
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
    const diffY = (event.y - startY) / scaleY.value;
    const diffX = (event.x - startX) / scaleX.value;
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
    throttleUpdate(lastInfo);
  };
  const up = () => {
    document.removeEventListener("mousemove", move);
    document.removeEventListener("mouseup", up);
  };

  document.addEventListener("mousemove", move);
  document.addEventListener("mouseup", up);
};
const onDrag = (event: MouseEvent) => {
  if (disabled.value) {
    return;
  }
  const startX = event.x;
  const startY = event.y;
  const pWidth = guDragResizePlusRef.value!.parentElement!.offsetWidth;
  const pHeight = guDragResizePlusRef.value!.parentElement!.offsetHeight;
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

    if (left + diffX + width > pWidth) {
      lastInfo.left = pWidth - width;
    } else {
      lastInfo.left = left + diffX;
    }
    if (top + diffY + height > pHeight) {
      lastInfo.top = pHeight - height;
    } else {
      lastInfo.top = top + diffY;
    }

    throttleUpdate(lastInfo);
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
const emit = defineEmits(["update"]);
const onUpdateNode = (info: DragResizeNodeInfo) => {
  const { top, left, width, height } = handleBoundaries(info);
  if (guDragResizePlusRef.value) {
    const lastTransform = guDragResizePlusRef.value.style.transform;
    guDragResizePlusRef.value.style.width = `${width.toFixed(2)}px`;
    guDragResizePlusRef.value.style.height = `${height.toFixed(2)}px`;
    guDragResizePlusRef.value.style.transform = `${removeTransform(
      lastTransform
    )} translate3d(${left.toFixed(2)}px, ${top.toFixed(2)}px,0)`;
    emit("update", {
      top: top.toFixed(2),
      left: left.toFixed(2),
      width: width.toFixed(2),
      height: height.toFixed(2),
      nodeKey: nodeKey.value,
    });
  }
};
const throttleUpdate = throttle(onUpdateNode, wait.value);

const removeTransform = (cssString: string) => {
  if (cssString) {
    return cssString.replace(/^translate3d\([^)]+\)$/, "");
  }
  return "";
};
const handleBoundaries = (info: DragResizeNodeInfo) => {
  const { height, width, left, top } = info;
  const parentDom = guDragResizePlusRef.value!.parentElement!;
  const pHeight = parentDom.offsetHeight;
  const pWidth = parentDom.offsetWidth;
  if (height < minh.value) {
    info.height = minh.value;
  } else if (height > pHeight) {
    info.height = pHeight;
  }
  if (width < minw.value) {
    info.width = minw.value;
  } else if (width > pWidth) {
    info.width = pWidth;
  }
  if (left < 0) {
    info.left = 0;
  } else if (left + width > pWidth) {
    info.width = pWidth - left;
  }
  if (top < 0) {
    info.top = 0;
  } else if (top + height > pHeight) {
    info.height = pHeight - top;
  }
  return info;
};
onMounted(() => {
  onUpdateNode({
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
  cursor: move;
  .container {
    position: relative;
    width: 100%;
    height: 100%;
    user-select: none;
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
  &.disabled {
    cursor: default;
  }
}
</style>
