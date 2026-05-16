import type { Series } from "../types";
import { SeriesCard } from "./SeriesCard";

type RowProps = {
  title: string;
  items: Series[];
  variant?: "poster" | "wide";
};

export function Row({ title, items, variant = "poster" }: RowProps) {
  if (items.length === 0) {
    return null;
  }

  return (
    <section className="row" aria-labelledby={`row-${slugify(title)}`}>
      <div className="row__heading">
        <h2 id={`row-${slugify(title)}`}>{title}</h2>
      </div>
      <div className={`row__rail row__rail--${variant}`}>
        {items.map((series) => (
          <SeriesCard key={series.id} series={series} variant={variant} />
        ))}
      </div>
    </section>
  );
}

function slugify(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, "-");
}
