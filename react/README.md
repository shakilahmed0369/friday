# FRIDAY — React 19 Editorial Application

Modern, high-performance editorial publication application built with **React 19**, **Vite 8**, **Tailwind CSS v4**, **React Router 7**, **GSAP 3**, and **Lenis**.

---

## 📁 Directory Structure

```text
react/
├── index.html                      # Vite HTML shell with preloaded fonts
├── package.json                    # Project dependencies and npm scripts
├── tsconfig.json                   # TypeScript configuration
├── vite.config.ts                  # Vite + React + Tailwind v4 bundler config
│
├── public/                         # Static assets served at root
│   ├── favicon.svg                 # SVG publication mark
│   ├── assets/
│   │   └── fonts/                  # Self-hosted WOFF2 fonts
│   │       ├── archivo-latin.woff2
│   │       ├── archivo-latin-ext.woff2
│   │       ├── newsreader-latin-400.woff2
│   │       └── newsreader-latin-ext-400.woff2
│   └── news/                       # Editorial landscape & portrait photography
│       ├── city.jpg
│       ├── culture.jpg
│       ├── escalator.jpg
│       ├── gallery.jpg
│       ├── portrait.jpg
│       ├── station.jpg
│       ├── video-city.jpg
│       ├── video-plaza.jpg
│       ├── video-portrait.jpg
│       └── walk.jpg
│
└── src/                            # React application source code
    ├── main.tsx                    # React DOM entrypoint
    ├── App.tsx                     # Front page / Home view & core components
    ├── index.css                   # Tailwind v4 import & custom newspaper design system
    ├── vite-env.d.ts               # Vite environment types
    │
    ├── app/                        # Application routing and layout root
    │   ├── App.tsx                 # RouterProvider mount
    │   ├── Root.tsx                # App layout shell: Lenis smooth scroll & reading progress
    │   └── routes.tsx              # React Router route definitions
    │
    ├── components/                 # Shared UI icons and primitives
    │   └── Icon.tsx                # SVG Icon system (Arrow, Play, Search, User, Mark)
    │
    ├── fonts/                      # CSS-bundled WOFF2 fonts
    │   ├── archivo-latin.woff2
    │   ├── archivo-latin-ext.woff2
    │   ├── newsreader-latin-400.woff2
    │   └── newsreader-latin-ext-400.woff2
    │
    └── pages/                      # Page route views
        ├── ArticlePage.tsx         # Long-form article detail view & related stories
        ├── CategoryPage.tsx        # Section listing & archive search controller
        ├── AuthPage.tsx            # Sign in and registration account views
        ├── InfoPage.tsx            # Editorial policy, About, Privacy, Terms, Accessibility
        └── NotFoundPage.tsx        # Custom 404 page
```

---

## 🚀 Getting Started

### 1. Install Dependencies
```bash
# From inside the react/ directory
pnpm install
```

### 2. Start Development Server
```bash
pnpm dev
```
By default, the Vite dev server starts at `http://localhost:3000`.

### 3. Build for Production
```bash
pnpm build
```
Builds the optimized production bundles to `react/dist/`.

### 4. Preview Production Build
```bash
pnpm preview
```

---

## ✨ Features & Architecture

- **Lenis Inertial Smooth Scrolling**: Integrated in `Root.tsx` and synchronized with the GSAP ScrollTrigger ticker.
- **Global Reading Progress Indicator**: Fixed at the top across all routes, scaling smoothly without initial load jumps.
- **No FOUT (Flash of Unstyled Text)**: Self-hosted WOFF2 fonts preloaded in `index.html` and loaded with `font-display: block`.
- **Proportional Card Grids**: All grid cards use fluid `16 / 10` aspect ratios with `grid-auto-rows: 1fr` for baseline alignment.
- **Responsive Navigation**: Mobile masthead with dedicated Search toggle and Account Sign-in icon.
