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

      // window.scrollTo(0, navbarElement.clientHeight + heroElement.clientHeight)
      // document.body.classList.remove('is-navbar-up')
    })
  })


  const stickyElement = document.querySelector('.js-home-tablist')
  const navbarElement = document.querySelector('.js-navbar-backdrop')
  const heroElement = document.querySelector('.js-hero')
  let previousOffsetTop = stickyElement.offsetTop;

  // resize시 navbarHeight + heroHeight 되어야 함. offsetTop은 sticky 상태에 따라 유동
  window.addEventListener('resize', throttle(setElementOffsetTop), false)
  function setElementOffsetTop() {
    previousOffsetTop = navbarElement.clientHeight + heroElement.clientHeight
  }

  window.addEventListener('scroll', throttle(handleElementScroll), false)
  function handleElementScroll() {
    let currentScrollPostion = window.scrollY || window.pageYOffset
    const isStuck = currentScrollPostion > previousOffsetTop
    
    document.body.classList.toggle('is-fixed-home-tablist', isStuck)
  }


  let lastScrollTop = 0;
  window.addEventListener("scroll", () => {
    var currentScrollTop = window.pageYOffset || document.documentElement.scrollTop
    const isScrolledDown = currentScrollTop > lastScrollTop
    document.body.classList.toggle('is-navbar-up', isScrolledDown)

    lastScrollTop = currentScrollTop <= 0 ? 0 : currentScrollTop; // For Mobile or negative scrolling
  }, false);


  const ANIMATED_CLASSNAME = 'is-observed'
  const elements = Array.from(document.querySelectorAll('.js-observer'))
    // console.log([].slice.call(document.querySelectorAll('.js-scroll-animation')), Array.from(document.querySelectorAll('.js-scroll-animation')),  document.querySelectorAll('.js-scroll-animation'))
    const options = {
      root: null,
      rootMargin: '0px 0px 0px 0px',
      threshold: 0.25
    }
  let observer = new IntersectionObserver(callback, options)

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