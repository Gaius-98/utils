import { BindType } from '../types/utilsType'

const copyText = (text:string) => {
  const inputDom = document.createElement('input') as HTMLInputElement
  inputDom.value = text
  document.body.appendChild(inputDom)
  inputDom.select()
  try {
    document.execCommand('Copy')
  } catch (error) {
    console.error(`复制失败:${error}`)
  }
  document.body.removeChild(inputDom)
}

const copy = {
  name: 'copy',
  options: {
    mounted(el:HTMLElement, binding:BindType) {
      const { arg = 'click', value } = binding
      el.addEventListener(arg, () => {
        let text = value as string
        copyText(text)
      })
    },
  },
}
export default copy