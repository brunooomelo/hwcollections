import { MantineProvider } from "@mantine/core";
import { ToastProvider } from 'react-toast-notifications';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactLocation, Router } from "@tanstack/react-location";
import React, { } from "react";
import ReactDOM from "react-dom/client";
import { routes } from "./shared/routes";
import { AuthProvider } from "./shared/provider/Auth";
import './shared/styles/globals.css'

const location = new ReactLocation();

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 0
    }
  }
})

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ToastProvider>
      <QueryClientProvider client={queryClient}>
        <MantineProvider withNormalizeCSS withGlobalStyles>
          <AuthProvider>
            <Router location={location} routes={routes} />
          </AuthProvider>

        </MantineProvider>
      </QueryClientProvider>
    </ToastProvider>
  </React.StrictMode>
);
