import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import "./i18n"; // <— import once
import App from "./App.jsx";
import { HomeDataProvider, useHomeData } from "./contexts/HomeDataContext.jsx";

function RemountOnLanguage() {
  const { lang } = useHomeData();
  return <App key={lang} />; // forces remount on language change
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <HomeDataProvider>
        <RemountOnLanguage />
      </HomeDataProvider>
    </BrowserRouter>
  </StrictMode>
);
