# FRIDAY — Independent Journalism

A modern, high-end editorial publication platform available in two complete, standalone editions:

1. **`html/`** — Standalone static HTML5 edition with precompiled Tailwind CSS v4 and vanilla JavaScript. Ready to deploy or view offline without a Node server.
2. **`react/`** — Full modern React 19 single-page application built with Vite 8, React Router 7, Tailwind CSS v4, GSAP 3, and Lenis momentum smooth scrolling.

---

## 📁 Repository Structure

```text
firday/
├── html/                   # Standalone HTML5 + Tailwind CSS edition
│   ├── index.html          # Front page
│   ├── article.html        # Article reader template
│   ├── category.html       # Dynamic category hub & archive search
│   ├── assets/             # Compiled CSS, vanilla JS, vendor scripts, images
│   └── news/               # Photo journalism assets
│
├── react/                  # Standalone React 19 + Vite application
│   ├── index.html          # HTML shell & font preloads
│   ├── package.json        # Dependencies & React scripts
│   ├── tsconfig.json       # TypeScript config
│   ├── vite.config.ts      # Vite configuration
│   ├── public/             # Static public assets
│   └── src/                # React components, pages, routing, fonts, styles
│
├── package.json            # Root workspace scripts
└── README.md               # Repository documentation
```

---

## 🚀 Quick Start

### Running the React Application
```bash
# Navigate to the react project
cd react

# Install dependencies (if not already installed)
pnpm install

# Start local development server
pnpm dev
```
Alternatively, from the repository root:
```bash
pnpm run dev
```

### Running the HTML Static Edition
Simply open `html/index.html` in any web browser, or serve it with any static web server (such as Laravel Herd, Nginx, or `npx serve html`).

### Rebuilding CSS
To recompile the Tailwind CSS stylesheet from `react/src/index.css` into `html/assets/css/`:
```bash
pnpm run build:css
```
