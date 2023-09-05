### GuDialog
通过class的方式生成弹窗
#### 使用
```
import { GuDialog } from 'gaius-utils'
// 生成一个dialog实例
const dialog = new GuDialog({
  title: '测试',
  content: GuChart,
  size: 'default',
  footer: false,
  componentProps: {
    insertOption: option,
  },
})
// 打开弹窗函数
const open = () =>{
    dialog.open().then(res=>{
      //do Some
    })
}
```
#### props
属性|说明|默认值|类型|注释
--|----|--|--|----
title|弹窗标题|'默认'|string
size|弹窗默认大小|'default'|['small','default','large']
width|自定义弹窗宽度|undefined|['number','undefined']
height|自定义高度|undefined|['number','undefined']
content|内容|undefined|['undefined','component']
componentPros|content组件的props|{}|any
#### dialog实例的函数
函数名|说明
--|----
dialog.open()|创建弹窗 返回一个promise用于后续操作
dialog.destroyed()|销毁弹窗
