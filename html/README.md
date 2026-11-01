# FRIDAY — Standalone HTML & Tailwind Migration

This directory contains the completely migrated, self-contained HTML edition of **FRIDAY — Independent Journalism**.

All pages, responsive layouts, micro-interactions, carousels, tickers, and GSAP animations have been converted from React into clean, semantic HTML5, modern CSS with Tailwind CSS v4, and modular vanilla JavaScript.

---

## 📁 Directory Structure

```text
html/
├── index.html                      # Front Page (Hero, Headlines, Carousel, Ticker, Editorial Grids, Newsletter)
├── article.html                    # Article Template / Detail View
├── category.html                   # Unified Dynamic Category Hub (?c=world|business|travel|tech|fashion|lifestyle|opinion) & Search (?q=...)
├── 404.html                        # 404 Not Found Page
├── about.html                      # About Friday
├── editorial-policy.html           # Editorial Policy
├── privacy.html                    # Privacy Policy
├── terms.html                      # Terms of Service
├── accessibility.html              # Accessibility Statement
├── sign-in.html                    # Reader Account Sign In
├── register.html                   # Reader Account Registration
│
├── assets/
│   ├── css/
│   │   ├── style.css               # Full compiled Tailwind CSS v4 & custom editorial styles (human-readable)
│   │   └── tailwind.css            # Minified production CSS
│   ├── js/
│   │   ├── main.js                 # Vanilla JS: Dynamic category controller, nav drawer, search, carousel, ticker, GSAP hooks
│   │   └── vendor/                 # Downloaded local vendor packages (no CDN dependency required)
│   │       ├── gsap.min.js         # GSAP 3.15.0 core library
│   │       ├── ScrollTrigger.min.js# GSAP ScrollTrigger plugin
│   │       ├── ScrollToPlugin.min.js# GSAP ScrollToPlugin
│   │       └── lenis.min.js        # Lenis momentum smooth scroll library
│   └── images/
│       ├── favicon.svg             # SVG site mark
│       └── news/                   # Local photo assets
│
├── news/                           # Root-level image assets for seamless relative linking
└── favicon.svg                     # Root favicon
```

---

## 🚀 How to Run & Preview

### Option 1: Direct File Access (No Server Required)
You can directly open `index.html` (or any other page) in any modern browser by double-clicking it. All assets use relative paths and load instantly offline.

### Option 2: Using Any Local Static Server
If you want to run a local web server:

```bash
# Using python
python -m http.server 8000 --directory html

# Using npx serve
npx serve html

# Using PHP built-in server (from Herd or CLI)
cd html && php -S localhost:8000
```

Then visit [http://localhost:8000](http://localhost:8000).

---

## 🏷 Dynamic Single Category Controller (`category.html`)

Instead of maintaining duplicate HTML files for every section, `category.html` dynamically renders and filters each section based on the URL query parameter:

- `category.html?c=world` (World news, default)
- `category.html?c=business` (Business news)
- `category.html?c=travel` (Travel slow journeys)
- `category.html?c=tech` (Technology news)
- `category.html?c=fashion` (Fashion & textile stories)
- `category.html?c=lifestyle` (Lifestyle & rituals)
- `category.html?c=opinion` (Voices & perspectives)
- `category.html?q=searchterm` (Archive search results mode)

Topic chips ('Latest', 'Politics', 'Climate', etc.) dynamically filter the listing grid with smooth GSAP transition animations.
