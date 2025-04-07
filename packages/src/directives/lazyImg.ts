import { BindType } from '../types/utilsType'

const obServer = (el:HTMLImageElement, src:string) => {
  let lazyImageObserver = new IntersectionObserver(((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        el.src = src
        el.onload = () => {
          lazyImageObserver.unobserve(el)
        }
        el.onerror = () => {
          console.error(`图片加载失败,图片地址:${src}`)
          lazyImageObserver.unobserve(el)
        }
      }
    })
  }))
  lazyImageObserver.observe(el)
}

const lazyImg = {
  name: 'lazy-img',
  options: {
    mounted(el:HTMLElement, binding:BindType) {
      obServer(el as HTMLImageElement, binding.value as string)
    },
  },
}
export default lazyImg