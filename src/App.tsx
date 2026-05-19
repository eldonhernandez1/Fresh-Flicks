import { getFeaturedSeries, seriesCatalog } from "./catalog";
import { Nav } from "./components/Nav";
import { useMyList } from "./myList";
import { HomePage } from "./pages/HomePage";
import { MyListPage } from "./pages/MyListPage";
import { ShowPage } from "./pages/ShowPage";
import { WatchPage } from "./pages/WatchPage";
import { useRoute } from "./router";

export default function App() {
  const route = useRoute();
  const featured = getFeaturedSeries();
  const { ids, toggle } = useMyList();

  if (route.name === "watch") {
    return <WatchPage id={route.id} />;
  }

  return (
    <div className="app-shell">
      <Nav />
      <main>
        {route.name === "show" ? (
          <ShowPage id={route.id} ids={ids} toggle={toggle} />
        ) : route.name === "list" ? (
          <MyListPage ids={ids} />
        ) : (
          <HomePage featured={featured} catalog={seriesCatalog} />
        )}
      </main>
    </div>
  );
}
