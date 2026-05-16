import catalog from "./data/catalog.json";
import type { Series } from "./types";

export const seriesCatalog = catalog as Series[];

export function findSeries(id: string) {
  return seriesCatalog.find((series) => series.id === id);
}

export function getFeaturedSeries() {
  return findSeries("night-signal") ?? seriesCatalog[0];
}

export function getGenres() {
  return Array.from(new Set(seriesCatalog.flatMap((series) => series.genres))).sort();
}

export function getSeriesByGenre(genre: string) {
  return seriesCatalog.filter((series) => series.genres.includes(genre));
}

export function getMoreLikeThis(series: Series, limit = 6) {
  const genreSet = new Set(series.genres);

  return seriesCatalog
    .filter((candidate) => candidate.id !== series.id)
    .map((candidate) => ({
      series: candidate,
      score: candidate.genres.filter((genre) => genreSet.has(genre)).length,
    }))
    .sort((a, b) => b.score - a.score || b.series.match - a.series.match)
    .slice(0, limit)
    .map((item) => item.series);
}
