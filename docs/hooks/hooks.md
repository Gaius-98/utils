### hooks
 hook要按需使用
#### 使用
```
import { useTest } from 'gaius-utils'
const { testData } = useTest
```
#### hooks 使用说明
1. useGuLocalStorage 便于操作localstorage,调用实例的setItem 会触发对应的事件监听
  参数|类型|默认值|说明
   --|--|--|----
   opt|Object|{ destroyAfterClear:true }| 配置项

#####example:
``` js
import {useGuLocalStorage} from 'gaius-utils'
const local = useGuLocalStorage()
let test = {
  data: new Date(),
  fn: () => {
    return '123'
  },
  arr: [1, 2],
  obj: {
    q: 'q',
  },
}
local.setItem('test', test)
local.watchItem('test', (oldV:any, newV:any) => {
  console.log('test-watch', oldV, newV)
})
const obj = local.getItem('test')
local.setItem('test', 1)
```
2. useGuObserver 响应式对象，可监听对象变化,也可用于组件之前交互。A component 发布值，B、C等组件通过watchItem 监听A组件属性的变化，触发对应的回调函数。
   
  参数|类型|默认值|说明
   --|--|--|----
   init|Object|-|初始化对象

#####example:
``` ts 
//common
import {useGuObserver} from 'gaius-utils'

const { observer, watchItem, removeItemListen } = useGuObserver({
  test: 1,
})
export {
  observer,
  watchItem,
  removeItemListen,
}

//A component
import { observer } from './index'

const onChangeTest = ()=>{
  observer.test++
}

//B component
import {watchItem} from './common.ts'
watchItem('test', ({ newValue, oldValue }) => {
  console.log(newValue,oldValue)
})

```
3. useGuDialog 命令式函数打开一个弹窗
  参数|类型|默认值|说明
   --|--|--|----
   option|```GuDialogType```|{}| 配置项
#####example:
  ``` ts
  import { useGuDialog }  from 'gaius-utils'
  import ExampleComponent from './components/ExampleComponent.vue'
  const compProps = reactive({
    info:'test'
  })
  const dialog = useGuDialog({
    title:'一个例子',
    content:ExampleComponent,
    componentProps:compProps
  })
  const openDialog = () => {
    dialog.open().then(res=>{
      console.log(res)
    }).catch(err=>{
      console.log(err)
    })
  }
  ```