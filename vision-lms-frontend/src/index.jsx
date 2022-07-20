import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";

import { persistQueryClient } from "react-query/persistQueryClient-experimental";
import { QueryClient, QueryClientProvider } from "react-query";
import { createWebStoragePersistor } from "react-query/createWebStoragePersistor-experimental";

import App from "./App";
import "./index.css";
import { ContextProvider } from "./contexts/ContextProvider";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      cacheTime: 1000 * 60 * 60 * 24,
    },
  },
});

const localStoragePersistor = createWebStoragePersistor({
  storage: window.localStorage,
});

persistQueryClient({
  queryClient,
  persistor: localStoragePersistor,
});

ReactDOM.render(
  <QueryClientProvider client={queryClient}>
    <Router>
      <ContextProvider>
        <App />
      </ContextProvider>
    </Router>
  </QueryClientProvider>,
  document.getElementById("root")
);
