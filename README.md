# 2026 Oscars Watch Party — Predictions & Results

A modern, mobile-first web application built for an Oscar watch party. Participants submitted predictions across all 24 Academy Award categories, and the app tracks live results as winners are announced, calculating scores in real time with a weighted scoring system.

Now repurposed as a **portfolio showcase** of the full event experience — nominations browser, live scoring engine, trivia, and polished UI.

## ✨ Features

- 🎬 **Full Nominations Browser** — All 24 Oscar categories with TMDB movie posters and actor headshots, trailers, and nominee details
- 🏆 **Live Results Scorecard** — Weighted scoring system (major categories = 3pts, technical = 1pt) with a real-time leaderboard and category-by-category breakdown
- 📊 **Dual Results View** — Leaderboard view with a podium + full table, and a category detail view with per-participant predictions
- 🎯 **Prediction Tracking** — Per-participant, per-category results with ✅/❌ correctness indicators and a progress bar
- 🎮 **Trivia Section** — Oscar trivia for engagement during the ceremony
- 📱 **Mobile-First Design** — Fully responsive across all devices
- 🎨 **Premium Aesthetic** — Warm gold-and-dark theme with Framer Motion animations, glassmorphism, and micro-interactions
- 🌐 **TMDB API Integration** — Dynamic movie posters and person images via The Movie Database

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Framework | [Astro 5](https://astro.build/) with server-side rendering |
| UI | [React 18](https://react.dev/) + TypeScript |
| Styling | [Tailwind CSS](https://tailwindcss.com/) |
| Animation | [Framer Motion](https://www.framer.com/motion/) |
| Images | [TMDB API](https://www.themoviedb.org/documentation/api) |
| Forms | [React Hook Form](https://react-hook-form.com/) + [Web3Forms](https://web3forms.com/) |
| Deployment | [Cloudflare Pages](https://pages.cloudflare.com/) |

## 🏗️ Architecture Overview

```
src/
├── components/
│   ├── auth/          # Password gate (archived — site is now open)
│   ├── layout/        # Header, Footer
│   ├── nominations/   # Category list, nominee cards, featured carousel
│   ├── party/         # Invite details, RSVP form (archived — party is over)
│   └── voting/        # Voting slides and forms (voting closed)
├── context/           # Auth and voting React context
├── data/
│   ├── nominations.ts # All 24 categories and nominees
│   ├── predictions.ts # Party participant predictions
│   ├── results.ts     # Official winners + scoring logic
│   └── trivia.ts      # Oscar trivia questions
├── layouts/           # Base Astro page layout
├── pages/             # Astro routes + API endpoints
│   └── api/auth/      # Server-side auth endpoint (preserved for reference)
└── services/
    └── tmdb.ts        # TMDB API service (fetch posters, actor images, links)
```

### Key Design Decisions

- **Astro + React islands** — Static-first with selective hydration (`client:only="react"`) for interactive components. Keeps the bundle lean while allowing rich interactivity where needed.
- **Weighted scoring in data layer** — `results.ts` exports the scoring logic alongside the data, making it easy to adjust point values without touching UI code.
- **TMDB as the image source** — All movie and person images are fetched dynamically from TMDB at runtime, avoiding the need to store image assets.
- **No build-time DB** — All participant predictions are stored as a TypeScript data file (`predictions.ts`), making the data self-contained, version-controlled, and easy to read.

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm

### Installation

```bash
npm install
npm run dev
```

Dev server starts at `http://localhost:4321/`

### Environment Variables

Create a `.env.local` file:

```env
# TMDB API token (server-side only)
TMDB_API_READ_TOKEN=your_tmdb_read_access_token_here

# Optional: Web3Forms key for RSVP form
PUBLIC_WEB3FORMS_ACCESS_KEY=your_key_here

# Optional: Password hashes (preserved for auth reference)
GUEST_PASSWORD_HASH=your_sha256_hash_here
PUBLIC_PASSWORD_HASH=your_sha256_hash_here
```

> In Astro, environment variables without the `PUBLIC_` prefix are server-side only and never exposed to the client bundle.

## ☁️ Deployment (Cloudflare Pages)

1. **Push to GitHub**
2. **Connect to Cloudflare Pages** → Create Project → Connect to Git → Select repo
3. **Build settings:**
   - Framework preset: `Astro`
   - Build command: `npm run build`
   - Output directory: `dist`
   - Node version: `22`
4. **Add environment variables** in Cloudflare Pages project settings for Production and Preview

## 🧪 Development Commands

```bash
npm run dev       # Start dev server
npm run build     # Build for production
npm run preview   # Preview production build locally
npm run astro     # Astro CLI
```

## 📝 License

Private project — All rights reserved.
