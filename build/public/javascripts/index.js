import { throttle } from './utils/optimizationUtils.js'

document.addEventListener('DOMContentLoaded', () => {
  const tab = document.querySelector('.js-tab')
  if(!tab) return

  const tablist = tab.querySelectorAll('[role=tab]')
  const tabPanels = tab.querySelectorAll('[role=tabpanel]')

  tablist.forEach((tab, tabIndex) => {
    tab.addEventListener('click', () => {

      tablist.forEach((tab) => tab.setAttribute('aria-selected', 'false'))
      tab.setAttribute('aria-selected', 'true')

      tabPanels.forEach((tabPanel, tabPanelIndex) => {
        const isTargetPanel = tabIndex === tabPanelIndex
        tabPanel.setAttribute('aria-hidden', String(!isTargetPanel))
      })
    })
  })


  const stickyElement = document.querySelector('.js-home-tablist')
  let previousScrollTop = stickyElement.offsetTop;

  window.addEventListener('scroll', throttle(handleElementScroll), false)
  function handleElementScroll() {
    let currentScrollPostion = window.scrollY || window.pageYOffset
    const isStuck = currentScrollPostion > previousScrollTop
    
    document.body.classList.toggle('is-fixed-home-tablist', isStuck)
  }



  const ANIMATED_CLASSNAME = 'is-observed'
  const elements = Array.from(document.querySelectorAll('.js-observer'))
    // console.log([].slice.call(document.querySelectorAll('.js-scroll-animation')), Array.from(document.querySelectorAll('.js-scroll-animation')),  document.querySelectorAll('.js-scroll-animation'))
    // const options = {
    //   root: null,
    //   rootMargin: '0px 0px 0px 0px',
    //   threshold: 0.1, // [0, 1], [0, 0.5]
    // }
  let observer = new IntersectionObserver(callback)

  elements.forEach(element => observer.observe(element))

  function callback(entries, observer) {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return
      entry.target.classList.toggle(ANIMATED_CLASSNAME, entry.isIntersecting)

      // entry.target.classList.add('pulse')
      // entry.target.addEventListener('animationend', event => event.currentTarget.classList.remove(ANIMATED_CLASSNAME));
      // observer.unobserve(entry.target) // once
      // if(entry.intersectionRatio > 0) {}
    })
  }



  // 
  const homeCTA = document.querySelector('.js-home-cta')
  if(homeCTA) {
    window.addEventListener('scroll', throttle(test12))
  }
  function test12() {
    const isStuck = window.pageYOffset > 1080
    homeCTA.classList.toggle('is-fixed', isStuck)
  }
})