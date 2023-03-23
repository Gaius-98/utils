/**
 * 滚动container 定位容器
 * @param container -- Element dom的容器
 * @param to -- Element  需要定位到的dom
 */
const scrollToDom = (to: Element, container?:Element) => {
  if (container) {
    const { left: cLeft, top: cTop } = container?.getBoundingClientRect() as DOMRect
    const { left: tLeft, top: tTop } = to.getBoundingClientRect()
    const isScroll = (dom:Element) => ({
      y: dom.scrollHeight - dom.clientHeight > 0,
      x: dom.scrollWidth - dom.clientWidth > 0,
    })
    const { x, y } = isScroll(container)
    let top = tTop - cTop + container.scrollTop 
    let left = tLeft - cLeft + container.scrollLeft
    container.scrollTo({
      top: y ? top : container.scrollTop,
      left: x ? left : container.scrollLeft,
    })
  } else {
    const { left: tLeft, top: tTop } = to.getBoundingClientRect()
    window.scrollTo({
      left: tLeft,
      top: tTop,
    })
  }
}
export default scrollToDom