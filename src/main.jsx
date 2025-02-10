import { createRoot } from "react-dom/client";
import App from "./components/App/App";
import "./index.css";
import "modern-normalize";
import { BrowserRouter } from "react-router-dom";
import { StrictMode } from "react";
import { Toaster } from "react-hot-toast";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <App />
      <Toaster position="top-center" reverseOrder={false} />
    </BrowserRouter>
  </StrictMode>
);
