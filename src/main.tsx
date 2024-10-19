import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createRouter } from '@tanstack/react-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import './index.css';
import { APIProvider } from '@vis.gl/react-google-maps';

import { routeTree } from './routeTree.gen';
// import { Toaster } from 'sonner';
import { ThemeProvider } from './components/ui/theme-provider';
import { Toaster } from './components/ui/sonner';

const queryClient = new QueryClient();
const router = createRouter({
  routeTree,
  defaultPreload: 'intent',
  context: { queryClient },
});

const API_KEY = import.meta.env.VITE_APP_GOOGLE_MAPS_API_KEY;

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <APIProvider apiKey={API_KEY}>
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
          <Toaster richColors theme="dark" />
          <RouterProvider router={router} />
        </ThemeProvider>
      </APIProvider>
    </QueryClientProvider>
  </React.StrictMode>,
);
