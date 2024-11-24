import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import Routes from "@/routes/index";

import "@/styles/index.css";
import { Toaster } from "sonner";
import { ReduxProvider } from "./redux/reduxProvider";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ReduxProvider>
      <div className="w-full p-0 m-0 font-ubuntu">
        <Toaster />
        <Routes />
      </div>
    </ReduxProvider>
  </StrictMode>
);
