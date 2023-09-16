### GuResObserver
初始化obj生成一个observer。用于监听obj的属性变化。
#### 使用
```
import { GuResObserver } from 'gaius-utils'
// 生成一个dialog实例
const ob = new GuResObserver({
    test1:0,
    test2:1
})
ob.setWatchItem('test1',({newValue,oldValue})=>{
    console.log('test1变更啦!',newValue,oldValue)
})
ob.obj.test1++

```
#### props
属性|说明|默认值|类型|注释
--|----|--|--|----
obj|监听对象|-|Object
#### ovserver实例的属性
属性名|说明
obj|通过更改实例上的此属性实现监听
observer|发布者上存储的订阅名称及对应的方法
#### observer实例的函数
函数名|说明
--|----
ob.setWatchItem(key,callback,defaultValue)| 开始监听对象的属性名，当发生变化后执行callback
ob.removeItem(key,callback)|移除某个属性的监听

