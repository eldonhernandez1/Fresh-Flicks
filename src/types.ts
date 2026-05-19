export type Rating = "TV-PG" | "TV-14" | "TV-MA";

export type Series = {
  id: string;
  title: string;
  tagline: string;
  genres: string[];
  year: number;
  seasons: number;
  rating: Rating;
  match: number;
  description: string;
  cast: string[];
  creator: string;
  posterPath: string;
  backdropPath: string;
  videoPath: string;
};

export type Route =
  | { name: "home" }
  | { name: "list" }
  | { name: "show"; id: string }
  | { name: "watch"; id: string };
