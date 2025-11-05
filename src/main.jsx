import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { MovieProvider } from "./contexts/MovieContext"; // ✅ import here
import App from "./App";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter future={{v7_startTransition: true,v7_relativeSplatPath: true}}>
      <MovieProvider>   {/* ✅ Context wraps App */}
        <App />
      </MovieProvider>
    </BrowserRouter>
  </StrictMode>
);
