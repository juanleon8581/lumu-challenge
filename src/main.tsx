import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Home } from "./presentation/pages/Home";

import "@/presentation/styles/general.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Home />
  </StrictMode>
);
