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
    const heroElement = document.querySelector('.js-hero-cta')
    if (!heroElement) return

    const isStuck = window.pageYOffset >= getElementOffsetTop(heroElement) + heroElement.clientHeight
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

  var lazyloadImages

  if ('IntersectionObserver' in window) {
    lazyloadImages = document.querySelectorAll('[data-src]')
    console.log(lazyloadImages)
    var imageObserver = new IntersectionObserver(function (entries, observer) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var image = entry.target
          image.src = image.dataset.src
          image.classList.remove('lazy')
          imageObserver.unobserve(image)
        }
      })
    })

    lazyloadImages.forEach(function (image) {
      imageObserver.observe(image)
    })
  }
})

// var lazyloadImages;

// if ("IntersectionObserver" in window) {
//   lazyloadImages = document.querySelectorAll(".lazy");
//   var imageObserver = new IntersectionObserver(function(entries, observer) {
//     entries.forEach(function(entry) {
//       if (entry.isIntersecting) {
//         var image = entry.target;
//         image.src = image.dataset.src;
//         image.classList.remove("lazy");
//         imageObserver.unobserve(image);
//       }
//     });
//   });

//   lazyloadImages.forEach(function(image) {
//     imageObserver.observe(image);
//   });
// }

// else {
//   var lazyloadThrottleTimeout;
//   lazyloadImages = document.querySelectorAll(".lazy");

//   function lazyload () {
//     if(lazyloadThrottleTimeout) {
//       clearTimeout(lazyloadThrottleTimeout);
//     }

//     lazyloadThrottleTimeout = setTimeout(function() {
//       var scrollTop = window.pageYOffset;
//       lazyloadImages.forEach(function(img) {
//           if(img.offsetTop < (window.innerHeight + scrollTop)) {
//             img.src = img.dataset.src;
//             img.classList.remove('lazy');
//           }
//       });
//       if(lazyloadImages.length == 0) {
//         document.removeEventListener("scroll", lazyload);
//         window.removeEventListener("resize", lazyload);
//         window.removeEventListener("orientationChange", lazyload);
//       }
//     }, 20);
//   }

//   document.addEventListener("scroll", lazyload);
//   window.addEventListener("resize", lazyload);
//   window.addEventListener("orientationChange", lazyload);
// }
