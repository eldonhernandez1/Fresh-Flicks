import { findSeries, getMoreLikeThis } from "../catalog";
import { MetaLine } from "../components/MetaLine";
import { Row } from "../components/Row";
import { watchUrl } from "../router";

type ShowPageProps = {
  id: string;
};

export function ShowPage({ id }: ShowPageProps) {
  const series = findSeries(id);

  if (!series) {
    return (
      <section className="not-found">
        <h1>Title Not Found</h1>
        <a className="button button--primary" href="#/">
          Back Home
        </a>
      </section>
    );
  }

  const moreLikeThis = getMoreLikeThis(series);

  return (
    <>
      <section className="detail-hero" aria-label={`${series.title} details`}>
        <img className="detail-hero__image" src={series.backdropPath} alt="" />
        <div className="detail-hero__veil" />
        <div className="detail-hero__grid">
          <div className="detail-copy">
            <a className="back-link" href="#/">
              ← Browse
            </a>
            <p className="eyebrow">{series.genres.join(" · ")}</p>
            <h1>{series.title}</h1>
            <p className="tagline">{series.tagline}</p>
            <MetaLine series={series} />
            <p className="description">{series.description}</p>
            <div className="actions">
              <a className="button button--primary" href={watchUrl(series.id)}>
                ▶ Play
              </a>
              <button className="button button--ghost" type="button">
                + My List
              </button>
            </div>
          </div>

          <aside className="detail-panel" aria-label="Title metadata">
            <img src={series.posterPath} alt="" />
            <dl>
              <div>
                <dt>Creator</dt>
                <dd>{series.creator}</dd>
              </div>
              <div>
                <dt>Cast</dt>
                <dd>{series.cast.join(", ")}</dd>
              </div>
              <div>
                <dt>Genres</dt>
                <dd>{series.genres.join(", ")}</dd>
              </div>
            </dl>
          </aside>
        </div>
      </section>

      <div className="content-stack content-stack--detail">
        <section className="episodes">
          <div className="row__heading">
            <h2>Episodes</h2>
          </div>
          <div className="episode-list">
            {Array.from({ length: Math.min(series.seasons + 2, 5) }, (_, index) => (
              <a key={index} className="episode" href={watchUrl(series.id)}>
                <span className="episode__number">{index + 1}</span>
                <span>
                  <strong>{episodeTitle(series.title, index)}</strong>
                  <small>
                    {42 + index}m · Workshop TODO: expand this into real episode data.
                  </small>
                </span>
              </a>
            ))}
          </div>
        </section>

        <Row title="More Like This" items={moreLikeThis} variant="wide" />
      </div>
    </>
  );
}

function episodeTitle(title: string, index: number) {
  const names = ["Pilot", "Second Signal", "The Turn", "Open Channel", "Afterimage"];
  return `${title}: ${names[index] ?? `Episode ${index + 1}`}`;
}
