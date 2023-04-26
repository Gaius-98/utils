const obServer = (el, src) => {
  let lazyImageObserver = new IntersectionObserver(((entries, observer) => {
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
    mounted(el:HTMLElement, binding:any) {
      obServer(el, binding.value)
    },
  },
}
export default lazyImg