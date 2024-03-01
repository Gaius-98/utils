import { BindType } from '../../types/utilsType'

const obServer = (el:HTMLImageElement, src:string) => {
  let lazyImageObserver = new IntersectionObserver(((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        el.src = src
        lazyImageObserver.unobserve(el)
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