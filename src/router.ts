import { useEffect, useState } from "react";
import type { Route } from "./types";

const VALID_ID = /^[a-z0-9-]{1,80}$/;

export function parseRoute(hash = window.location.hash): Route {
  const path = hash.replace(/^#/, "") || "/";
  const parts = path.split("/").filter(Boolean);

  if (parts[0] === "list") {
    return { name: "list" };
  }

  if (parts[0] === "show" && parts[1] && VALID_ID.test(parts[1])) {
    return { name: "show", id: parts[1] };
  }

  if (parts[0] === "watch" && parts[1] && VALID_ID.test(parts[1])) {
    return { name: "watch", id: parts[1] };
  }

  return { name: "home" };
}

export function useRoute() {
  const [route, setRoute] = useState(() => parseRoute());

  useEffect(() => {
    const handleHashChange = () => setRoute(parseRoute());
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  return route;
}

export function showUrl(id: string) {
  return `#/show/${id}`;
}

export function watchUrl(id: string) {
  return `#/watch/${id}`;
}

export function listUrl() {
  return "#/list";
}
