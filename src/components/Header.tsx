import React, { useEffect, useState, useRef } from 'react'
import kermit from '../assets/kermit.png'

const THEME_KEY = 'theme'

const Header: React.FC = () => {
  const [active, setActive] = useState<string>('home')
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    try {
      const v = localStorage.getItem(THEME_KEY)
      return v === 'light' ? 'light' : 'dark'
    } catch {
      return 'dark'
    }
  })

  const handleNav = (e: React.MouseEvent | null, id: string) => {
    if (e && typeof (e as React.MouseEvent).preventDefault === 'function') {
      ;(e as React.MouseEvent).preventDefault()
    }
    // Special-case home: scroll to top of page
    if (id === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' })
      setActive('home')
      return
    }

    const target = document.getElementById(id)
    if (!target) return

    // account for the sticky header height
    const header = document.querySelector('header')
    const headerHeight = header ? (header as HTMLElement).getBoundingClientRect().height : 0
    const top = target.getBoundingClientRect().top + window.scrollY - headerHeight - 12
    window.scrollTo({ top, behavior: 'smooth' })
  }

  useEffect(() => {
    const sections = Array.from(document.querySelectorAll('section[id]')) as HTMLElement[]
    if (!sections.length) return

    const header = document.querySelector('header')
    const headerHeight = header ? (header as HTMLElement).getBoundingClientRect().height : 0

    const observer = new IntersectionObserver(
      (entries) => {
        // choose the entry with the largest intersectionRatio that's intersecting
        const visible = entries.filter((e) => e.isIntersecting)
        if (visible.length === 0) return
        visible.sort((a, b) => b.intersectionRatio - a.intersectionRatio)
        const id = visible[0].target.getAttribute('id') || 'home'
        // ignore initial events that fire during page load/layout shifts
        if ((ignoreInitialRef && ignoreInitialRef.current) || !id) return
        setActive(id)
      },
      {
        root: null,
        rootMargin: `-${headerHeight + 20}px 0px -40% 0px`,
        threshold: [0.15, 0.4, 0.6],
      },
    )

    sections.forEach((s) => observer.observe(s))
    return () => observer.disconnect()
  }, [])

  // ignore initial intersection events for a short period while layout stabilizes
  const ignoreInitialRef = useRef(true)
  useEffect(() => {
    const timer = setTimeout(() => {
      ignoreInitialRef.current = false
    }, 300)
    return () => clearTimeout(timer)
  }, [])

  const linkClass = (id: string) =>
    `hover:text-indigo-300 ${active === id ? 'text-indigo-300 font-semibold' : 'text-white'}`

  useEffect(() => {
    try {
      document.documentElement.setAttribute('data-theme', theme === 'light' ? 'light' : 'dark')
      localStorage.setItem(THEME_KEY, theme)
    } catch {
      // ignore
    }
  }, [theme])

  // Keep the page content correctly offset for a fixed header by
  // storing the header height in a CSS variable `--header-offset`.
  useEffect(() => {
    const setHeaderOffset = () => {
      const el = document.querySelector('header') as HTMLElement | null
      if (!el) return
      const h = Math.ceil(el.getBoundingClientRect().height)
      document.documentElement.style.setProperty('--header-offset', `${h}px`)
    }

    setHeaderOffset()
    window.addEventListener('resize', setHeaderOffset)

    const hdr = document.querySelector('header')
    let ro: ResizeObserver | null = null
    if (typeof ResizeObserver !== 'undefined' && hdr) {
      ro = new ResizeObserver(() => setHeaderOffset())
      ro.observe(hdr)
    }

    return () => {
      window.removeEventListener('resize', setHeaderOffset)
      if (ro) ro.disconnect()
    }
  }, [])

  return (
    <header className="w-full bg-gray-900/90 text-white backdrop-blur-sm sticky top-0 z-50">
      <nav className="site-header">
        <div
          className="site-brand"
          aria-label="My Portfolio"
          role="link"
          tabIndex={0}
          onClick={(e) => handleNav(e, 'home')}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault()
              handleNav(null, 'home')
            }
          }}
        >
          <img src={kermit} alt="Kermit" className="site-logo" />
          <div className="site-title">JC</div>
        </div>

        {/* navigation (always visible) */}
        <ul className="site-nav">
          {/* Home link removed; site brand is the Home link now */}
          <li>
            <a href="#skills" onClick={(e) => handleNav(e, 'skills')} aria-current={active === 'skills' ? 'page' : undefined} className={`${linkClass('skills')} px-3 py-1`}>Skills</a>
          </li>
          <li>
            <a href="#experience" onClick={(e) => handleNav(e, 'experience')} aria-current={active === 'experience' ? 'page' : undefined} className={`${linkClass('experience')} px-3 py-1`}>Experience</a>
          </li>
          <li>
            <a href="#projects" onClick={(e) => handleNav(e, 'projects')} aria-current={active === 'projects' ? 'page' : undefined} className={`${linkClass('projects')} px-3 py-1`}>Projects</a>
          </li>
          <li>
            <a href="#contacts" onClick={(e) => handleNav(e, 'contacts')} aria-current={active === 'contacts' ? 'page' : undefined} className={`${linkClass('contacts')} px-3 py-1`}>Contacts</a>
          </li>
        </ul>

        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <a className="github-link" href="https://github.com/itzdinnertime" target="_blank" rel="noopener noreferrer">
            <svg className="github-icon" viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
              <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.387.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.757-1.333-1.757-1.089-.744.083-.729.083-.729 1.205.085 1.84 1.236 1.84 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.775.418-1.305.762-1.605-2.665-.3-5.467-1.335-5.467-5.93 0-1.31.468-2.381 1.235-3.221-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.911 1.23 3.221 0 4.61-2.805 5.625-5.475 5.92.429.372.81 1.102.81 2.222 0 1.606-.015 2.896-.015 3.286 0 .315.21.694.825.576C20.565 22.092 24 17.592 24 12.297 24 5.67 18.627.297 12 .297z" />
            </svg>
            <span className="github-label">GitHub</span>
          </a>

          {/* Settings dropdown: contains theme toggle */}
          <div className="settings-dropdown">
            <button className="settings-trigger" aria-haspopup="true" aria-label="Settings">
              <svg className="settings-icon" viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
                <path d="M12 8.5A3.5 3.5 0 1 0 12 15.5 3.5 3.5 0 0 0 12 8.5zM19.4 12.9c.03-.3.05-.6.05-.9 0-.3-.02-.6-.05-.9l2.11-1.65c.19-.15.24-.42.12-.64l-2-3.46a.5.5 0 0 0-.6-.22l-2.49 1a7.12 7.12 0 0 0-1.56-.9l-.38-2.65A.5.5 0 0 0 13.5 2h-3a.5.5 0 0 0-.5.42l-.38 2.65c-.54.22-1.05.5-1.54.84l-2.5-1a.5.5 0 0 0-.6.22l-2 3.46c-.12.22-.07.49.12.64L4.6 11.1c-.03.3-.05.6-.05.9 0 .3.02.6.05.9L2.49 14.55a.5.5 0 0 0-.12.64l2 3.46c.14.24.44.34.69.22l2.49-1c.5.34 1.03.62 1.58.86l.38 2.66c.05.28.28.48.56.48h3c.28 0 .51-.2.56-.48l.38-2.66c.55-.24 1.08-.52 1.58-.86l2.49 1c.25.12.55.02.69-.22l2-3.46c.12-.22.07-.49-.12-.64L19.4 12.9z" />
              </svg>
            </button>

            <div className="settings-menu" role="menu">
              <div className="settings-row">
                <label className="settings-label">Theme</label>
                <button
                  className="theme-toggle"
                  onClick={() => setTheme((t) => (t === 'light' ? 'dark' : 'light'))}
                  aria-pressed={theme === 'light'}
                >
                  {theme === 'light' ? 'Light' : 'Dark'}
                </button>
              </div>
            </div>
          </div>
        </div>
        
      </nav>
      
    </header>
  )
}

export default Header
