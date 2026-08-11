import "./index.css";

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Toaster } from "sonner";
import { RouterProvider } from "react-router/dom";

import router from "./routes/route.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Toaster
      position={"top-center"}
      toastOptions={{
        style: {
          background: "purple",
          color: "lightslategrey",
          fontWeight: "bold",
        },
      }}
    />
    <RouterProvider router={router} />
  </StrictMode>,
);
