import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router'

export default function Root() {
  const location = useLocation()

  useEffect(() => {
    const hashTarget = location.hash ? document.querySelector(location.hash) : null
    if (hashTarget) hashTarget.scrollIntoView({ behavior: 'smooth' })
    else window.scrollTo({ top: 0, behavior: 'instant' })
    const segments = location.pathname.split('/').filter(Boolean)
    const section = segments.at(-1)
    document.title = section ? `${section.replaceAll('-', ' ')} — FRIDAY` : 'FRIDAY — Independent journalism'
  }, [location.pathname, location.search, location.hash])

  return <Outlet />
}
