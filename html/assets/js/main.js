/**
 * FRIDAY — Editorial Newspaper Static Site
 * Handles:
 *  - Header mobile drawer toggle
 *  - Archive search toggle & query submission
 *  - Reading progress indicator
 *  - Hero featured story carousel (auto-advance, pause/play, timer bar)
 *  - GSAP entrance & ScrollTrigger animations
 *  - Smooth anchor link navigation
 *  - Hover micro-interactions
 *  - Single-page category controller (handles ?c=... and ?q=...)
 *  - Article social sharing popups
 *  - Auth form preview submission
 *  - Newsletter subscribe handling
 */

document.addEventListener('DOMContentLoaded', () => {
  initSmoothScroll();
  initMobileNav();
  initSearch();
  initReadingProgress();
  initHeroCarousel();
  initGsapAnimations();
  initHoverEffects();
  initCategoryPage();
  initArticleShare();
  initAuthForm();
  initNewsletter();
});

/* -------------------------------------------------------------------------- */
/* 1. Header Mobile Navigation                                                */
/* -------------------------------------------------------------------------- */
function initMobileNav() {
  const menuBtn = document.querySelector('.menu-button');
  const nav = document.querySelector('.nav');
  if (!menuBtn || !nav) return;

  menuBtn.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('nav-open');
    menuBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    menuBtn.textContent = isOpen ? 'CLOSE' : 'MENU';
  });

  nav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      nav.classList.remove('nav-open');
      menuBtn.setAttribute('aria-expanded', 'false');
      menuBtn.textContent = 'MENU';
    });
  });
}

/* -------------------------------------------------------------------------- */
/* 2. Header Search Bar                                                       */
/* -------------------------------------------------------------------------- */
function initSearch() {
  const searchBtn = document.querySelector('button.search');
  const searchPanel = document.querySelector('.header-search-panel');
  if (!searchBtn || !searchPanel) return;

  const toggleSearch = (forceState) => {
    const isVisible = forceState !== undefined ? forceState : searchPanel.hasAttribute('hidden');
    if (isVisible) {
      searchPanel.removeAttribute('hidden');
      searchBtn.setAttribute('aria-expanded', 'true');
      searchBtn.setAttribute('aria-label', 'Close search');
      const input = searchPanel.querySelector('input[name="q"]');
      if (input) input.focus();
    } else {
      searchPanel.setAttribute('hidden', '');
      searchBtn.setAttribute('aria-expanded', 'false');
      searchBtn.setAttribute('aria-label', 'Open search');
    }
  };

  searchBtn.addEventListener('click', (e) => {
    e.preventDefault();
    toggleSearch();
  });

  searchPanel.addEventListener('submit', (e) => {
    e.preventDefault();
    const input = searchPanel.querySelector('input[name="q"]');
    const query = input ? input.value.trim() : '';
    window.location.href = 'category.html' + (query ? `?q=${encodeURIComponent(query)}` : '');
  });
}

/* -------------------------------------------------------------------------- */
/* 3. Reading Progress Bar                                                    */
/* -------------------------------------------------------------------------- */
function initReadingProgress() {
  const progressBar = document.querySelector('.reading-progress');
  if (!progressBar) return;

  const updateProgress = () => {
    const scrollTotal = document.documentElement.scrollHeight - window.innerHeight;
    const progress = scrollTotal > 0 ? Math.min(Math.max(window.scrollY / scrollTotal, 0), 1) : 0;
    progressBar.style.transform = `scaleX(${progress})`;
  };

  window.addEventListener('scroll', updateProgress, { passive: true });
  window.addEventListener('resize', updateProgress, { passive: true });
  if (typeof lenis !== 'undefined' && lenis) {
    lenis.on('scroll', updateProgress);
  }
  updateProgress();
}

/* -------------------------------------------------------------------------- */
/* 4. Hero Featured Carousel                                                  */
/* -------------------------------------------------------------------------- */
function initHeroCarousel() {
  const featureEl = document.querySelector('.feature.cell');
  if (!featureEl) return;

  const slides = [
    {
      image: 'news/escalator.jpg',
      kicker: 'The Weekender',
      title: 'Designing cities for the way we move now',
    },
    {
      image: 'news/station.jpg',
      kicker: 'Field Notes',
      title: 'The railway journeys finding a new audience',
    },
    {
      image: 'news/city.jpg',
      kicker: 'Architecture',
      title: 'Looking up: the return of ambitious skylines',
    },
  ];

  let currentSlide = 0;
  let isPaused = false;
  let isInteracting = false;
  let timerId = null;

  const countEl = featureEl.querySelector('.feature-top span:last-child');
  const pauseBtn = featureEl.querySelector('.feature-top button');
  const imgEl = featureEl.querySelector('.stacked-photo img');
  const kickerEl = featureEl.querySelector('.feature-slide-copy .meta');
  const titleEl = featureEl.querySelector('.feature-slide-copy h2');
  const barEl = featureEl.querySelector('.slide-controls i');
  const prevBtn = featureEl.querySelector('.slide-controls button[aria-label="Previous story"]');
  const nextBtn = featureEl.querySelector('.slide-controls button[aria-label="Next story"]');

  const updateSlide = (index) => {
    currentSlide = (index + slides.length) % slides.length;
    const item = slides[currentSlide];

    if (countEl) countEl.textContent = `0${currentSlide + 1} / 0${slides.length}`;
    if (kickerEl) kickerEl.innerHTML = `— ${item.kicker.toUpperCase()} <b>●</b> BY THE EDITORS <b>●</b> 24 JUN 2025`;
    if (titleEl) titleEl.textContent = item.title;
    if (barEl) barEl.style.width = `${((currentSlide + 1) / slides.length) * 100}%`;

    if (imgEl) {
      imgEl.src = item.image;
      imgEl.classList.remove('feature-slide-media');
      void imgEl.offsetWidth;
      imgEl.classList.add('feature-slide-media');
    }

    const copyEl = featureEl.querySelector('.feature-slide-copy');
    if (copyEl) {
      copyEl.classList.remove('feature-slide-copy-animate');
      void copyEl.offsetWidth;
      copyEl.classList.add('feature-slide-copy-animate');
    }
  };

  const next = () => updateSlide(currentSlide + 1);
  const prev = () => updateSlide(currentSlide - 1);

  const startTimer = () => {
    stopTimer();
    if (isPaused || isInteracting || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    timerId = window.setInterval(next, 5000);
  };

  const stopTimer = () => {
    if (timerId) {
      clearInterval(timerId);
      timerId = null;
    }
  };

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      prev();
      startTimer();
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      next();
      startTimer();
    });
  }

  if (pauseBtn) {
    pauseBtn.addEventListener('click', () => {
      isPaused = !isPaused;
      pauseBtn.textContent = isPaused ? 'PLAY' : 'PAUSE';
      pauseBtn.setAttribute('aria-label', isPaused ? 'Play carousel' : 'Pause carousel');
      if (isPaused) stopTimer();
      else startTimer();
    });
  }

  featureEl.addEventListener('mouseenter', () => {
    isInteracting = true;
    stopTimer();
  });
  featureEl.addEventListener('mouseleave', () => {
    isInteracting = false;
    startTimer();
  });
  featureEl.addEventListener('focusin', () => {
    isInteracting = true;
    stopTimer();
  });
  featureEl.addEventListener('focusout', () => {
    isInteracting = false;
    startTimer();
  });

  updateSlide(0);
  startTimer();
}

/* -------------------------------------------------------------------------- */
/* 5. GSAP Entrance and Scroll Animations                                     */
/* -------------------------------------------------------------------------- */
function initGsapAnimations() {
  if (typeof gsap === 'undefined' || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return;
  }

  if (typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
  }
  if (typeof ScrollToPlugin !== 'undefined') {
    gsap.registerPlugin(ScrollToPlugin);
  }

  const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

  if (document.querySelector('.masthead')) {
    tl.from('.masthead > *', { y: -14, opacity: 0, duration: 0.55, stagger: 0.07 });
  }
  if (document.querySelector('.nav')) {
    tl.from('.nav > *', { y: -8, opacity: 0, duration: 0.4, stagger: 0.035 }, '-=.25');
  }
  if (document.querySelector('.lead')) {
    tl.from(
      '.lead > .eyebrow, .lead > h1, .lead > .meta, .lead > h2, .lead > .intro',
      { y: 24, opacity: 0, duration: 0.65, stagger: 0.07 },
      '-=.15'
    );
  }
  if (document.querySelector('.crop-frame') || document.querySelector('.headlines')) {
    tl.from('.crop-frame, .headlines, .feature', { y: 22, opacity: 0, duration: 0.7, stagger: 0.1 }, '-=.45');
  }

  if (typeof ScrollTrigger !== 'undefined') {
    // Smooth, cohesive section reveals (prevents popping and layout shifts)
    const revealSections = document.querySelectorAll(
      '.breaking-section, .category-news-group, .statement, .card-grid, .editors-picks, .most-read, .opinion, .visual-stories, .newsletter, .category-lead, .listing-grid, .article-related'
    );

    revealSections.forEach((section) => {
      const heading = section.querySelector('.section-heading, header');
      const cards = section.querySelectorAll(
        '.breaking-lead, .breaking-updates article, .category-posts article, .story-card, .editor-lead, .editor-list article, .most-read li, .opinion article, .visual-main, .visual-side, .video-card, .listing-grid article, .article-related article'
      );

      const sectionTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top 88%',
          once: true,
        },
      });

      if (heading) {
        sectionTl.fromTo(
          heading,
          { opacity: 0, y: 14 },
          { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out', clearProps: 'transform,opacity' }
        );
      }

      if (cards.length > 0) {
        sectionTl.fromTo(
          cards,
          { opacity: 0, y: 16 },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            stagger: 0.05,
            ease: 'power2.out',
            clearProps: 'transform,opacity',
          },
          heading ? '-=0.3' : 0
        );
      }
    });

    // Refresh triggers once images and fonts are loaded to guarantee exact positioning
    window.addEventListener('load', () => {
      ScrollTrigger.refresh();
    });
  }
}

/* -------------------------------------------------------------------------- */
/* 6. Smooth Momentum Scroll (Lenis + GSAP Synchronized)                      */
/* -------------------------------------------------------------------------- */
let lenis = null;

function initSmoothScroll() {
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Initialize Lenis momentum inertia smooth scrolling if library is loaded
  if (typeof Lenis !== 'undefined' && !prefersReduced) {
    try {
      lenis = new Lenis({
        duration: 1.15,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: 'vertical',
        gestureOrientation: 'vertical',
        smoothWheel: true,
        wheelMultiplier: 1.05,
        touchMultiplier: 1.5,
      });

      // Synchronize Lenis with GSAP ScrollTrigger ticker
      if (typeof ScrollTrigger !== 'undefined') {
        lenis.on('scroll', ScrollTrigger.update);
        gsap.ticker.add((time) => {
          lenis.raf(time * 1000);
        });
        gsap.ticker.lagSmoothing(0);
      } else {
        function raf(time) {
          lenis.raf(time);
          requestAnimationFrame(raf);
        }
        requestAnimationFrame(raf);
      }
    } catch (err) {
      console.warn('Lenis initialization skipped:', err);
    }
  }

  // Anchor links smooth navigation
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', (event) => {
      const href = link.getAttribute('href');
      if (!href || href === '#' || href.length < 2) return;
      const target = document.querySelector(href);
      if (!target) return;

      event.preventDefault();
      if (lenis) {
        lenis.scrollTo(target, { offset: -24, duration: 1.1 });
      } else if (typeof gsap !== 'undefined' && typeof ScrollToPlugin !== 'undefined' && !prefersReduced) {
        gsap.to(window, { scrollTo: { y: target, offsetY: 24 }, duration: 0.9, ease: 'power3.inOut' });
      } else {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
}

/* -------------------------------------------------------------------------- */
/* 7. Hover Micro-Interactions                                                */
/* -------------------------------------------------------------------------- */
function initHoverEffects() {
  if (typeof gsap === 'undefined' || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const interactiveCards = document.querySelectorAll(
    '.story-card, .category-posts article, .editor-list article, .video-card, .listing-grid article'
  );

  interactiveCards.forEach((card) => {
    const image = card.querySelector('img');
    const arrow = card.querySelector('.card-arrow, .category-post-arrow, .listing-arrow, .arrow');

    card.addEventListener('pointerenter', () => {
      if (image) gsap.to(image, { scale: 1.035, duration: 0.4, ease: 'power2.out', overwrite: 'auto' });
      if (arrow) gsap.to(arrow, { x: 4, y: -4, duration: 0.25, ease: 'power2.out', overwrite: 'auto' });
    });

    card.addEventListener('pointerleave', () => {
      if (image) gsap.to(image, { scale: 1, duration: 0.45, ease: 'power2.out', overwrite: 'auto' });
      if (arrow) gsap.to(arrow, { x: 0, y: 0, duration: 0.3, ease: 'power2.out', overwrite: 'auto' });
    });
  });
}

/* -------------------------------------------------------------------------- */
/* 8. Single Category Page Controller (?c=... and ?q=...)                     */
/* -------------------------------------------------------------------------- */
const categoryData = {
  world: {
    title: 'World',
    count: '42',
    intro: 'The latest world reporting and analysis, selected by our editors for clarity, consequence and context.',
    topics: ['Latest', 'Politics', 'Climate', 'Cities', 'Culture'],
    lead: {
      title: 'Cities rethink public space for a changing climate',
      image: 'news/city.jpg',
      meta: 'WORLD ● BY THE EDITORS ● 24 JUN 2025',
      copy: 'From shaded streets to restored waterfronts, urban leaders are making public space central to the next era of city life.',
    },
    side: [
      { title: 'The night train routes reconnecting a continent', image: 'news/station.jpg', date: '23 JUN 2025' },
      { title: 'Inside the public spaces transforming daily life', image: 'news/gallery.jpg', date: '21 JUN 2025' },
    ],
    stories: [
      { title: 'Coastal cities unite around a bold new resilience plan', image: 'news/city.jpg', date: '24 JUN 2025' },
      { title: 'The night train routes reconnecting a continent', image: 'news/station.jpg', date: '23 JUN 2025' },
      { title: 'Inside the public spaces transforming daily life', image: 'news/gallery.jpg', date: '21 JUN 2025' },
      { title: 'A new generation of leaders takes on local change', image: 'news/portrait.jpg', date: '19 JUN 2025' },
      { title: 'How communities are restoring shared waterfronts', image: 'news/walk.jpg', date: '18 JUN 2025' },
      { title: 'The cultural institutions opening their archives', image: 'news/culture.jpg', date: '16 JUN 2025' },
    ],
  },
  business: {
    title: 'Business',
    count: '38',
    intro: 'Markets, corporate accountability, local enterprise, and economic shifts.',
    topics: ['Latest', 'Markets', 'Economy', 'Enterprises', 'Work'],
    lead: {
      title: 'Independent makers find strength in local markets',
      image: 'news/walk.jpg',
      meta: 'BUSINESS ● BY THE EDITORS ● 24 JUN 2025',
      copy: 'Why patient companies that prioritize craftsmanship and community connection are outperforming rapid-growth competitors.',
    },
    side: [
      { title: 'The new offices designed around deep focus', image: 'news/escalator.jpg', date: '22 JUN 2025' },
      { title: 'Why patient companies are winning loyal customers', image: 'news/culture.jpg', date: '20 JUN 2025' },
    ],
    stories: [
      { title: 'Independent makers find strength in local markets', image: 'news/walk.jpg', date: '24 JUN 2025' },
      { title: 'The new offices designed around deep focus', image: 'news/escalator.jpg', date: '22 JUN 2025' },
      { title: 'Why patient companies are winning loyal customers', image: 'news/culture.jpg', date: '20 JUN 2025' },
      { title: 'Small manufacturers rethink the global supply chain', image: 'news/station.jpg', date: '19 JUN 2025' },
      { title: 'The founders putting long-term value before growth', image: 'news/portrait.jpg', date: '17 JUN 2025' },
      { title: 'City-center shops find a second life after dark', image: 'news/city.jpg', date: '15 JUN 2025' },
    ],
  },
  travel: {
    title: 'Travel',
    count: '31',
    intro: 'Slow journeys, regional stories, and the architecture of movement curated by our editors.',
    topics: ['Latest', 'Rail Journeys', 'Architecture', 'Guides', 'Field Notes'],
    lead: {
      title: 'The night train revival is redrawing the map of European travel',
      image: 'news/station.jpg',
      meta: 'TRAVEL ● BY THE EDITORS ● 23 JUN 2025',
      copy: 'As travellers look for slower, lower-emission ways to travel, overnight rail networks are connecting capitals in comfort.',
    },
    side: [
      { title: 'The stations worth making a journey for', image: 'news/city.jpg', date: '21 JUN 2025' },
      { title: 'The case for taking the long way home', image: 'news/walk.jpg', date: '19 JUN 2025' },
    ],
    stories: [
      { title: 'The night train routes reconnecting a continent', image: 'news/station.jpg', date: '23 JUN 2025' },
      { title: 'The stations worth making a journey for', image: 'news/city.jpg', date: '21 JUN 2025' },
      { title: 'Public buildings that make room for wonder', image: 'news/gallery.jpg', date: '19 JUN 2025' },
      { title: 'The case for taking the long way home', image: 'news/walk.jpg', date: '17 JUN 2025' },
      { title: 'The quiet towns turning heritage into renewal', image: 'news/portrait.jpg', date: '15 JUN 2025' },
      { title: 'Mapping coastal trails across two peninsulas', image: 'news/culture.jpg', date: '12 JUN 2025' },
    ],
  },
  tech: {
    title: 'Technology',
    count: '35',
    intro: 'The tools, interfaces, systems, and ethics shaping everyday digital life.',
    topics: ['Latest', 'AI & Systems', 'Hardware', 'Privacy', 'Future'],
    lead: {
      title: 'A quieter generation of technology is taking shape',
      image: 'news/escalator.jpg',
      meta: 'TECH ● BY THE EDITORS ● 23 JUN 2025',
      copy: 'Designers and engineers are rethinking devices to demand less attention, conserve energy and harmonize with real-world environments.',
    },
    side: [
      { title: 'How city data can serve the people who create it', image: 'news/city.jpg', date: '21 JUN 2025' },
      { title: 'The small tools changing how creative teams work', image: 'news/gallery.jpg', date: '18 JUN 2025' },
    ],
    stories: [
      { title: 'A quieter generation of technology is taking shape', image: 'news/escalator.jpg', date: '23 JUN 2025' },
      { title: 'How city data can serve the people who create it', image: 'news/city.jpg', date: '21 JUN 2025' },
      { title: 'The small tools changing how creative teams work', image: 'news/gallery.jpg', date: '18 JUN 2025' },
      { title: 'Inside the labs making batteries last much longer', image: 'news/culture.jpg', date: '17 JUN 2025' },
      { title: 'Why the next interface may barely need a screen', image: 'news/walk.jpg', date: '16 JUN 2025' },
      { title: 'A practical guide to a calmer digital routine', image: 'news/station.jpg', date: '14 JUN 2025' },
    ],
  },
  fashion: {
    title: 'Fashion',
    count: '28',
    intro: 'Textile craftsmanship, responsible design, and enduring style covered with critical insight.',
    topics: ['Latest', 'Atelier', 'Materials', 'Designers', 'Archive'],
    lead: {
      title: 'The cultural institutions opening their archives',
      image: 'news/culture.jpg',
      meta: 'FASHION ● BY THE EDITORS ● 22 JUN 2025',
      copy: 'Historic ateliers and modern fashion archives are revealing patterns and techniques that inform sustainable fashion today.',
    },
    side: [
      { title: 'A new generation of pattern makers', image: 'news/portrait.jpg', date: '20 JUN 2025' },
      { title: 'Garments designed to last generations', image: 'news/walk.jpg', date: '18 JUN 2025' },
    ],
    stories: [
      { title: 'The cultural institutions opening their archives', image: 'news/culture.jpg', date: '22 JUN 2025' },
      { title: 'A new generation of pattern makers', image: 'news/portrait.jpg', date: '20 JUN 2025' },
      { title: 'Garments designed to last generations', image: 'news/walk.jpg', date: '18 JUN 2025' },
      { title: 'The beauty of natural plant dyes', image: 'news/gallery.jpg', date: '16 JUN 2025' },
      { title: 'Urban uniforms: what we wear to navigate the city', image: 'news/city.jpg', date: '14 JUN 2025' },
      { title: 'Functional outerwear for unpredictable weather', image: 'news/station.jpg', date: '11 JUN 2025' },
    ],
  },
  lifestyle: {
    title: 'Lifestyle',
    count: '76',
    intro: 'Rituals, wellbeing, culture, and thoughtful living in contemporary society.',
    topics: ['Latest', 'Rituals', 'Food & Drink', 'Living', 'Essays'],
    lead: {
      title: 'Why the simple rituals of morning still matter',
      image: 'news/walk.jpg',
      meta: 'LIFESTYLE ● BY THE EDITORS ● 24 JUN 2025',
      copy: 'Before notifications and deadlines demand our focus, the quiet minutes of morning offer a sanctuary for intention.',
    },
    side: [
      { title: 'Inside the archives preserving everyday stories', image: 'news/culture.jpg', date: '22 JUN 2025' },
      { title: 'The spaces designed for quiet reflection', image: 'news/gallery.jpg', date: '20 JUN 2025' },
    ],
    stories: [
      { title: 'Why the simple rituals of morning still matter', image: 'news/walk.jpg', date: '24 JUN 2025' },
      { title: 'Inside the archives preserving everyday stories', image: 'news/culture.jpg', date: '22 JUN 2025' },
      { title: 'The spaces designed for quiet reflection', image: 'news/gallery.jpg', date: '20 JUN 2025' },
      { title: 'The cooks reviving historic grain varieties', image: 'news/portrait.jpg', date: '18 JUN 2025' },
      { title: 'Finding rhythm in the commute', image: 'news/station.jpg', date: '16 JUN 2025' },
      { title: 'The neighborhood gardens sustaining communities', image: 'news/city.jpg', date: '14 JUN 2025' },
    ],
  },
  opinion: {
    title: 'Opinion',
    count: '24',
    intro: 'Distinctive viewpoints, rigorous essays, and debates on the questions shaping civic life.',
    topics: ['Latest', 'Urban Affairs', 'Society', 'Culture', 'Technology'],
    lead: {
      title: 'We don’t need smarter cities. We need cities that listen.',
      image: 'news/portrait.jpg',
      meta: 'OPINION ● BY AMARA REED ● 24 JUN 2025',
      copy: 'The best urban ideas begin not with technology, but with the ordinary expertise of the people who live there.',
    },
    side: [
      { title: 'The spaces proving thoughtful design belongs to all', image: 'news/gallery.jpg', date: '22 JUN 2025' },
      { title: 'Reclaiming our shared attention from algorithm feeds', image: 'news/walk.jpg', date: '19 JUN 2025' },
    ],
    stories: [
      { title: 'We don’t need smarter cities. We need cities that listen.', image: 'news/portrait.jpg', date: '24 JUN 2025' },
      { title: 'The spaces proving thoughtful design belongs to all', image: 'news/gallery.jpg', date: '22 JUN 2025' },
      { title: 'Reclaiming our shared attention from algorithm feeds', image: 'news/walk.jpg', date: '19 JUN 2025' },
      { title: 'Why public transit is the true index of civic health', image: 'news/station.jpg', date: '17 JUN 2025' },
      { title: 'The illusion of the 15-minute city without equity', image: 'news/city.jpg', date: '14 JUN 2025' },
      { title: 'Memory against convenience: the case for keeping books', image: 'news/culture.jpg', date: '10 JUN 2025' },
    ],
  },
};

function initCategoryPage() {
  const categoryHeading = document.querySelector('.category-page-heading');
  if (!categoryHeading) return;

  const params = new URLSearchParams(window.location.search);
  const query = params.get('q');
  const catKey = (params.get('c') || params.get('category') || 'world').toLowerCase();

  const eyebrowEl = categoryHeading.querySelector('.eyebrow');
  const titleEl = categoryHeading.querySelector('h1');
  const descEl = categoryHeading.querySelector('p:not(.eyebrow)');
  const chipsNav = document.querySelector('.topic-chips');
  const leadSection = document.querySelector('.category-lead');
  const toolbarLabel = document.querySelector('.listing-toolbar span:first-child');
  const gridSection = document.querySelector('.listing-grid');

  // Highlight active nav item
  const currentNav = document.querySelectorAll('.nav a');
  currentNav.forEach((link) => {
    link.classList.remove('active');
    link.removeAttribute('aria-current');
    const href = link.getAttribute('href') || '';
    if (href.includes(`c=${catKey}`) || (catKey === 'world' && href.includes('category.html?c=world'))) {
      link.classList.add('active');
      link.setAttribute('aria-current', 'page');
    }
  });

  if (query) {
    document.title = `Search: ${query} — FRIDAY`;
    if (eyebrowEl) eyebrowEl.textContent = 'SEARCH RESULTS / 6 STORIES';
    if (titleEl) titleEl.textContent = 'Search';
    if (descEl) descEl.textContent = `Stories matching “${query}”, selected from the Friday archive.`;
    if (toolbarLabel) toolbarLabel.textContent = `SEARCH RESULTS FOR “${query.toUpperCase()}”`;
    return;
  }

  const data = categoryData[catKey] || categoryData.world;
  document.title = `${data.title} — FRIDAY`;

  if (eyebrowEl) eyebrowEl.textContent = `SECTION / ${data.count} STORIES`;
  if (titleEl) titleEl.textContent = data.title;
  if (descEl) descEl.textContent = data.intro;
  if (toolbarLabel) toolbarLabel.textContent = `LATEST ${data.title.toUpperCase()} NEWS`;

  // Render topic chips
  if (chipsNav) {
    chipsNav.innerHTML = data.topics
      .map(
        (t, idx) =>
          `<button type="button" class="${idx === 0 ? 'active' : ''}" aria-pressed="${idx === 0 ? 'true' : 'false'}">${t}</button>`
      )
      .join('');

    chipsNav.querySelectorAll('button').forEach((btn) => {
      btn.addEventListener('click', () => {
        chipsNav.querySelectorAll('button').forEach((b) => {
          b.classList.remove('active');
          b.setAttribute('aria-pressed', 'false');
        });
        btn.classList.add('active');
        btn.setAttribute('aria-pressed', 'true');
        const topic = btn.textContent.trim().toUpperCase();
        if (toolbarLabel) toolbarLabel.textContent = `${topic} ${data.title.toUpperCase()} NEWS`;

        const articles = gridSection.querySelectorAll('article');
        if (articles.length > 0 && typeof gsap !== 'undefined') {
          gsap.fromTo(articles, { opacity: 0.5, y: 12 }, { opacity: 1, y: 0, duration: 0.35, stagger: 0.04, ease: 'power2.out' });
        }
      });
    });
  }

  // Render Lead section
  if (leadSection && data.lead) {
    leadSection.innerHTML = `
      <article>
        <a href="article.html"><img src="${data.lead.image}" alt=""></a>
        <p class="meta">— ${data.lead.meta}</p>
        <h2><a href="article.html">${data.lead.title}</a></h2>
        <p>${data.lead.copy}</p>
      </article>
      <aside>
        ${data.side
          .map(
            (s) => `
          <article>
            <a href="article.html"><img src="${s.image}" alt=""></a>
            <time>${s.date}</time>
            <h3><a href="article.html">${s.title}</a></h3>
          </article>
        `
          )
          .join('')}
      </aside>
    `;
  }

  // Render Stories grid
  if (gridSection && data.stories) {
    gridSection.innerHTML = `
      ${data.stories
        .map(
          (s) => `
        <article>
          <a href="article.html"><img src="${s.image}" alt="" loading="lazy"></a>
          <time>${s.date}</time>
          <h3><a href="article.html">${s.title}</a></h3>
          <p>Essential reporting, context and analysis from our newsroom.</p>
          <a class="listing-arrow" href="article.html" aria-label="Read story">
            <svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M6 18 18 6M8 6h10v10" fill="none" stroke="currentColor" stroke-linecap="square" stroke-linejoin="miter" stroke-width="1.75" /></svg>
          </a>
        </article>
      `
        )
        .join('')}
      <svg class="star star-small grid-star grid-star-left" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 0C12.6 7 17 11.4 24 12 17 12.6 12.6 17 12 24 11.4 17 7 12.6 0 12 7 11.4 11.4 7 12 0Z" />
      </svg>
      <svg class="star star-small grid-star grid-star-right" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 0C12.6 7 17 11.4 24 12 17 12.6 12.6 17 12 24 11.4 17 7 12.6 0 12 7 11.4 11.4 7 12 0Z" />
      </svg>
    `;
    initHoverEffects();
  }
}

/* -------------------------------------------------------------------------- */
/* 9. Article Page Social Sharing                                              */
/* -------------------------------------------------------------------------- */
function initArticleShare() {
  const shareButtons = document.querySelectorAll('.share-rail button');
  if (shareButtons.length === 0) return;

  const url = encodeURIComponent(window.location.href);
  const title = encodeURIComponent(document.title || 'Cities rethink public space for a changing climate');

  const destinations = {
    x: `https://x.com/intent/post?url=${url}&text=${title}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${url}`,
  };

  shareButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const net = btn.getAttribute('data-network') || btn.textContent.trim().toLowerCase();
      let target = destinations[net];
      if (!target) {
        if (net === 'f') target = destinations.facebook;
        else if (net === 'in') target = destinations.linkedin;
        else target = destinations.x;
      }
      window.open(target, '_blank', 'noopener,noreferrer,width=720,height=560');
    });
  });
}

/* -------------------------------------------------------------------------- */
/* 10. Auth Page Preview Handling                                             */
/* -------------------------------------------------------------------------- */
function initAuthForm() {
  const authForm = document.querySelector('.auth-form-panel form');
  if (!authForm) return;

  authForm.addEventListener('submit', (e) => {
    e.preventDefault();
    let msg = authForm.querySelector('.auth-demo-message');
    if (!msg) {
      msg = document.createElement('p');
      msg.className = 'auth-demo-message';
      msg.setAttribute('role', 'status');
      authForm.appendChild(msg);
    }
    msg.textContent = 'DESIGN PREVIEW — NO ACCOUNT DATA WAS SUBMITTED.';
    msg.style.display = 'block';
  });
}

/* -------------------------------------------------------------------------- */
/* 11. Newsletter Subscribe Handling                                          */
/* -------------------------------------------------------------------------- */
function initNewsletter() {
  const newsletterForm = document.querySelector('.newsletter form');
  if (!newsletterForm) return;

  newsletterForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const input = newsletterForm.querySelector('input[type="email"]');
    const button = newsletterForm.querySelector('button');
    if (!input || !button) return;

    const email = input.value;
    if (email) {
      button.disabled = true;
      button.innerHTML = 'SUBSCRIBED ✓';
      input.value = '';
      setTimeout(() => {
        button.disabled = false;
        button.innerHTML = 'JOIN THE LIST <svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14m-5-5 5 5-5 5" fill="none" stroke="currentColor" stroke-linecap="square" stroke-linejoin="miter" stroke-width="1.75"/></svg>';
      }, 4000);
    }
  });
}
