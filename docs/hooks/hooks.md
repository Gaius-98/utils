### hooks
 hook要按需使用
#### 使用
```
import { useTest } from 'gaius-utils'
const { testData } = useTest
```
#### hooks 使用说明
1. useGuLocalStorage 在localstorage中存储基本对象，同时提供callback 用于监听对象变化
  参数|类型|默认值|说明
   --|--|--|----
   initObj|Object|-|初始化的对象,会存入到localstorage中
   callback|Function|-|对象树形发生变化的回调
   opt|Object|{ namePreix:'Gaius' }|存储的名称前缀
``` js
import {useGuLocalStorage} from 'gaius-utils'
const testData = useGuLocalStorage({},({key,oldValue,newValue}:{key:string,oldValue:any,newValue:any})=>{
    //do someting
    console.log(key,oldValue,newValue)
})
testData.name = 'test'
```
