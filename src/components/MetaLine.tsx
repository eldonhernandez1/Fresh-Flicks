import type { Series } from "../types";

type MetaLineProps = {
  series: Series;
};

export function MetaLine({ series }: MetaLineProps) {
  return (
    <p className="meta-line">
      <strong>{series.match}% Match</strong>
      <span>{series.year}</span>
      <span>{series.rating}</span>
      <span>
        {series.seasons} {series.seasons === 1 ? "Season" : "Seasons"}
      </span>
    </p>
  );
}
