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

      window.scrollTo(0, navbarElement.clientHeight + heroElement.clientHeight)
      setTimeout(() => {
        document.body.classList.add('is-navbar-up')
      }, 1)
    })
  })


  // todo functoin
  const TAB_FIXED_CLASSNAME = 'is-fixed-home-tablist'
  const stickyElement = document.querySelector('.js-home-tablist')
  const navbarElement = document.querySelector('.js-navbar-backdrop')
  const heroElement = document.querySelector('.js-hero')
  // const { bodyElement } = document

  let previousOffsetTop
  let isStuck
  let currentScrollTop
  
  const getWindowOffsetTop = () => window.scrollY || window.pageYOffset

  window.addEventListener('load', () => {
    previousOffsetTop = stickyElement.offsetTop;
    currentScrollTop = getWindowOffsetTop()
  })
  window.addEventListener('resize', throttle(setElementOffsetTop), false)
  window.addEventListener('scroll', throttle(handleElementScroll), false)

  function setElementOffsetTop() {
    currentScrollTop = getWindowOffsetTop()
    isStuck = currentScrollTop > previousOffsetTop
    previousOffsetTop = navbarElement.clientHeight + heroElement.clientHeight
  }

  function handleElementScroll() {
    currentScrollTop = getWindowOffsetTop()
    isStuck = currentScrollTop > previousOffsetTop
    
    document.body.classList.toggle(TAB_FIXED_CLASSNAME, isStuck)
  }


  let lastScrollTop = 0;
  window.addEventListener("scroll", throttle(handleNavbar), false);

  function handleNavbar() {
    const currentScrollTop = getWindowOffsetTop()
    const isScrolledDown = currentScrollTop > lastScrollTop
    const isFixedTab = document.body.classList.contains(TAB_FIXED_CLASSNAME)

    document.body.classList.toggle('is-navbar-up', isFixedTab && isScrolledDown)

    lastScrollTop = currentScrollTop <= 0 ? 0 : currentScrollTop; // For Mobile or negative scrolling
  }






  

  const ANIMATED_CLASSNAME = 'is-observed'
  const elements = Array.from(document.querySelectorAll('.js-observer'))
  const options = {
    root: null,
    rootMargin: '0px 0px 0px 0px',
    threshold: 0.5
  }
  let observer = new IntersectionObserver(callback, options)

  elements.forEach(element => observer.observe(element))

  function callback(entries, observer) {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return
      entry.target.classList.toggle(ANIMATED_CLASSNAME, entry.isIntersecting)
    })
  }


  // todo mobile;;;
  const homeCTA = document.querySelector('.js-home-cta')
  if(homeCTA) {
    window.addEventListener('scroll', throttle(test12))
  }
  function test12() {
    const heroElement = document.querySelector('.js-hero')
    if(!heroElement) return

    const isStuck = window.pageYOffset > heroElement.clientHeight
    homeCTA.classList.toggle('is-fixed', isStuck)
  }
})