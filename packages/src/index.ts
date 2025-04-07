import copy from './directives/copy'
import lazyImg from './directives/lazyImg'
import GuDragResize from './components/GuDragResize.vue'
import GuVirtualList from './components/GuVirtualList.vue'
import GuDynamicHeightList from './components/GuDynamicHeightList.vue'
import GuDragResizePlus from './components/GuDragResizePlus.vue'
import useGuDialog from './hooks/useGuDialog'

export { 
  /**
   * 拖拽组件
   */
  GuDragResize,
  /**
   * 虚拟列表组件
   */
  GuVirtualList,
  /**
   * 不定高的虚拟列表组件
   */
  GuDynamicHeightList,
  /**
   * 懒加载图片指令
   */
  lazyImg,
  /**
   * 一键复制指令
   */
  copy,
  /**
   * hooks打开弹窗
   */
  useGuDialog,
  /**
   * 进阶版的拖拽组件
   */
  GuDragResizePlus,
  
}
export * from './types/utilsType'
export { scrollToDom, getVarType, getLowerCase, getUpperCase, flat, unflat } from './functions/functions'
export { GuPubSub } from './module/PubSub'