import { useEffect, useRef } from 'react'
import { Outlet, useLocation } from 'react-router'
import Lenis from 'lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

declare global {
  interface Window {
    __lenis?: Lenis
  }
}

export default function Root() {
  const location = useLocation()
  const lenisRef = useRef<Lenis | null>(null)

  // 1. Initialize Lenis momentum smooth scrolling
  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    try {
      const lenis = new Lenis({
        duration: 1.15,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: 'vertical',
        gestureOrientation: 'vertical',
        smoothWheel: true,
        wheelMultiplier: 1.05,
        touchMultiplier: 1.5,
      })

      lenisRef.current = lenis
      window.__lenis = lenis

      lenis.on('scroll', ScrollTrigger.update)
      const tickerCallback = (time: number) => {
        lenis.raf(time * 1000)
      }
      gsap.ticker.add(tickerCallback)
      gsap.ticker.lagSmoothing(0)

      return () => {
        gsap.ticker.remove(tickerCallback)
        lenis.destroy()
        lenisRef.current = null
        delete window.__lenis
      }
    } catch (err) {
      console.warn('Lenis initialization skipped:', err)
    }
  }, [])

  // 2. Reading progress bar handler across all pages
  useEffect(() => {
    const updateProgress = () => {
      const scrollTotal = document.documentElement.scrollHeight - window.innerHeight
      const progress = scrollTotal > 0 ? Math.min(Math.max(window.scrollY / scrollTotal, 0), 1) : 0
      const bar = document.querySelector<HTMLElement>('.reading-progress')
      if (bar) {
        bar.style.transform = `scaleX(${progress})`
        bar.style.opacity = progress > 0.005 ? '1' : '0'
      }
    }

    const lenis = lenisRef.current
    if (lenis) {
      lenis.on('scroll', updateProgress)
    }
    window.addEventListener('scroll', updateProgress, { passive: true })
    window.addEventListener('resize', updateProgress, { passive: true })

    updateProgress()

    return () => {
      if (lenis) {
        lenis.off('scroll', updateProgress)
      }
      window.removeEventListener('scroll', updateProgress)
      window.removeEventListener('resize', updateProgress)
    }
  }, [])

  // 3. Smooth anchor link interceptor
  useEffect(() => {
    const handleAnchorClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null
      const anchor = target?.closest('a')
      if (!anchor) return
      const href = anchor.getAttribute('href')
      if (href && href.startsWith('#') && href.length > 1) {
        const targetElement = document.querySelector<HTMLElement>(href)
        if (targetElement) {
          event.preventDefault()
          const lenis = lenisRef.current
          if (lenis) {
            lenis.scrollTo(targetElement, { offset: -24, duration: 1.1 })
          } else {
            targetElement.scrollIntoView({ behavior: 'smooth' })
          }
        }
      }
    }

    document.addEventListener('click', handleAnchorClick)
    return () => document.removeEventListener('click', handleAnchorClick)
  }, [])

  // 4. Page change handling: reset scroll & title without jump
  useEffect(() => {
    const lenis = lenisRef.current
    const hashTarget = location.hash ? document.querySelector<HTMLElement>(location.hash) : null

    if (hashTarget) {
      if (lenis) lenis.scrollTo(hashTarget, { offset: -24, duration: 1.1 })
      else hashTarget.scrollIntoView({ behavior: 'smooth' })
    } else {
      if (lenis) lenis.scrollTo(0, { immediate: true })
      window.scrollTo(0, 0)
    }

    // Reset progress bar on route change
    const bar = document.querySelector<HTMLElement>('.reading-progress')
    if (bar) {
      bar.style.transform = 'scaleX(0)'
      bar.style.opacity = '0'
    }

    const segments = location.pathname.split('/').filter(Boolean)
    const section = segments.length > 0 ? segments[segments.length - 1] : ''
    document.title = section ? `${section.replace(/-/g, ' ')} — FRIDAY` : 'FRIDAY — Independent journalism'

    ScrollTrigger.refresh()
  }, [location.pathname, location.search, location.hash])

  return (
    <>
      <div
        className="reading-progress"
        aria-hidden="true"
        style={{ transform: 'scaleX(0)', transformOrigin: '0 0', opacity: 0 }}
      />
      <Outlet />
    </>
  )
}
