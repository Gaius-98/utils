### GuDrageResize
拖拽改变dom位置及大小的组件
#### 使用
```
<gu-drag-resize @onDragResize="handleData">
  content
</gu-drag-resize>

methods:{
  handleData(data){
    console.log(data)
  }
}
```
#### props
属性|说明|默认值|类型|注释
--|----|--|--|----
nodeKey | 组件的key |  uuid() | number/string|
minh | 最小高度 | 10 | number|
minw | 最小高度 | 10 | number|
width | 宽度 | 100 |number|组件宽度
height | 高度 | 100 |number|组件高度
top | 顶部距离  | 0 |number|
left | 左侧距离 | 0 |number|
disabled|禁止拖拽和放大缩小|false|boolean/string|true,false 控制整个组件的拖拽或放大缩小,当你只需要禁用一个时，可通过传入：'drag'/'resize'来禁用某一项功能

#### events
函数名|描述
--|--
onDragResize|拖拽或设置大小后抛出的事件 包含当前组件的位置及大小信息及nodeKey
onDrag|设置位置时抛出的事件 包含当前组件的位置及大小信息及nodeKey
onResize|设置大小时抛出的事件 包含当前组件的位置及大小信息及nodeKey