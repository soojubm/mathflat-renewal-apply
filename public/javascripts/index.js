import { throttle } from './utils/optimizationUtils.js'

document.addEventListener('DOMContentLoaded', () => {


  let lastScrollTop = 0;

  const tab = document.querySelector('.js-tab')
  if(!tab) return

  const tablist = tab.querySelectorAll('[role=tab]')
  const tabPanels = tab.querySelectorAll('[role=tabpanel]')

  let { hash } = window.location
  const lastTab = Number(hash.substring(4, 5)) || 1

  // 이전 탭 저장 id hash로..
  tablist.forEach((tab, tabIndex) => tab.setAttribute('aria-selected', lastTab === tabIndex + 1))
  tabPanels.forEach((tabPanel, tabPanelIndex) => {
    const isTargetPanel = lastTab === tabPanelIndex + 1
    console.log(lastTab, tabPanelIndex)
    tabPanel.setAttribute('aria-hidden', String(!isTargetPanel))
  })

  tablist.forEach((tab, tabIndex) => {
    tab.addEventListener('click', event => {
      // event.preventDefault()

      tablist.forEach(tab => tab.setAttribute('aria-selected', 'false'))
      tab.setAttribute('aria-selected', 'true')

      tabPanels.forEach((tabPanel, tabPanelIndex) => {
        const isTargetPanel = tabIndex === tabPanelIndex
        tabPanel.setAttribute('aria-hidden', String(!isTargetPanel))
      })

      // + 100 임시
      // 여기서 이전 스크롤 값을 넣어줘야 한다......><
      window.scrollTo(0, navbarElement.clientHeight + heroElement.clientHeight + 20)
      // lastScrollTop = 0;
      document.body.classList.add('is-navbar-up')

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
    previousOffsetTop = navbarElement.clientHeight + heroElement.clientHeight

    isStuck = currentScrollTop > previousOffsetTop
  }

  function handleElementScroll() {
    currentScrollTop = getWindowOffsetTop()

    // const temp = document.body.contains('is-navbar-up') ? previousOffsetTop : previousOffsetTop + navbarElement.clientHeight
    isStuck = currentScrollTop > previousOffsetTop
    
    document.body.classList.toggle(TAB_FIXED_CLASSNAME, isStuck)
  }


  window.addEventListener("scroll", throttle(handleNavbar), false);

  function handleNavbar() {
    const currentScrollTop = getWindowOffsetTop()
    const isScrolledDown = currentScrollTop > lastScrollTop
    const isFixedTab = document.body.classList.contains(TAB_FIXED_CLASSNAME)

    document.body.classList.toggle('is-navbar-up', isFixedTab && isScrolledDown)
    // document.body.classList.toggle('is-navbar-up', !)

    lastScrollTop = currentScrollTop <= 0 ? 0 : currentScrollTop; // For Mobile or negative scrolling
  }



  

  const ANIMATED_CLASSNAME = 'is-observed'
  const elements = Array.from(document.querySelectorAll('.js-observer'))
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
    })
  }

  // todo mobile;;;
  const homeCTA = document.querySelector('.js-home-cta')
  if(homeCTA) {
    window.addEventListener('scroll', throttle(test12))
  }
  function test12() {
    const heroElement = document.querySelector('.js-hero-cta')
    if(!heroElement) return

    const isStuck = window.pageYOffset > heroElement.offsetTop
    homeCTA.classList.toggle('is-fixed', isStuck)
  }

  const counters = document.querySelectorAll('.js-counter')
  let starttime

  counters.forEach(counter => {
    const limitNumber = parseInt(counter.textContent)

    window.addEventListener('scroll', () => {
      if(counter.classList.contains('is-play')) return

      let number = 0;

      const isTemp = counter.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.classList.contains('is-observed')
      if(!isTemp) return
      setTimeout(() => {
        counter.classList.add('is-play')

        requestAnimationFrame(function(timestamp) {
          starttime = timestamp || new Date().getTime() //if browser doesn't support requestAnimationFrame, generate our own timestamp using Date
          moveit(timestamp, counter, 1600)
        })
      }, 1200)

      function moveit(timestamp, el, duration){
        //if browser doesn't support requestAnimationFrame, generate our own timestamp using Date:
        var timestamp = timestamp || new Date().getTime()
        var runtime = timestamp - starttime
        var progress = runtime / duration
        progress = Math.min(progress, 1)

        // el.style.left = (400 * progress).toFixed(2) + 'px'

        if(number >= limitNumber) return
        if(counter.classList.contains('is-play')) return

        number++
        counter.innerText = `${number}%`

        if (runtime < duration){ // if duration not met yet
          requestAnimationFrame(timestamp => { // call requestAnimationFrame again with parameters
            moveit(timestamp, el, duration)
          })
        }
      }
    })
  })


  // const videoElements = document.querySelectorAll('video')

  // window.addEventListener('scroll', () => {
  //   videoElements.forEach(videoElement => {
  //     console.log(videoElement.parentNode.parentNode.parentNode)
  //     if(videoElement.parentNode.parentNode.parentNode.classList.contains('is-observed')) {
  //       videoElement.play()
  //     }
  //   })
  // })

  function detectBrowser() {
    const browserElement = document.querySelector('.js-browser')
    const wrapElement = document.querySelector('.js-wrap')
    if (!browserElement || !wrapElement) return
  
    const userAgent = navigator.userAgent.toLowerCase()
    const isIEBrowser = userAgent.indexOf('msie') > -1 || userAgent.indexOf('trident') > -1
    // const isChromeBrowser = userAgent.indexOf('chrome') !== -1
    // const isMacBrowser = /Mac|iPod|iPhone|iPad/.test(navigator.platform);
  
    browserElement.hidden = !isIEBrowser
    // wrapElement.hidden = isIEBrowser
  
    if(isIEBrowser) wrapElement.style.display = 'none'
  
    console.log(isIEBrowser)
  
    // todo return browser
  }

  detectBrowser()
})