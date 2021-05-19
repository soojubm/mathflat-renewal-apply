import { throttle } from './utils/optimizationUtils.js'

export function getElementOffsetTop(element) {
  let offsetTop = element.offsetTop
  const hasParentElement = element.offsetParent
  if (hasParentElement) offsetTop += element.offsetParent.offsetTop

  return offsetTop
}

document.addEventListener('DOMContentLoaded', () => {
  const homeCTA = document.querySelector('.js-home-cta')
  if (homeCTA) {
    window.addEventListener('scroll', throttle(test12))
  }
  function test12() {
    const heroCTA = document.querySelector('.js-hero-cta')
    if (!heroCTA) return

    const isStuck = window.pageYOffset >= getElementOffsetTop(heroCTA) + heroCTA.clientHeight
    homeCTA.classList.toggle('is-fixed', isStuck)
  }

  const ANIMATED_CLASSNAME = 'is-observed'
  const elements = Array.from(document.querySelectorAll('.js-observer'))
  const options = {
    root: null,
    rootMargin: '0px 0px 0px 0px',
    threshold: 0.25,
  }
  let observer = new IntersectionObserver(callback, options)

  elements.forEach(element => observer.observe(element))

  function callback(entries, observer) {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return
      entry.target.classList.toggle(ANIMATED_CLASSNAME, entry.isIntersecting)

      // // lazyloading 느림
      // const images = entry.target.querySelectorAll('img')
      // images.forEach(image => {
      //   if (!image.dataset.src) return
      //   image.src = image.dataset.src

      //   observer.unobserve(image)
      // })
    })
  }

  // 레이지로딩
  let lazyloadImages
  if ('IntersectionObserver' in window) {
    lazyloadImages = document.querySelectorAll('[data-src]')
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        // todo hero 영역 이미지들 안 됨.. 왜
        if (entry.isIntersecting) {
          const image = entry.target
          image.src = image.dataset.src
          // image.classList.remove('lazy')
          imageObserver.unobserve(image)
        }
      })
    })

    lazyloadImages.forEach(image => imageObserver.observe(image))
  }
})
