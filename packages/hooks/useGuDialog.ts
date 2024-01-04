import { createApp, App } from 'vue'
import GuDialogTemplate, { GuDialogType } from '../components/GuDialogTemplate.vue'

/**
 * 使用hook的方式,打开一个弹窗
 * @param option 
 * @returns 
 */
const useGuDialog = (option:GuDialogType) => {
  let modalComp:App
  const container = document.createElement('div')

  const destroyed = () => {
    modalComp.unmount()
    document.body.removeChild(container)
  }
  
  const open = (cb:Function) => {
    modalComp = createApp(GuDialogTemplate, {
      ...option,
      onConfirm: (res:any) => {
        cb({
          type: 'ok',
          data: res,
        })
      },
      onCancel: (res:any) => {
        cb({
          type: 'cancel',
          data: res,
        })
        destroyed()
      },
    })
    modalComp.mount(container).$el
    document.body.appendChild(container)
  }
  return {
    /**
   * 打开一个弹窗实例
   */
    open,
    /**
   * 销毁一个弹窗实例
   */
    destroyed,
  }
}

export default useGuDialog