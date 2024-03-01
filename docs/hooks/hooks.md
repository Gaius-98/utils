### hooks
 hook要按需使用
#### 使用
```
import { useTest } from 'gaius-utils'
const { testData } = useTest
```
#### hooks 使用说明
1. useGuDialog 命令式函数打开一个弹窗
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
    dialog.open((res)=>{
      console.log(res)
    })
  }
  ```