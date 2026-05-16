# StreamKit — Netflix Clone Workshop

A front-end-only streaming catalog app used as a starting point for AI-assisted development workshops.

## Stack

- **Runtime**: Vite 7 + React 19 + TypeScript 5
- **Styling**: Single flat CSS file (`src/styles.css`) — no CSS framework, no CSS modules
- **Routing**: Custom hash-based router (`src/router.ts`) — no react-router
- **Data**: Local JSON (`src/data/catalog.json`) — no backend, no API, no auth
- **Assets**: Local `.webp` images in `public/posters/` and `public/backdrops/`; one shared `public/videos/preview.mp4`

## Dev Commands

```bash
npm install
npm run dev      # Vite dev server — usually http://localhost:5173
npm run build    # tsc + vite build
npm run preview  # serve the dist/ build locally
```

No test runner is configured. There are no unit or integration tests.

## Project Structure

```
src/
  types.ts                  Series, Rating, Route types
  catalog.ts                Data-access helpers (findSeries, getGenres, getMoreLikeThis, etc.)
  router.ts                 parseRoute, useRoute hook, showUrl, watchUrl helpers
  App.tsx                   Root — switches between HomePage, ShowPage, WatchPage
  styles.css                All CSS (single file, flat BEM-ish class names)
  main.tsx                  ReactDOM entry point
  data/
    catalog.json            Runtime catalog (20 series)
    catalog.metadata.json   Creative metadata / art prompts (not loaded at runtime)
  components/
    Nav.tsx                 Fixed topbar with brand, nav links, search input (search not wired)
    Row.tsx                 Horizontal scrolling card rail (variant: "poster" | "wide")
    SeriesCard.tsx          Clickable card — poster or wide (backdrop) art
    MetaLine.tsx            Match%, year, rating, seasons inline summary
  pages/
    HomePage.tsx            Hero + content rows (Top Matches, New Releases, per-genre rows)
    ShowPage.tsx            Detail hero + episode list + More Like This row
    WatchPage.tsx           Video player + placeholder drawer
public/
  posters/                  2:3 poster images (.webp)
  backdrops/                16:9 backdrop images (.webp)
  videos/preview.mp4        Single shared preview used by all series
```

## Key Types (`src/types.ts`)

```ts
type Series = {
  id: string; title: string; tagline: string;
  genres: string[]; year: number; seasons: number;
  rating: "TV-PG" | "TV-14" | "TV-MA";
  match: number;          // 0–100 relevance score
  description: string; cast: string[]; creator: string;
  posterPath: string; backdropPath: string; videoPath: string;
};

type Route = { name: "home" } | { name: "show"; id: string } | { name: "watch"; id: string };
```

## App Shell Layout

`App.tsx` is the root. For `show` and `home` routes it renders `<Nav />` + `<main>` inside `.app-shell`. For the `watch` route it renders `<WatchPage>` directly — **no Nav, no app-shell wrapper**. This matters when adding UI that should appear on every page.

`Nav` is a sibling to the page content, not a parent of it. To wire search, state must be lifted to `App.tsx` and passed down to both `Nav` (for the input) and `HomePage` (for filtered results).

## Routing

Hash-based: `#/` → home, `#/show/:id` → ShowPage, `#/watch/:id` → WatchPage.  
`useRoute()` hook in `router.ts` listens to `hashchange`. Navigation uses plain `<a href="...">` tags.

## Catalog Helpers (`src/catalog.ts`)

- `seriesCatalog` — full array
- `findSeries(id)` — lookup by id
- `getFeaturedSeries()` — returns "night-signal" (hero on homepage)
- `getGenres()` — sorted unique genres from all series
- `getSeriesByGenre(genre)` — filter
- `getMoreLikeThis(series, limit=6)` — scores by shared genres, breaks ties by match%

## CSS Design Tokens (`src/styles.css` `:root`)

| Token | Value | Use |
|---|---|---|
| `--bg` | `#08090b` | Page background |
| `--bg-soft` | `#121316` | Slightly lighter surface |
| `--panel` | `rgba(20,21,24,0.84)` | Overlaid card/panel backgrounds |
| `--line` | `rgba(255,255,255,0.12)` | Borders/dividers |
| `--muted` | `#b6b0a5` | Secondary text |
| `--text` | `#f8f4ea` | Primary text |
| `--red` | `#e50914` | Brand accent, primary buttons |
| `--red-dark` | `#ad0710` | Hover/gradient end for red |
| `--gold` | `#d8b36a` | Highlight accents |
| `--green` | `#4edf8f` | Match % highlight |
| `--shadow` | `0 24px 70px rgba(0,0,0,0.48)` | Card/hero shadows |

Always use these tokens in new CSS rather than raw hex values.

## Deployment

`vercel.json` is present — the project deploys to Vercel with `npm run build` → `dist/`.

## Workshop TODOs (known stubs)

| Location | What's missing |
|---|---|
| `Nav.tsx` | Search input is rendered but not wired to any filter logic |
| `ShowPage.tsx` | "+ My List" button has no handler |
| `ShowPage.tsx` | Episode list is generated from `series.seasons` count with placeholder titles/durations |
| `WatchPage.tsx` | Drawer is a placeholder — episode selection, subtitles, progress tracking not built |
| `HomePage.tsx` | Only first 5 genres shown; no filter/sort UI |

## Suggested Next Features

- Wire search input in `Nav` to filter `seriesCatalog` across title, genre, cast
- Add "My List" with `localStorage` persistence
- Add genre/rating/year filter controls on the home page
- Expand episode data structure in `catalog.json` and render real episodes on ShowPage
- Add player controls, autoplay, or progress tracking to WatchPage
