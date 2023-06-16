import { MantineProvider } from "@mantine/core";
import { ReactLocation, Router } from "@tanstack/react-location";
import React, { } from "react";
import ReactDOM from "react-dom/client";
import { routes } from "./shared/routes";
import { AuthProvider } from "./shared/provider/Auth";
import { ToastProvider } from 'react-toast-notifications';
import './shared/styles/globals.css'

const location = new ReactLocation();

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ToastProvider >
      <MantineProvider withNormalizeCSS withGlobalStyles>
        <AuthProvider>
          <Router location={location} routes={routes} />
        </AuthProvider>

      </MantineProvider>
    </ToastProvider>
  </React.StrictMode>
);
