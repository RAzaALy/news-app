import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { ArticlesProvider } from "./context/ArticlesContext.tsx";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

// Create a QueryClient instance
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2, // Retry failed queries twice
      refetchOnWindowFocus: false, // Prevent refetching on window focus
      staleTime: 1000 * 60 * 5, // Data remains fresh for 5 minutes
    },
  },
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    {/* Provide React Query context to the application */}
    <QueryClientProvider client={queryClient}>
      {/* Provide Articles context to the application */}
      <ArticlesProvider>
        <App />
      </ArticlesProvider>
      {/* Optional React Query Devtools for debugging */}
      <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
    </QueryClientProvider>
  </StrictMode>
);
