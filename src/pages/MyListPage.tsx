import { findSeries } from "../catalog";
import { Row } from "../components/Row";
import type { Series } from "../types";

type MyListPageProps = {
  ids: string[];
};

export function MyListPage({ ids }: MyListPageProps) {
  const series = ids
    .map((id) => findSeries(id))
    .filter((s): s is Series => s !== undefined);

  return (
    <div className="my-list-page">
      <div className="row__heading">
        <h2>My List</h2>
      </div>
      {series.length === 0 ? (
        <p className="my-list__empty">
          Nothing saved yet — browse titles and click <strong>+ My List</strong> to save them here.
        </p>
      ) : (
        <Row title="" items={series} />
      )}
    </div>
  );
}
