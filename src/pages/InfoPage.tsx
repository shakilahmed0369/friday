import { Link, useLocation } from 'react-router'
import { AppHeader, SiteFooter } from '../App'
import { ArrowIcon } from '../components/Icon'

const pageCopy: Record<string, [string, string]> = {
  about: ['About Friday', 'Friday is an independent publication built for readers who want clarity without losing complexity.'],
  'editorial-policy': ['Editorial Policy', 'Our journalism is independent, evidence-led and transparent about sources, corrections and conflicts.'],
  privacy: ['Privacy', 'We collect only the information needed to provide and improve the Friday reading experience.'],
  terms: ['Terms', 'These terms explain the responsible use of Friday’s reporting, services and digital products.'],
  accessibility: ['Accessibility', 'Friday is committed to an inclusive reading experience that meets WCAG 2.2 AA guidance.'],
}

export default function InfoPage() {
  const page = useLocation().pathname.slice(1) || 'about'
  const [title, intro] = pageCopy[page] ?? pageCopy.about
  return (
    <div className="page-shell" id="top">
      <AppHeader />
      <main className="info-page" id="main">
        <header><p className="eyebrow">FRIDAY / COMPANY</p><h1>{title}</h1><p>{intro}</p></header>
        <article>
          <h2>Our commitment</h2>
          <p>We believe careful reporting should be accessible, accountable and useful. Every story is edited for accuracy, context and fairness before publication.</p>
          <p>Questions or feedback are always welcome. Write to <a href="mailto:hello@friday.news">hello@friday.news</a> and our team will respond.</p>
          <Link to="/">RETURN TO THE FRONT PAGE <ArrowIcon /></Link>
        </article>
      </main>
      <SiteFooter />
    </div>
  )
}
