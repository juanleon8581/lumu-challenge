import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Home } from "@/presentation/pages/Home";

import "@/presentation/styles/general.css";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./config/timeStackClient";
import { DashboardMenu } from "./components/dashboard/DashboardMenu";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <main className="flex gap-8 h-screen">
        <DashboardMenu />
        <Home />
      </main>
    </QueryClientProvider>
  </StrictMode>
);
