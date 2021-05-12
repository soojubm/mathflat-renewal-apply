import { throttle } from './utils/optimizationUtils.js'

document.addEventListener('DOMContentLoaded', () => {

  let lastScrollTop = 0;




  const tab = document.querySelector('.js-tab')
  if(!tab) return

  const tablist = tab.querySelectorAll('[role=tab]')
  const tabPanels = tab.querySelectorAll('[role=tabpanel]')

  tablist.forEach((tab, tabIndex) => {
    tab.addEventListener('click', () => {

      tablist.forEach(tab => tab.setAttribute('aria-selected', 'false'))
      tab.setAttribute('aria-selected', 'true')

      tabPanels.forEach((tabPanel, tabPanelIndex) => {
        const isTargetPanel = tabIndex === tabPanelIndex
        tabPanel.setAttribute('aria-hidden', String(!isTargetPanel))
      })

      // + 100 임시
      // 여기서 이전 스크롤 값을 넣어줘야 한다......><
      window.scrollTo(0, navbarElement.clientHeight + heroElement.clientHeight + 100)
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

  let startNr = 0

  const counters = document.querySelectorAll('.js-counter')

  window.addEventListener('scroll', () => {
    counters.forEach(counter => {
      const isTemp = counter.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.classList.contains('is-observed')
      if(isTemp) {
        counter.innerText = startNr
        const endNumber = parseInt(counter.textContent)
        if(startNr < endNumber) {
          setTimeout(() => startNr + 1, 100)
        }
        return 
      }
    })
  })





  // const counters = document.querySelectorAll('.js-counter')
  // counters.forEach(counter => {
  //   counter.innerText = '0'

  //   const updateCounter = () => {
  //     const target = +counter.getAttribute('data-target')
  //     const c = +parseInt(counter.innerText)
  //     const increment = target / 50000
  //     console.log(increment)
  //     if(c < target) {
  //       counter.innerText = `${Math.ceil(c + increment)}%`
  //       setTimeout(updateCounter, 1)
  //     } else {
  //       counter.innerText= `${target}%`
  //     }
  //   }

  //   // if(counter.parentNode)
  //   window.addEventListener('scroll', () => {
  //     if(!counter.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.classList.contains('is-observed')) return
      
  //     setTimeout(() => {
  //       updateCounter()
  //     }, 2000)

  //   })
  // })

  // 일단 복붙
  //   // Initial values

  //   const finalValue = parseInt(numberElem.getAttribute('num'), 10);
  //   const animTime = parseInt(numberElem.getAttribute('time'), 10);
  //   const initTime = performance.now();
  
  //   // Interval
  //   let interval = setInterval(() => {
  //     let t = (performance.now() - initTime) / animTime;
  
  //     let currentValue = Math.floor(t * finalValue);
  //     // console.log(currentValue)
  //     console.log(numberElem)
  //     numberElem.innerText = currentValue;
      
  //     if (t >= 1) {
  //       clearInterval(interval);
  //     }
  //   }, 50);

  // });

})