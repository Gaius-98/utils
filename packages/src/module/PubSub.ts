type Fn = <T extends any[]>(...args:T)=>void
/**
 * 发布订阅模式
 */
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
export class GuPubSub implements PubSub {
  _subscribers:Map<string, Fn[]>

  constructor() {
    this._subscribers = new Map()
  }

  onSubscribe(eventName:string, callback:Fn):void {
    let callbacks = this._subscribers.get(eventName) || []
    callbacks.push(callback)
    this._subscribers.set(eventName, callbacks)
  }

  onPublish(eventName:string, ...args:any[]) {
    let callbacks = this._subscribers.get(eventName)
    if (callbacks) {
      callbacks.map(callback => callback(...args))
    }
  }

  once(eventName:string, callback:Fn) {
    let onceFn = (...args:any[]) => { 
      callback(...args)
      this.unsubscribe(eventName, onceFn)
    }
    this.onPublish(eventName, onceFn)
  }

  unsubscribe(eventName:string, callback:Fn) {
    let callbacks = this._subscribers.get(eventName) || []
    this._subscribers.set(eventName, callbacks.filter(callbackItem => callbackItem !== callback))
  }
}