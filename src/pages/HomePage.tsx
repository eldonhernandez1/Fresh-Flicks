import { getGenres, getSeriesByGenre } from "../catalog";
import { MetaLine } from "../components/MetaLine";
import { Row } from "../components/Row";
import { watchUrl } from "../router";
import type { Series } from "../types";

type HomePageProps = {
  featured: Series;
  catalog: Series[];
};

export function HomePage({ featured, catalog }: HomePageProps) {
  const genres = getGenres();
  const highMatch = [...catalog].sort((a, b) => b.match - a.match).slice(0, 10);
  const newest = [...catalog].sort((a, b) => b.year - a.year).slice(0, 10);

  return (
    <>
      <section className="hero" aria-label={`Featured series: ${featured.title}`}>
        <img className="hero__image" src={featured.backdropPath} alt="" />
        <div className="hero__veil" />
        <div className="hero__content">
          <p className="eyebrow">Workshop Starter Catalog</p>
          <h1>{featured.title}</h1>
          <p className="tagline">{featured.tagline}</p>
          <MetaLine series={featured} />
          <p className="description">{featured.description}</p>
          <div className="actions">
            <a className="button button--primary" href={watchUrl(featured.id)}>
              ▶ Play
            </a>
            <a className="button button--ghost" href={`#/show/${featured.id}`}>
              More Info
            </a>
          </div>
        </div>
      </section>

      <div className="content-stack">
        <Row title="Top Matches" items={highMatch} />
        <Row title="New Releases" items={newest} variant="wide" />
        {genres.slice(0, 5).map((genre) => (
          <Row key={genre} title={genre} items={getSeriesByGenre(genre)} />
        ))}
      </div>
    </>
  );
}
