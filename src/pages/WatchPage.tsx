import { findSeries } from "../catalog";

type WatchPageProps = {
  id: string;
};

export function WatchPage({ id }: WatchPageProps) {
  const series = findSeries(id);

  if (!series) {
    return (
      <main className="watch-shell">
        <section className="not-found">
          <h1>Title Not Found</h1>
          <a className="button button--primary" href="#/">
            Back Home
          </a>
        </section>
      </main>
    );
  }

  return (
    <main className="watch-shell">
      <div className="watch-topbar">
        <a href={`#/show/${series.id}`} aria-label={`Back to ${series.title}`}>
          ←
        </a>
        <div>
          <strong>{series.title}</strong>
          <span>Season 1 · Episode 1</span>
        </div>
      </div>

      <section className="player-stage" aria-label={`${series.title} video player`}>
        <video
          src={series.videoPath}
          poster={series.backdropPath}
          title={`${series.title} — preview`}
          controls
          playsInline
          loop
        />
      </section>

      <aside className="watch-drawer">
        <p className="eyebrow">Workshop TODO</p>
        <h1>Watch Page Feature Surface</h1>
        <p>
          This page is intentionally simple. It is a good place to add episode
          selection, autoplay previews, subtitles, progress tracking, or richer player
          metadata.
        </p>
      </aside>
    </main>
  );
}
