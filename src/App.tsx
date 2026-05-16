import { getFeaturedSeries, seriesCatalog } from "./catalog";
import { Nav } from "./components/Nav";
import { HomePage } from "./pages/HomePage";
import { ShowPage } from "./pages/ShowPage";
import { WatchPage } from "./pages/WatchPage";
import { useRoute } from "./router";

export default function App() {
  const route = useRoute();
  const featured = getFeaturedSeries();

  if (route.name === "watch") {
    return <WatchPage id={route.id} />;
  }

  return (
    <div className="app-shell">
      <Nav />
      <main>
        {route.name === "show" ? (
          <ShowPage id={route.id} />
        ) : (
          <HomePage featured={featured} catalog={seriesCatalog} />
        )}
      </main>
    </div>
  );
}
