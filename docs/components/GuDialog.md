### GuDialog
通过class的方式生成弹窗
#### 使用
```
import { GuChart } from 'gaius-utils'
// 生成一个dialog实例
const dialog = new Dialog({
  title: '测试',
  content: GuChart,
  size: 'default',
  footer: false,
  componentProps: {
    insertOption: option,
  },
  cb: (e:any) => {
    console.log(e)
    dialog.destroyed()
  },
})
// 打开弹窗函数
const open = () =>{
    dialog.creat()
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
cb|回调函数|undefined|function|弹窗关闭的回调函数用于数据处理
#### dialog实例的函数
函数名|说明
--|----
dialog.creat()|创建弹窗
dialog.destroyed()|销毁弹窗
dialog.getOption()|获取当前实例的所有配置
