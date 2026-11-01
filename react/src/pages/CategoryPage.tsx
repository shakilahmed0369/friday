import { useState } from 'react'
import { Link, useParams, useSearchParams } from 'react-router'
import { AppHeader, SiteFooter, Star } from '../App'
import { ArrowIcon } from '../components/Icon'

const stories = [
  ['Coastal cities unite around a bold new resilience plan', '/news/city.jpg', '24 JUN 2025'],
  ['The night train routes reconnecting a continent', '/news/station.jpg', '23 JUN 2025'],
  ['Inside the public spaces transforming daily life', '/news/gallery.jpg', '21 JUN 2025'],
  ['A new generation of leaders takes on local change', '/news/portrait.jpg', '19 JUN 2025'],
  ['How communities are restoring shared waterfronts', '/news/walk.jpg', '18 JUN 2025'],
  ['The cultural institutions opening their archives', '/news/culture.jpg', '16 JUN 2025'],
]

export default function CategoryPage() {
  const { slug = 'world' } = useParams()
  const [searchParams] = useSearchParams()
  const [activeTopic, setActiveTopic] = useState('Latest')
  const title = slug.charAt(0).toUpperCase() + slug.slice(1)
  const query = searchParams.get('q')

  return (
    <div className="page-shell" id="top">
      <AppHeader />
      <main className="inner-page" id="main">
        <header className="category-page-heading">
          <div><p className="eyebrow">{query ? 'SEARCH RESULTS / 6 STORIES' : 'SECTION / 42 STORIES'}</p><h1>{query ? 'Search' : title}</h1></div>
          <p>{query ? `Stories matching “${query}”, selected from the Friday archive.` : `The latest ${title.toLowerCase()} reporting and analysis, selected by our editors for clarity, consequence and context.`}</p>
        </header>
        <nav className="topic-chips" aria-label={`${title} topics`}>
          {['Latest', 'Politics', 'Climate', 'Cities', 'Culture'].map((topic) => (
            <button type="button" className={activeTopic === topic ? 'active' : ''} aria-pressed={activeTopic === topic} onClick={() => setActiveTopic(topic)} key={topic}>{topic}</button>
          ))}
        </nav>
        <section className="category-lead">
          <article>
            <Link to="/article/cities-rethink-public-space"><img src="/news/city.jpg" alt="High-rise buildings against the sky" /></Link>
            <p className="meta">— {title} ● BY THE EDITORS ● 24 JUN 2025</p>
            <h2><Link to="/article/cities-rethink-public-space">Cities rethink public space for a changing climate</Link></h2>
            <p>From shaded streets to restored waterfronts, urban leaders are making public space central to the next era of city life.</p>
          </article>
          <aside>
            {stories.slice(1, 3).map(([story, image, date]) => (
              <article key={story}>
                <Link to="/article/cities-rethink-public-space"><img src={image} alt="" /></Link>
                <time>{date}</time>
                <h3><Link to="/article/cities-rethink-public-space">{story}</Link></h3>
              </article>
            ))}
          </aside>
        </section>
        <div className="listing-toolbar"><span>{activeTopic.toUpperCase()} {title.toUpperCase()} NEWS</span><span>NEWEST FIRST <ArrowIcon direction="down" /></span></div>
        <section className="listing-grid">
          {stories.map(([story, image, date]) => (
            <article key={story}>
              <Link to="/article/cities-rethink-public-space"><img src={image} alt="" loading="lazy" /></Link>
              <time>{date}</time>
              <h3><Link to="/article/cities-rethink-public-space">{story}</Link></h3>
              <p>Essential reporting, context and analysis from our newsroom.</p>
              <Link className="listing-arrow" to="/article/cities-rethink-public-space" aria-label={`Read: ${story}`}><ArrowIcon direction="up-right" /></Link>
            </article>
          ))}
          <Star small className="grid-star grid-star-left" />
          <Star small className="grid-star grid-star-right" />
        </section>
        <div className="load-more"><p>END OF CURRENT EDITION — 6 STORIES</p></div>
      </main>
      <SiteFooter />
    </div>
  )
}
