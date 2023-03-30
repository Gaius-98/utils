### functions
所有的函数使用都需要按需引入

#### 使用
```
import {fnxxx} from 'gaius-utils'
fnxxx()
```

#### 函数功能说明
1. scrollToDom 在container中定位到dom
   参数|类型|默认值|说明
   --|--|--|----
   container|Element|window|容器
   to|Element|-|在container中定位到dom
2. getVarType 获取当前变量类型(string,number,null,undefined,set,map等)
   参数|类型|默认值|说明
   --|--|--|----
   variable|any|--|变量
3. getLowerCase 将word的部分字母小写后返回(默认首字母小写)
    参数|类型|默认值|说明
    --|--|--|----
    word|string|--|需要修改的字符串
    startIndex|number|0|开始序号
    endIndex|number|1|结束序号
4. getUpperCase 将word的部分字母大写后返回(默认首字母大写)
   参数|类型|默认值|说明
    --|--|--|----
    word|string|--|需要修改的字符串
    startIndex|number|0|开始序号
    endIndex|number|1|结束序号