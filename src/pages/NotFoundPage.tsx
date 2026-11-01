import { Link } from 'react-router'
import { AppHeader, SiteFooter, Star } from '../App'
import { ArrowIcon } from '../components/Icon'

export default function NotFoundPage() {
  return (
    <div className="page-shell" id="top">
      <AppHeader />
      <main className="not-found" id="main">
        <Star className="not-found-star not-found-star-left" />
        <p className="eyebrow">ERROR / PAGE NOT FOUND</p>
        <h1>404</h1>
        <h2>THIS STORY HAS MOVED.</h2>
        <p>The page may have been archived, renamed or removed from this edition.</p>
        <div><Link to="/">RETURN HOME</Link><Link to="/category/world">LATEST STORIES <ArrowIcon /></Link></div>
        <Star className="not-found-star not-found-star-right" />
      </main>
      <SiteFooter />
    </div>
  )
}
