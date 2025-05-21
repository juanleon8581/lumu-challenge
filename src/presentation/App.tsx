import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { ErrorPage } from "./pages/ErrorPage";
import { DashboardMenu } from "./components/dashboard/DashboardMenu";

const App = () => {
  return (
    <BrowserRouter>
      <main className="flex gap-8 h-screen">
        <DashboardMenu />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
};

export default App;
