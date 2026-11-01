import { Link } from 'react-router'
import { AppHeader, SiteFooter, Star } from '../App'
import { ArrowIcon } from '../components/Icon'

export default function ArticlePage() {
  const share = (network: string) => {
    const url = encodeURIComponent(window.location.href)
    const text = encodeURIComponent('Cities rethink public space for a changing climate')
    const destinations: Record<string, string> = {
      x: `https://x.com/intent/post?url=${url}&text=${text}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${url}`,
    }
    window.open(destinations[network], '_blank', 'noopener,noreferrer,width=720,height=560')
  }

  return (
    <div className="page-shell" id="top">
      <AppHeader />
      <main className="article-page" id="main">
        <header className="article-heading">
          <nav aria-label="Breadcrumb"><Link to="/">HOME</Link> / <Link to="/category/world">WORLD</Link> / CITIES</nav>
          <p className="eyebrow">WORLD / URBAN AFFAIRS</p>
          <h1>Cities rethink public space for a changing climate</h1>
          <p className="article-deck">From shaded streets to restored waterfronts, a quiet transformation is changing how millions of people experience urban life.</p>
          <div className="article-byline"><span>BY AMARA REED</span><span>24 JUN 2025</span><span>8 MIN READ</span><span>42 COMMENTS</span></div>
        </header>
        <figure className="article-hero">
          <img src="/news/city.jpg" alt="Modern high-rise buildings viewed from street level" />
          <figcaption>A new generation of city plans puts shade, access and public life first. Photograph: Dylann Hendricks</figcaption>
        </figure>
        <div className="article-layout">
          <aside className="share-rail" aria-label="Share article">
            <span>SHARE</span><button type="button" aria-label="Share on X" onClick={() => share('x')}>X</button><button type="button" aria-label="Share on Facebook" onClick={() => share('facebook')}>F</button><button type="button" aria-label="Share on LinkedIn" onClick={() => share('linkedin')}>IN</button>
          </aside>
          <article className="article-body">
            <p className="article-opening">The city of the near future may look surprisingly familiar. It will still have busy streets, corner shops and crowded stations. What changes is the space between them—and who that space is designed to serve.</p>
            <p>Across the world, planners are revisiting assumptions that shaped cities for much of the last century. Roads once treated primarily as channels for traffic are becoming places to pause. Vacant lots are turning into gardens. Rivers hidden behind concrete are being brought back into view.</p>
            <h2>A different measure of progress</h2>
            <p>The most ambitious projects are not always the largest. In many neighborhoods, a few trees, a safe crossing and a well-placed bench can alter the rhythm of an entire street.</p>
            <blockquote>“The best public spaces don’t tell people what to do. They make more kinds of life possible.”</blockquote>
            <p>That flexibility matters as extreme heat and heavier rainfall become part of everyday planning. Trees cool pavements, planted areas absorb water and car-free routes give emergency networks more resilience.</p>
            <figure><img src="/news/walk.jpg" alt="A pedestrian walking through a city street" loading="lazy" /><figcaption>Small changes to ordinary streets can have an outsized effect.</figcaption></figure>
            <h2>Designed with, not for</h2>
            <p>Perhaps the most important shift is procedural. Residents are being invited into the process earlier, before the major decisions are fixed. Their observations often reveal what maps and models miss.</p>
            <p>The result is a more patient kind of urbanism—one that treats the city not as a finished object, but as a living agreement between the people who share it.</p>
            <div className="article-tags"><Link to="/category/world">CITIES</Link><Link to="/category/world">CLIMATE</Link><Link to="/category/world">DESIGN</Link></div>
          </article>
          <aside className="article-sidebar">
            <p className="eyebrow">MOST READ</p>
            {['What we lose when every place looks the same', 'Five small inventions with an outsized impact', 'The case for taking the long way home'].map((story, index) => (
              <Link to="/article/cities-rethink-public-space" key={story}><span>0{index + 1}</span>{story}</Link>
            ))}
          </aside>
        </div>
        <section className="article-related">
          <header><h2>RELATED STORIES</h2><Link to="/category/world">SHOW MORE <ArrowIcon /></Link></header>
          <div>
            {[
              ['The stations worth making a journey for', '/news/station.jpg'],
              ['Why morning rituals still matter', '/news/walk.jpg'],
              ['Public buildings that make room for wonder', '/news/gallery.jpg'],
            ].map(([title, image]) => <article key={title}><Link to="/article/cities-rethink-public-space"><img src={image} alt="" /><h3>{title}</h3></Link></article>)}
            <Star small className="grid-star-edge grid-star-left" />
            <Star small className="grid-star-edge grid-star-right" />
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}
