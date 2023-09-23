import useGuObserver from '../packages/hooks/useGuObserver'

const { observer, watchItem, removeItemListen } = useGuObserver({
  test: 1,
})
export {
  observer,
  watchItem,
  removeItemListen,
}