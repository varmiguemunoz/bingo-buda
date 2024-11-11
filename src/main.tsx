import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import Routes from "@/routes/index";

import "@/styles/index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <div className="w-full mx-auto p-0 m-0 h-screen overflow-hidden">
      <Routes />
    </div>
  </StrictMode>
);
