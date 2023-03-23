### GuChart
生成chart图表的组件
#### 使用
1. insert-option的说明
2. 普通option的说明
   使用常规的echart配置即可
```
<gu-chart :insert-option="option">
</gu-chart>
```
#### props
属性|说明|默认值|类型|注释
--|----|--|--|----
insert-option|图表配置项|{}|object|[配置地址](https://gaius-98.github.io/scaling-dollop/#/home) 选择图表，最后选择组件可用配置
option|echart配置项|{}|object|使用常规的echart配置即可

#### 说明
上述两种配置二选一即可,此外insert-option可自动监听url变量，发送请求获取数据。option无此功能。
此组件会自动监听dom大小变更并触发resize事件。