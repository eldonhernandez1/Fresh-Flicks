import rawCatalog from "./data/catalog.json";
import type { Series } from "./types";

const REQUIRED_FIELDS: (keyof Series)[] = [
  "id", "title", "tagline", "genres", "year", "seasons",
  "rating", "match", "description", "cast", "creator",
  "posterPath", "backdropPath", "videoPath",
];

const VALID_PATH = /^\/[a-zA-Z0-9/_\-.]+\.(webp|mp4|jpg|png|svg)$/;
const VALID_RATINGS = new Set<string>(["TV-PG", "TV-14", "TV-MA"]);

function assertCatalog(data: unknown): Series[] {
  if (!Array.isArray(data)) throw new Error("catalog.json must be an array");
  for (const item of data as Record<string, unknown>[]) {
    for (const key of REQUIRED_FIELDS) {
      if (!(key in item)) throw new Error(`catalog.json entry missing field: ${key}`);
    }
    const s = item as Record<string, unknown>;
    for (const pathField of ["posterPath", "backdropPath", "videoPath"] as const) {
      if (typeof s[pathField] !== "string" || !VALID_PATH.test(s[pathField] as string)) {
        throw new Error(`catalog.json entry has unsafe path for: ${pathField}`);
      }
    }
    if (!VALID_RATINGS.has(s.rating as string)) {
      throw new Error(`catalog.json entry has invalid rating: ${s.rating}`);
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
