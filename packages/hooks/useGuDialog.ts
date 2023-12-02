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
  
  const open = () => {
    let p = new Promise((resolve, reject) => {
      try {
        modalComp = createApp(GuDialogTemplate, {
          ...option,
          onConfirm: (res:any) => {
            resolve({
              type: 'ok',
              data: res,
            })
            destroyed()
          },
          onCancel: (res:any) => {
            resolve({
              type: 'cancel',
              data: res,
            })
            destroyed()
          },
        })
        modalComp.mount(container).$el
        document.body.appendChild(container)
      } catch (error) {
        reject(error)
      }
    })
    return p
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