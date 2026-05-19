import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./styles.css";
import "@fontsource/urbanist/400.css";
import "@fontsource/urbanist/600.css";
import "@fontsource/urbanist/800.css";
import "@fontsource/urbanist/900.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
