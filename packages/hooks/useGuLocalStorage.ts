import { onBeforeUnmount } from 'vue'
import GuLocalStorage from '../share/GuLocalStorage'
import { guLocalOpts } from '../../types/share'

/**
 * 便于操作localstorage,调用实例的setItem 会触发对应的事件监听
 * @returns 返回一个GuLocalStorage 示例
 */
const useGuLocalStorage = (opts:guLocalOpts = {
  destroyAfterClear: true,
}) => {
  const local = new GuLocalStorage()
  const { destroyAfterClear } = opts
  onBeforeUnmount(() => {
    if (destroyAfterClear) {
      local.keys.forEach(item => {
        local.removeItem(item)
      })
    }
  })
  return local
}
export default useGuLocalStorage