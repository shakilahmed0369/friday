import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Link, useLocation, useNavigate } from 'react-router'
import { ArrowIcon, PlayIcon, SearchIcon, UserIcon } from './components/Icon'

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin)

const photos = {
  city: '/news/city.jpg',
  escalator: '/news/escalator.jpg',
  station: '/news/station.jpg',
  walk: '/news/walk.jpg',
  portrait: '/news/portrait.jpg',
  gallery: '/news/gallery.jpg',
  culture: '/news/culture.jpg',
}

const headlines = [
  ['Business', 'Markets brace for a decisive week as investors seek a clearer signal'],
  ['Travel', 'The night train revival is redrawing the map of European travel'],
  ['Technology', 'A quieter kind of innovation is changing the shape of our cities'],
  ['Culture', 'Inside the archives preserving the everyday stories of a generation'],
]

const cards = [
  { category: 'Lifestyle', count: '76', title: 'Why the simple rituals of morning still matter', image: photos.walk },
  { category: 'World', count: '42', title: 'Cities rethink public space for a changing climate', image: photos.city },
  { category: 'Travel', count: '31', title: 'The stations worth making a journey for', image: photos.station },
]

const categoryNews = [
  {
    category: 'World',
    posts: [
      { title: 'Coastal cities unite around a new resilience plan', date: '24 JUN 2025', image: photos.city },
      { title: 'The night train routes reconnecting a continent', date: '23 JUN 2025', image: photos.station },
      { title: 'Inside the public spaces transforming daily life', date: '21 JUN 2025', image: photos.gallery },
      { title: 'A new generation of leaders takes on local change', date: '19 JUN 2025', image: photos.portrait },
      { title: 'How communities are restoring their shared waterfronts', date: '18 JUN 2025', image: photos.walk },
      { title: 'The cultural institutions opening their archives', date: '16 JUN 2025', image: photos.culture },
    ],
  },
  {
    category: 'Business',
    posts: [
      { title: 'Independent makers find strength in local markets', date: '24 JUN 2025', image: photos.walk },
      { title: 'The new offices designed around deep focus', date: '22 JUN 2025', image: photos.escalator },
      { title: 'Why patient companies are winning loyal customers', date: '20 JUN 2025', image: photos.culture },
      { title: 'Small manufacturers rethink the global supply chain', date: '19 JUN 2025', image: photos.station },
      { title: 'The founders putting long-term value before growth', date: '17 JUN 2025', image: photos.portrait },
      { title: 'City-center shops find a second life after dark', date: '15 JUN 2025', image: photos.city },
    ],
  },
  {
    category: 'Technology',
    posts: [
      { title: 'A quieter generation of technology is taking shape', date: '23 JUN 2025', image: photos.escalator },
      { title: 'How city data can serve the people who create it', date: '21 JUN 2025', image: photos.city },
      { title: 'The small tools changing how creative teams work', date: '18 JUN 2025', image: photos.gallery },
      { title: 'Inside the labs making batteries last much longer', date: '17 JUN 2025', image: photos.culture },
      { title: 'Why the next interface may barely need a screen', date: '16 JUN 2025', image: photos.walk },
      { title: 'A practical guide to a calmer digital routine', date: '14 JUN 2025', image: photos.station },
    ],
  },
]

function Mark() {
  return (
    <svg className="mark" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 0C12.6 7 17 11.4 24 12 17 12.6 12.6 17 12 24 11.4 17 7 12.6 0 12 7 11.4 11.4 7 12 0Z" fill="currentColor" />
    </svg>
  )
}

export function Star({ small = false, className = '' }: { small?: boolean; className?: string }) {
  return (
    <svg className={`star ${small ? 'star-small' : ''} ${className}`} viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 0C12.6 7 17 11.4 24 12 17 12.6 12.6 17 12 24 11.4 17 7 12.6 0 12 7 11.4 11.4 7 12 0Z" />
    </svg>
  )
}

function Meta({ category, date = '24 JUN 2025' }: { category: string; date?: string }) {
  return <p className="meta">— {category} <b>●</b> BY THE EDITORS <b>●</b> {date}</p>
}

export function AppHeader() {
  const [open, setOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  const nav = ['Home', 'World', 'Business', 'Travel', 'Tech', 'Fashion', 'Lifestyle']

  return (
    <header className="header">
      <a className="skip-link" href="#main">Skip to content</a>
      <div className="masthead">
        <Link className="brand" to="/" aria-label="Friday home">
          <Mark />
          <span>FRIDAY</span>
        </Link>
        <p>INDEPENDENT JOURNALISM<br />FOR A CURIOUS WORLD</p>
        <p className="issue">TUESDAY, JUNE 24<br />EDITION № 218</p>
        <div className="masthead-actions">
          <button
            className="mobile-search-button"
            type="button"
            aria-label={searchOpen ? 'Close search' : 'Open search'}
            aria-expanded={searchOpen}
            onClick={() => {
              if (!searchOpen) setOpen(false)
              setSearchOpen((val) => !val)
            }}
          >
            <SearchIcon />
          </button>
          <Link
            className="mobile-auth-link"
            to="/sign-in"
            aria-label="Sign in"
            onClick={() => setOpen(false)}
          >
            <UserIcon />
          </Link>
          <button
            className="menu-button"
            type="button"
            onClick={() => {
              if (!open) setSearchOpen(false)
              setOpen(!open)
            }}
            aria-expanded={open}
          >
            {open ? 'CLOSE' : 'MENU'}
          </button>
        </div>
      </div>
      <nav className={open ? 'nav nav-open' : 'nav'} aria-label="Main navigation">
        {nav.map((item, index) => {
          const path = index === 0 ? '/' : `/category/${item.toLowerCase()}`
          return <Link key={item} className={location.pathname === path ? 'active' : ''} to={path} onClick={() => setOpen(false)} aria-current={location.pathname === path ? 'page' : undefined}>{item}</Link>
        })}
        <button className="search" type="button" aria-label={searchOpen ? 'Close search' : 'Open search'} aria-expanded={searchOpen} onClick={() => setSearchOpen((value) => !value)}><SearchIcon /></button>
        <Link className="sign-in" to="/sign-in">Sign in</Link>
      </nav>
      {searchOpen && (
        <form
          className="header-search-panel"
          role="search"
          onSubmit={(event) => {
            event.preventDefault()
            const query = new FormData(event.currentTarget).get('q')?.toString().trim()
            if (query) navigate(`/category/world?q=${encodeURIComponent(query)}`)
            setSearchOpen(false)
          }}
        >
          <label htmlFor="site-search">SEARCH THE FRIDAY ARCHIVE</label>
          <input id="site-search" name="q" type="search" placeholder="TYPE A TOPIC, PLACE OR AUTHOR" autoFocus />
          <button type="submit">SEARCH <ArrowIcon /></button>
        </form>
      )}
    </header>
  )
}

function Hero() {
  const [slide, setSlide] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [isInteracting, setIsInteracting] = useState(false)
  const slides = [
    { image: photos.escalator, kicker: 'The Weekender', title: 'Designing cities for the way we move now' },
    { image: photos.station, kicker: 'Field Notes', title: 'The railway journeys finding a new audience' },
    { image: photos.city, kicker: 'Architecture', title: 'Looking up: the return of ambitious skylines' },
  ]
  const change = (direction: number) =>
    setSlide((current) => (current + direction + slides.length) % slides.length)

  useEffect(() => {
    if (isPaused || isInteracting || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const timer = window.setInterval(() => change(1), 5000)
    return () => window.clearInterval(timer)
  }, [isPaused, isInteracting, slide])

  return (
    <section className="hero" aria-labelledby="today-title">
      <div className="lead cell">
        <p className="eyebrow">THE FRONT PAGE / VOL. 04</p>
        <h1 id="today-title">TODAY’S<br />NEWS</h1>
        <Meta category="WORLD" />
        <h2>A new era of urban life is already taking shape</h2>
        <p className="intro">Across the world, the old rules of city living are being rewritten. From shared streets to greener skylines, a bold experiment is underway.</p>
        <figure className="crop-frame">
          <img src={photos.city} alt="High-rise buildings reaching into a pale sky" />
          <span className="crop tl" /><span className="crop tr" /><span className="crop bl" /><span className="crop br" />
        </figure>
      </div>

      <div className="headlines">
        <div className="column-label"><span>THE LATEST</span><span>08 STORIES</span></div>
        {headlines.map(([category, title]) => (
          <a className="headline" href="#latest" key={title}>
            <Meta category={category} />
            <h3>{title}</h3>
            <span className="arrow"><ArrowIcon direction="up-right" /></span>
          </a>
        ))}
      </div>

      <div
        className="feature cell"
        onMouseEnter={() => setIsInteracting(true)}
        onMouseLeave={() => setIsInteracting(false)}
        onFocusCapture={() => setIsInteracting(true)}
        onBlurCapture={() => setIsInteracting(false)}
        aria-roledescription="carousel"
        aria-label="Featured stories"
      >
        <div className="feature-top">
          <span>FEATURED</span>
          <button type="button" onClick={() => setIsPaused((paused) => !paused)} aria-label={isPaused ? 'Play carousel' : 'Pause carousel'}>
            {isPaused ? 'PLAY' : 'PAUSE'}
          </button>
          <span>0{slide + 1} / 0{slides.length}</span>
        </div>
        <div className="stacked-photo">
          <img className="feature-slide-media" key={slides[slide].image} src={slides[slide].image} alt="" />
          <span className="fold" />
        </div>
        <div className="feature-slide-copy" key={slides[slide].title}>
          <Meta category={slides[slide].kicker} />
          <h2>{slides[slide].title}</h2>
        </div>
        <div className="slide-controls">
          <button type="button" onClick={() => change(-1)} aria-label="Previous story"><ArrowIcon direction="left" /></button>
          <span><i style={{ width: `${((slide + 1) / slides.length) * 100}%` }} /></span>
          <button type="button" onClick={() => change(1)} aria-label="Next story"><ArrowIcon /></button>
        </div>
      </div>
      <Star />
    </section>
  )
}

function Ticker() {
  const items = [
    'Markets open higher following overnight talks',
    'Coastal cities announce shared climate plan',
    'World leaders gather for a new round of talks',
  ]

  return (
    <div className="ticker" aria-label="Breaking news">
      <div className="ticker-track" aria-hidden="true">
        {[0, 1].map((copy) => (
          <div className="ticker-group" key={copy}>
            {items.map((item) => (
              <span className="ticker-item" key={`${copy}-${item}`}>
                <strong>BREAKING NEWS</strong>
                <svg className="ticker-star" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12 0C12.6 7 17 11.4 24 12 17 12.6 12.6 17 12 24 11.4 17 7 12.6 0 12 7 11.4 11.4 7 12 0Z" />
                </svg>
                {item}
                <svg className="ticker-star" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12 0C12.6 7 17 11.4 24 12 17 12.6 12.6 17 12 24 11.4 17 7 12.6 0 12 7 11.4 11.4 7 12 0Z" />
                </svg>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

function StoryCard({ card }: { card: (typeof cards)[number] }) {
  return (
    <article className="story-card">
      <div className="section-label"><span>{card.category} <sup>{card.count}</sup></span><Link to={`/category/${card.category.toLowerCase()}`}>VIEW ALL <ArrowIcon /></Link></div>
      <div className="photo-print"><img src={card.image} alt="" loading="lazy" /></div>
      <Meta category={card.category} />
      <h3>{card.title}</h3>
      <Link className="card-arrow" to="/article/cities-rethink-public-space" aria-label={`Read: ${card.title}`}><ArrowIcon direction="up-right" /></Link>
    </article>
  )
}

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-grid">
        <div className="footer-brand">
          <Link className="brand" to="/" aria-label="Friday home"><Mark /><span>FRIDAY</span></Link>
          <p>Independent reporting for a curious world. Published every day, with context.</p>
        </div>
        <nav aria-label="Footer sections"><b>SECTIONS</b><Link to="/category/world">World</Link><Link to="/category/business">Business</Link><Link to="/category/tech">Technology</Link></nav>
        <nav aria-label="Footer company"><b>COMPANY</b><a href="mailto:hello@friday.news">Contact</a><Link to="/editorial-policy">Editorial policy</Link><Link to="/about">About Friday</Link></nav>
        <nav aria-label="Footer legal"><b>LEGAL</b><Link to="/privacy">Privacy</Link><Link to="/terms">Terms</Link><Link to="/accessibility">Accessibility</Link></nav>
      </div>
      <div className="footer-wordmark">FRIDAY</div>
    </footer>
  )
}

export default function HomePage() {
  const appRef = useRef<HTMLDivElement>(null)
  const [subscribed, setSubscribed] = useState(false)

  useLayoutEffect(() => {
    const root = appRef.current
    if (!root || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const cleanups: Array<() => void> = []
    const context = gsap.context(() => {
      // Pure opacity fade without vertical movement to prevent layout jumps on reload
      gsap
        .timeline({ defaults: { ease: 'power2.out' } })
        .fromTo(
          '.lead > .eyebrow, .lead > h1, .lead > .meta, .lead > h2, .lead > .intro',
          { opacity: 0 },
          { opacity: 1, duration: 0.35, stagger: 0.03, clearProps: 'opacity' },
        )
        .fromTo(
          '.crop-frame, .headlines, .feature',
          { opacity: 0 },
          { opacity: 1, duration: 0.4, stagger: 0.04, clearProps: 'opacity' },
          '-=.25',
        )

      const revealSections = root.querySelectorAll<HTMLElement>(
        '.breaking-section, .category-news-group, .statement, .card-grid, .editors-picks, .most-read, .opinion, .visual-stories, .newsletter'
      )

      revealSections.forEach((section) => {
        const heading = section.querySelector<HTMLElement>('.section-heading, header')
        const cards = section.querySelectorAll<HTMLElement>(
          '.breaking-lead, .breaking-updates article, .category-posts article, .story-card, .editor-lead, .editor-list article, .most-read li, .opinion article, .visual-main, .visual-side, .video-card'
        )

        const sectionTl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: 'top 88%',
            once: true,
          },
        })

        if (heading) {
          sectionTl.fromTo(
            heading,
            { opacity: 0, y: 12 },
            { opacity: 1, y: 0, duration: 0.45, ease: 'power2.out', clearProps: 'transform,opacity' }
          )
        }

        if (cards.length > 0) {
          sectionTl.fromTo(
            cards,
            { opacity: 0, y: 12 },
            {
              opacity: 1,
              y: 0,
              duration: 0.45,
              stagger: 0.04,
              ease: 'power2.out',
              clearProps: 'transform,opacity',
            },
            heading ? '-=0.25' : 0
          )
        }
      })

      window.addEventListener('load', () => {
        ScrollTrigger.refresh()
      })

      root.querySelectorAll<HTMLAnchorElement>('a[href^="#"]').forEach((link) => {
        const onClick = (event: MouseEvent) => {
          const href = link.getAttribute('href')
          if (!href || href === '#') return
          const target = root.querySelector<HTMLElement>(href)
          if (!target) return
          event.preventDefault()
          gsap.to(window, { scrollTo: { y: target, offsetY: 24 }, duration: 0.9, ease: 'power3.inOut' })
        }
        link.addEventListener('click', onClick)
        cleanups.push(() => link.removeEventListener('click', onClick))
      })

      root
        .querySelectorAll<HTMLElement>('.story-card, .category-posts article, .editor-list article, .video-card')
        .forEach((card) => {
          const image = card.querySelector('img')
          const arrow = card.querySelector<HTMLElement>('.card-arrow, .category-post-arrow, .arrow')
          const enter = () => {
            if (image) gsap.to(image, { scale: 1.035, duration: 0.4, ease: 'power2.out' })
            if (arrow) gsap.to(arrow, { x: 4, y: -4, duration: 0.25, ease: 'power2.out' })
          }
          const leave = () => {
            if (image) gsap.to(image, { scale: 1, duration: 0.45, ease: 'power2.out' })
            if (arrow) gsap.to(arrow, { x: 0, y: 0, duration: 0.3, ease: 'power2.out' })
          }
          card.addEventListener('pointerenter', enter)
          card.addEventListener('pointerleave', leave)
          cleanups.push(() => {
            card.removeEventListener('pointerenter', enter)
            card.removeEventListener('pointerleave', leave)
          })
        })
    }, root)

    return () => {
      cleanups.forEach((cleanup) => cleanup())
      context.revert()
    }
  }, [])

  return (
    <div className="page-shell" ref={appRef}>
      <AppHeader />
      <main id="main">
        <Hero />
        <Ticker />
        <section className="breaking-section" aria-labelledby="breaking-title">
          <header className="section-heading">
            <div>
              <p className="eyebrow">LIVE / DEVELOPING</p>
              <h2 id="breaking-title">BREAKING NEWS</h2>
            </div>
            <Link to="/category/world">VIEW ALL UPDATES <ArrowIcon /></Link>
          </header>
          <div className="breaking-grid">
            <article className="breaking-lead">
              <Link className="breaking-image" to="/article/cities-rethink-public-space">
                <img src={photos.city} alt="City skyline viewed between modern buildings" />
                <span>LIVE</span>
              </Link>
              <div>
                <p className="meta">— WORLD ● UPDATED 4 MIN AGO</p>
                <h3><Link to="/article/cities-rethink-public-space">World leaders gather for an emergency round of climate talks</Link></h3>
                <p>Follow the latest developments, statements and analysis from our correspondents on the ground.</p>
              </div>
            </article>
            <div className="breaking-updates">
              {[
                ['11:42', 'Coastal cities announce a shared resilience agreement'],
                ['11:18', 'Markets respond as the first joint statement is released'],
                ['10:51', 'Delegates outline the priorities shaping today’s talks'],
                ['10:26', 'What to know as leaders arrive for the summit'],
              ].map(([time, title], index) => (
                <article key={title}>
                  <time>{time}</time>
                  <div><span>UPDATE {index + 1}</span><h3><Link to="/article/cities-rethink-public-space">{title}</Link></h3></div>
                  <Link to="/article/cities-rethink-public-space" aria-label={`Read update: ${title}`}><ArrowIcon direction="up-right" /></Link>
                </article>
              ))}
            </div>
            <Star className="star-breaking" />
          </div>
        </section>
        <section className="news-by-category" aria-labelledby="category-news-title">
          <div className="news-by-category-intro section-heading">
            <div>
              <p className="eyebrow">THE FRIDAY EDIT</p>
              <h2 id="category-news-title">NEWS BY CATEGORY</h2>
            </div>
          </div>
          {categoryNews.map((group) => (
            <section className="category-news-group" key={group.category} aria-labelledby={`${group.category.toLowerCase()}-news`}>
              <header>
                <h3 id={`${group.category.toLowerCase()}-news`}>{group.category}</h3>
                <Link to={`/category/${group.category.toLowerCase()}`}>SHOW MORE <ArrowIcon /></Link>
              </header>
              <div className="category-posts">
                {group.posts.map((post) => (
                  <article key={post.title}>
                    <Link className="category-post-image" to="/article/cities-rethink-public-space">
                      <img src={post.image} alt="" loading="lazy" />
                    </Link>
                    <time dateTime="2025-06-24">{post.date}</time>
                    <h4><Link to="/article/cities-rethink-public-space">{post.title}</Link></h4>
                    <Link className="category-post-arrow" to="/article/cities-rethink-public-space" aria-label={`Read: ${post.title}`}><ArrowIcon direction="up-right" /></Link>
                  </article>
                ))}
                <Star small className="grid-star grid-star-left" />
                <Star small className="grid-star grid-star-right" />
              </div>
            </section>
          ))}
        </section>
        <section className="statement section-heading">
          <div>
            <p className="eyebrow">EXPLORE THE NEWSROOM</p>
            <h2>FEATURED <u>CATEGORIES</u></h2>
          </div>
          <div className="scroll-badge" aria-hidden="true">
            <span>
              <svg viewBox="0 0 100 100">
                <defs><path id="scroll-circle" d="M50,50 m-36,0 a36,36 0 1,1 72,0 a36,36 0 1,1 -72,0" /></defs>
                <text>
                  <textPath href="#scroll-circle" textLength="226" lengthAdjust="spacingAndGlyphs">
                    SCROLL DOWN • KEEP READING •
                  </textPath>
                </text>
              </svg>
            </span>
            <b><ArrowIcon direction="down" /></b>
          </div>
        </section>
        <section className="card-grid" id="latest" aria-label="Latest stories">
          {cards.map((card) => <StoryCard key={card.category} card={card} />)}
          <Star small className="grid-star-edge grid-star-left" />
          <Star small className="grid-star-edge grid-star-right" />
        </section>
        <section className="editors-picks" aria-labelledby="editors-title">
          <header className="band-heading section-heading">
            <div><p className="eyebrow">CURATED BY OUR NEWSROOM</p><h2 id="editors-title">EDITOR’S PICKS</h2></div>
            <Link to="/category/world">VIEW ALL STORIES <ArrowIcon /></Link>
          </header>
          <div className="editor-grid">
            <article className="editor-lead">
              <img src={photos.gallery} alt="A lone figure walking through a geometric hallway" loading="lazy" />
              <div><Meta category="Culture" /><h3>The public buildings that make room for wonder</h3><p>From libraries to stations, the spaces proving that thoughtful design still belongs to everyone.</p></div>
            </article>
            <div className="editor-list">
              {[
                ['Science', 'The deep-sea mission rewriting what we know about life below'],
                ['Business', 'Independent makers are finding strength in smaller markets'],
                ['Technology', 'Can quieter technology help us reclaim our attention?'],
              ].map(([category, title], index) => (
                <article key={title}><span>0{index + 1}</span><div><Meta category={category} /><h3>{title}</h3></div><Link to="/article/cities-rethink-public-space" aria-label={`Read: ${title}`}><ArrowIcon direction="up-right" /></Link></article>
              ))}
            </div>
            <Star className="star-editor" />
          </div>
        </section>
        <section className="most-read">
          <div className="section-heading section-heading-rail">
            <p className="eyebrow">THE READING LIST</p>
            <h2>MOST<br />READ</h2>
          </div>
          <ol>
            {['What we lose when every place starts to look the same', 'Five small inventions with an outsized impact', 'The case for taking the long way home'].map((title, i) => (
              <li key={title}><span>0{i + 1}</span><Link to="/article/cities-rethink-public-space">{title}</Link><b><ArrowIcon direction="up-right" /></b></li>
            ))}
          </ol>
        </section>
        <section className="opinion" aria-labelledby="opinion-title">
          <div className="opinion-intro section-heading section-heading-rail">
            <p className="eyebrow">VOICES & PERSPECTIVES</p>
            <h2 id="opinion-title">OPINION</h2>
            <Link to="/category/opinion">ALL COLUMNS <ArrowIcon /></Link>
          </div>
          <article>
            <img src={photos.portrait} alt="Portrait of columnist Amara Reed" loading="lazy" />
            <div>
              <p className="quote-mark">“</p>
              <h3>We don’t need smarter cities. We need cities that listen.</h3>
              <p className="opinion-copy">The best urban ideas begin not with technology, but with the ordinary expertise of the people who live there.</p>
              <p className="meta">AMARA REED · URBAN AFFAIRS COLUMNIST</p>
            </div>
          </article>
          <Star className="star-opinion" />
        </section>
        <section className="visual-stories" aria-labelledby="visual-title">
          <header className="band-heading section-heading">
            <div><p className="eyebrow">WATCH / EXPLORE</p><h2 id="visual-title">VISUAL STORIES</h2></div>
            <span className="meta">VIDEO & PHOTOGRAPHY</span>
          </header>
          <div className="visual-grid">
            <Link className="visual-main" to="/article/cities-rethink-public-space" aria-label="Play video: A city in motion">
              <div className="visual-image">
                <img src={photos.culture} alt="Woman standing in front of an urban storefront" loading="lazy" />
                <span className="play"><PlayIcon /></span>
              </div>
            </Link>
            <div className="visual-right">
              <Link className="visual-side" to="/article/cities-rethink-public-space" aria-label="Play video: The rituals of the daily commute">
                <div className="visual-image">
                  <img src={photos.station} alt="Passengers moving through a railway station" loading="lazy" />
                  <span className="play"><PlayIcon /></span>
                </div>
              </Link>
              <div className="video-row">
                {[
                  {
                    image: '/news/video-city.jpg',
                    alt: 'Crowds moving along a city pavement',
                    title: 'The corner where the whole city seems to meet',
                    date: '24 JUN 2025',
                  },
                  {
                    image: '/news/video-plaza.jpg',
                    alt: 'A person crossing a modern urban plaza',
                    title: 'Building public spaces that invite us to stay',
                    date: '22 JUN 2025',
                  },
                  {
                    image: '/news/video-portrait.jpg',
                    alt: 'Portrait of an older man on a city street',
                    title: 'The people keeping neighborhood stories alive',
                    date: '19 JUN 2025',
                  },
                ].map((video) => (
                  <Link className="video-card" to="/article/cities-rethink-public-space" key={video.title} aria-label={`Play video: ${video.title}`}>
                    <div className="visual-image">
                      <img src={video.image} alt={video.alt} loading="lazy" />
                      <span className="play play-small"><PlayIcon /></span>
                    </div>
                    <div className="video-list-copy">
                      <h3>{video.title}</h3>
                      <time dateTime="2025-06-24">{video.date}</time>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
            <Star className="star-visual" />
          </div>
        </section>
        <section className="newsletter" id="newsletter">
          <p className="eyebrow">THE MORNING EDITION</p>
          <h2>THE DAY, EDITED.</h2>
          <p>Essential news and original reporting, delivered before your first coffee.</p>
          <form
            onSubmit={(event) => {
              event.preventDefault()
              const form = event.currentTarget
              const input = form.querySelector<HTMLInputElement>('input[type="email"]')
              if (!input?.value) return
              setSubscribed(true)
              input.value = ''
              setTimeout(() => setSubscribed(false), 4000)
            }}
          >
            <label htmlFor="email">EMAIL ADDRESS</label>
            <input id="email" type="email" placeholder="you@example.com" required />
            <button type="submit" disabled={subscribed}>
              {subscribed ? 'SUBSCRIBED ✓' : <>JOIN THE LIST <ArrowIcon /></>}
            </button>
          </form>
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}
