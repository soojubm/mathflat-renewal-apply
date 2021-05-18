import { throttle } from './utils/optimizationUtils.js'

document.addEventListener('DOMContentLoaded', () => {
  let lastScrollTop = 0
  let isCounted = false

  const tabElement = document.querySelector('.js-tab')

  if (tabElement) {
    // tab , parameter tab
    const tablist = tabElement.querySelectorAll('[role=tab]')
    const tabPanels = tabElement.querySelectorAll('[role=tabpanel]')
    const tablistInner = tabElement.querySelector('.js-home-tablist-inner')

    let { hash } = window.location
    let lastTab = Number(hash.substring(4, 5)) || 1

    // 이전 탭 저장 id hash로..
    tablist.forEach((tab, tabIndex) => {
      tab.setAttribute('aria-selected', lastTab === tabIndex + 1)

      if (lastTab === tabIndex + 1) {
        tablistInner.scrollLeft = tab.offsetLeft
      }
    })

    tabPanels.forEach((tabPanel, tabPanelIndex) => {
      const isTargetPanel = lastTab === tabPanelIndex + 1
      tabPanel.setAttribute('aria-hidden', String(!isTargetPanel))
    })

    tablist.forEach((tab, tabIndex) => {
      tab.addEventListener('click', () => {
        tablistInner.scrollLeft = tab.offsetLeft

        tablist.forEach(tab => tab.setAttribute('aria-selected', 'false'))
        tab.setAttribute('aria-selected', 'true')

        tabPanels.forEach((tabPanel, tabPanelIndex) => {
          const isTargetPanel = tabIndex === tabPanelIndex
          tabPanel.setAttribute('aria-hidden', String(!isTargetPanel))
        })

        // + 100 임시
        window.scrollTo(0, navbarElement.clientHeight + heroElement.clientHeight + 20)

        isCounted = false
        // lastScrollTop = 0;
        // setTimeout(() => {
        //   document.body.classList.add('is-navbar-up')
        // }, 10)
      })
    })
  }

  // todo functoin
  const TAB_FIXED_CLASSNAME = 'is-fixed-home-tablist'
  const stickyElement = document.querySelector('.js-home-tablist')
  const navbarElement = document.querySelector('.js-navbar-backdrop')
  const heroElement = document.querySelector('.js-hero')
  // const { bodyElement } = document

  if (stickyElement) {
    let previousOffsetTop
    let isStuck
    let currentScrollTop

    const getWindowOffsetTop = () => window.scrollY || window.pageYOffset

    window.addEventListener('load', () => {
      previousOffsetTop = stickyElement.offsetTop
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

    // window.addEventListener('scroll', throttle(handleNavbar), false)

    // function handleNavbar() {
    //   const currentScrollTop = getWindowOffsetTop()
    //   const isScrolledDown = currentScrollTop > lastScrollTop
    //   const isFixedTab = document.body.classList.contains(TAB_FIXED_CLASSNAME)

    //   document.body.classList.toggle('is-navbar-up', isFixedTab && isScrolledDown)

    //   lastScrollTop = currentScrollTop <= 0 ? 0 : currentScrollTop // For Mobile or negative scrolling
    // }
  }

  // todo... 각각 시간 설정할 수 있도록..
  // animationend
  const counter = document.querySelector('.js-counter')
  const counterWrap = counter.querySelector('.home-tabpanel-section-media')
  if (counter) {
    counterWrap.addEventListener('animationend', startCountUp)
    // window.addEventListener('scroll', throttle(startCountUp))

    function startCountUp() {
      if (!isCounted && counter.classList.contains('is-observed')) {
        isCounted = true
        countUp({ selector: '.js-counter .js-counter1' })
        countUp({ selector: '.js-counter .js-counter2' })
        countUp({ selector: '.js-counter .js-counter3' })
        countUp({ selector: '.js-counter .js-counter4' })
        countUp({ selector: '.js-counter .js-counter5' })
        countUp({ selector: '.js-counter .js-counter6' })

        // let timeout = setTimeout(() => {
        //   countUp({ selector: '.js-counter .js-counter1' })
        //   countUp({ selector: '.js-counter .js-counter2' })
        //   countUp({ selector: '.js-counter .js-counter3' })
        //   countUp({ selector: '.js-counter .js-counter4' })
        //   countUp({ selector: '.js-counter .js-counter5' })
        //   countUp({ selector: '.js-counter .js-counter6' })
        //   clearTimeout(timeout)
        // }, 200)
      }
    }
  }

  function countUp({ selector: selector }) {
    if (!selector) return

    let number = 0
    let element = document.querySelector(selector)
    let elementValue = element.getAttribute('data-number')

    let interval = setInterval(() => {
      renderNumber()

      if (number >= elementValue) clearInterval(interval)
    }, 20)

    function renderNumber() {
      ++number
      element.innerHTML = `${number}%`
    }
  }
})
