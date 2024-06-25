### GuPubSub
GuPubSub是一个基于发布订阅模式的消息订阅发布工具，使用的是ts实现在各框架都能使用
1. 引入
   ```
    import {GuPubSub} from 'gaius-utils'
    
   ```
2. 使用
   ```
   const pubSub = new GuPubSub()
    //事件订阅
    pubSub.onSubscribe('test',()=>{
        console.log('test')
    })
    //事件发布
    pubSub.onPubish('test')
    //取消订阅
    pubSub.unsubscribe('test',()=>{
        console.log('test')
    })
    //执行一次
    pubSub.once('test',()=>{
    })
   ```
### 类型定义
```
interface PubSub {
    _subscribers:Map<string, Fn[]>;
    /**
     * 订阅某个事件
     * @param name 事件名称
     * @param callback 回调函数
     */
    onSubscribe:(name:string, callback:Fn)=>void;
    /**
     * 发布某个事件
     * @param name 事件名称
     * @param args 参数
     */
    onPublish:(name:string, ...args:any[])=>void;
    /**
     * 对该事件只订阅一次
     * @param name 事件名称
     * @param callback 回调函数
     */
    once:(name:string, callback:Fn)=>void;
    /**
     * 移除对该事件的订阅
     * @param name 事件名称
     * @param callback 回调函数
     */
    unsubscribe:(name:string, callback:Fn)=>void
}
```