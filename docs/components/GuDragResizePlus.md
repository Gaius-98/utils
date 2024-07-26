### GuDrageResizePlus
相比于GuDragResize，GuDragResizePlus支持多个方向的拖拽，适用性更广
拖拽改变dom位置及大小的组件
#### 使用
```
<gu-drag-resize-plus @update="handleData">
  content
</gu-drag-resize-plus>

methods:{
  handleData(data){
    console.log(data)
  }
}
```
#### props
| 属性名      | 描述               | 默认值 | 类型|
| ---------- | ------------------ |--------|-----|
| nodeKey  | 组件的key          | uuid() | number/string  
| minh     | 最小高度           | 10     | number         
| minw     | 最小高度           | 10     | number         
| width    | 宽度               | 100    | number                                                                                             
| height   | 高度               | 100    | number                                                                                                  
| top      | 顶部距离           | 0      | number         
| left     | 左侧距离           | 0      | number         
| disabled | 禁止拖拽和放大缩小 | false  | boolean 
| scaleX | 容器横向缩放比例 | 1  | number 
| scaleY | 容器纵向缩放比例 | 1  | number 
| wait | 延迟拖拽时间 | 10  | number

#### events
| 函数名       | 描述                                                             |
| ------------ | ---------------------------------------------------------------- |
| beforeTransform | 在拖拽更新前抛出的事件 包含当前组件的原始位置、大小信息 |
| update | 更新节点的大小和位置后抛出的事件 包含当前组件的位置及大小信息及nodeKey |