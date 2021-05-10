export function throttle(callback) {
  let timer

  return function() {
    if(timer) window.cancelAnimationFrame(timer)
    timer = window.requestAnimationFrame(() => callback())
  }
}