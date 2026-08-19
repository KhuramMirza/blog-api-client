import "./index.css";

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Toaster } from "sonner";
import { RouterProvider } from "react-router/dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import router from "./router/route.jsx";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Don't retry failed GET requests automatically
      retry: false,
    },
    mutations: {
      // Fail immediately on POST/PUT/DELETE if the network is down
      networkMode: "offlineFirst",
      retry: false,
    },
  },
});

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
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </StrictMode>,
);
