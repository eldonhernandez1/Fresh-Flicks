import rawCatalog from "./data/catalog.json";
import type { Series } from "./types";

const REQUIRED_FIELDS: (keyof Series)[] = [
  "id", "title", "tagline", "genres", "year", "seasons",
  "rating", "match", "description", "cast", "creator",
  "posterPath", "backdropPath", "videoPath",
];

function assertCatalog(data: unknown): Series[] {
  if (!Array.isArray(data)) throw new Error("catalog.json must be an array");
  for (const item of data as Record<string, unknown>[]) {
    for (const key of REQUIRED_FIELDS) {
      if (!(key in item)) throw new Error(`catalog.json entry missing field: ${key}`);
    }
  }
  return data as Series[];
}

export const FEATURED_SERIES_ID = "edge-of-the-wild";

export const seriesCatalog = assertCatalog(rawCatalog);

export function findSeries(id: string): Series | undefined {
  return seriesCatalog.find((series) => series.id === id);
}

export function getFeaturedSeries(): Series {
  return findSeries(FEATURED_SERIES_ID) ?? seriesCatalog[0];
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
