# StreamKit

StreamKit is a front-end-only streaming catalog starter app for workshops about developing with AI.

It uses Vite, React, TypeScript, local JSON data, local image assets, and one shared preview video. There is no backend, database, authentication service, or external asset host required.

## Getting Started

```bash
npm install
npm run dev
```

Vite will print a local URL, usually `http://localhost:5173`.

## Workshop Feature Ideas

- Wire up the search box in the header.
- Add filters by genre, rating, or year.
- Add a "My List" feature using `localStorage`.
- Add richer controls or recommendations on the watch page.
- Add "More Like This" logic to the show page.

## Project Shape

```text
src/data/catalog.json          Runtime catalog data
src/data/catalog.metadata.json Creative metadata and art prompts
public/posters                 Local poster images
public/backdrops               Local backdrop images
public/videos/preview.mp4      Shared preview video
```
