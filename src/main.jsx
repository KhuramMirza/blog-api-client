import "./index.css";

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Toaster } from "sonner";
import { RouterProvider } from "react-router/dom";

import router from "./routes/route.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Toaster
      position="top-center"
      toastOptions={{
        duration: 4000,
        style: {
          background: "#1e293b", // slate-800
          color: "#f1f5f9", // slate-100
          fontWeight: 500,
          fontSize: "14px",
          padding: "12px 16px",
          borderRadius: "8px",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.25)",
        },
        success: {
          duration: 3000,
          iconTheme: {
            primary: "#22c55e", // green-500
            secondary: "#f1f5f9",
          },
          style: {
            background: "#1e293b",
            border: "1px solid #22c55e",
          },
        },
        error: {
          duration: 5000,
          iconTheme: {
            primary: "#ef4444", // red-500
            secondary: "#f1f5f9",
          },
          style: {
            background: "#1e293b",
            border: "1px solid #ef4444",
          },
        },
      }}
    />
    <RouterProvider router={router} />
  </StrictMode>,
);
