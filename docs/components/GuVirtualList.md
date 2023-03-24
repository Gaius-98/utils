### GuVirtualList
虚拟列表组件
#### 使用
```
<gu-virtual-list
  :list="arr"
  style="height:240px"
  :item-height="40"
>
  <template #content="scope">
    <div>
      {{ scope.item.label + '('+scope.item.value+')' }}
    </div>
  </template>
</gu-virtual-list>
```
#### props
属性|说明|默认值|类型|注释
--|----|--|--|----
list|数据源|[]|Array|需要展示的列表数据
itemHeight|项高|25|number|列表展示的item的高度
replaceField|替换字段|{
    children: 'children',
    value: 'value',
    label: 'label',
    key: 'key',
  }|object|根据数据来调整的替换字段
#### events
函数名|描述
--|--
onClickItem|点击某一项后将点击项抛出

