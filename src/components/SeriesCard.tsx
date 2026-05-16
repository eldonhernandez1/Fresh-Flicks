import { showUrl } from "../router";
import type { Series } from "../types";

type SeriesCardProps = {
  series: Series;
  variant?: "poster" | "wide";
};

export function SeriesCard({ series, variant = "poster" }: SeriesCardProps) {
  const imagePath = variant === "poster" ? series.posterPath : series.backdropPath;

  return (
    <a className={`series-card series-card--${variant}`} href={showUrl(series.id)}>
      <img src={imagePath} alt="" loading="lazy" />
      <span className="series-card__shade" />
      <span className="series-card__body">
        <span className="series-card__title">{series.title}</span>
        <span className="series-card__meta">
          {series.match}% Match · {series.rating}
        </span>
      </span>
    </a>
  );
}
