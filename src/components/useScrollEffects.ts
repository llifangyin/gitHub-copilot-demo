// 滚动隐藏header，section动画
import { useEffect } from 'react'

export function useScrollHeader() {
  useEffect(() => {
    let lastScroll = window.scrollY
    const header = document.querySelector('.main-header') as HTMLElement
    function onScroll() {
      if (!header) return
      if (window.scrollY > lastScroll && window.scrollY > 80) {
        header.style.top = '-80px'
      } else {
        header.style.top = '0'
      }
      lastScroll = window.scrollY
    }
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
}

export function useSectionFadeIn() {
  useEffect(() => {
    const sections = document.querySelectorAll('.full-screen-section')
    function onScroll() {
      sections.forEach(sec => {
        const rect = sec.getBoundingClientRect()
        if (rect.top < window.innerHeight - 100 && rect.bottom > 100) {
          sec.classList.add('fade-in', 'visible')
        } else {
          sec.classList.remove('visible')
        }
      })
    }
    window.addEventListener('scroll', onScroll)
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
}
