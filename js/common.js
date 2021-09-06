'use strict'

// ヘッダー
const navButton = document.getElementById('nav_button')
navButton.addEventListener('click', () => {
  const header = document.getElementById('header')
  header.classList.toggle('open')
  const nav = document.getElementById('nav')
  nav.classList.toggle('show')
})

// ヒーローヘッダー
const slides = Array.from(document.querySelectorAll('.slide'))
const slider = document.querySelector('.slider')

const getNextPrev = () => {
  const activeSlide = document.querySelector('.slide.active')
  const activeIndex = slides.indexOf(activeSlide)

  let next, prev
  if (activeIndex === slides.length - 1) {
    next = slides[0]
  } else {
    next = slides[activeIndex + 1]
  }
  if (activeIndex === 0) {
    prev = slides[slides.length - 1]
  } else {
    prev = slides[activeIndex - 1]
  }
  return [next, prev]
}

const getPosition = () => {
  const activeSlide = document.querySelector('.slide.active')
  const activeIndex = slides.indexOf(activeSlide)
  const [next, prev] = getNextPrev()

  slides.forEach((slide, index) => {
    if (index === activeIndex) {
      slide.style.transform = 'translateX(0)'
    } else if (slide === prev) {
      slide.style.transform = 'translateX(-100%)'
    } else if (slide === next) {
      slide.style.transform = 'translateX(100%)'
    } else {
      slide.style.transform = 'translate(100%)'
    }

    slide.addEventListener('transitionend', () => {
      slide.classList.remove('top')
    })
  })
}

const getNextSlide = () => {
  const current = document.querySelector('.slide.active')
  const [next, prev] = getNextPrev()

  if (current.classList.contains('top')) {
    return
  }
  current.classList.add('top')
  next.classList.add('top')
  current.classList.remove('active')
  current.style.transform = 'translateX(-100%)'
  next.classList.add('active')
  next.style.transform = 'translateX(0)'

  getPosition()
}

window.addEventListener('load', () => {
  setInterval(() => {
    getNextSlide()
  }, 4000)
})
