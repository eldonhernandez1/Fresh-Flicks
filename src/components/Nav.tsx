import { useEffect, useRef, useState } from "react";
import { seriesCatalog } from "../catalog";
import { listUrl, showUrl } from "../router";

function safeLocalStorage(): Storage | null {
  try {
    return window.localStorage;
  } catch {
    return null;
  }
}

function readTheme(): "dark" | "light" {
  const stored = safeLocalStorage()?.getItem("theme");
  return stored === "light" ? "light" : "dark";
}

export function Nav() {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const shellRef = useRef<HTMLDivElement>(null);
  const [theme, setTheme] = useState<"dark" | "light">(readTheme);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    safeLocalStorage()?.setItem("theme", theme);
  }, [theme]);

  function toggleTheme() {
    setTheme((t) => (t === "dark" ? "light" : "dark"));
  }

  const results = query.trim()
    ? seriesCatalog
        .filter((s) => {
          const q = query.toLowerCase();
          return (
            s.title.toLowerCase().includes(q) ||
            s.genres.some((g) => g.toLowerCase().includes(q)) ||
            s.cast.some((c) => c.toLowerCase().includes(q))
          );
        })
        .slice(0, 5)
    : [];

  useEffect(() => {
    function onMouseDown(e: MouseEvent) {
      if (shellRef.current && !shellRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", onMouseDown);
    return () => document.removeEventListener("mousedown", onMouseDown);
  }, []);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setQuery(e.target.value);
    setOpen(true);
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Escape") {
      setQuery("");
      setOpen(false);
    }
  }

  function handleResultClick() {
    setQuery("");
    setOpen(false);
  }

  return (
    <header className="topbar">
      <a className="brand" href="#/" aria-label="Fresh Flicks home">
        <span className="brand-mark">F</span>
        <span>Fresh Flicks</span>
      </a>

      <nav className="nav-links" aria-label="Primary navigation">
        <a href="#/">Home</a>
        <a href="#/">Series</a>
        <a href="#/">New</a>
        <a href={listUrl()}>My List</a>
      </nav>

      <div className="search-area">
        <div className="search-shell" ref={shellRef}>
          <label className="search-input-row" htmlFor="search-input">
            <span className="search-shell__icon" aria-hidden="true" />
            <input
              id="search-input"
              aria-label="Search titles"
              aria-expanded={open && results.length > 0}
              aria-haspopup="listbox"
              aria-controls="search-listbox"
              placeholder="Search titles"
              value={query}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              autoComplete="off"
            />
          </label>

          {open && results.length > 0 && (
            <ul id="search-listbox" className="search-dropdown" role="listbox" aria-label="Search results">
              {results.map((s) => (
                <li key={s.id} role="option" aria-selected={false}>
                  <a
                    className="search-result"
                    href={showUrl(s.id)}
                    onClick={handleResultClick}
                  >
                    <img src={s.posterPath} alt="" className="search-result__poster" />
                    <div className="search-result__info">
                      <span className="search-result__title">{s.title}</span>
                      <span className="search-result__meta">
                        {s.genres.join(" · ")} · {s.year}
                      </span>
                    </div>
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>

        <button
          className="theme-toggle"
          onClick={toggleTheme}
          aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
        >
          {theme === "dark" ? "☀" : "☽"}
        </button>
      </div>
    </header>
  );
}
