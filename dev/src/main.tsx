import * as React from "react";
import * as ReactDOM from "react-dom/client";

import { InitColorSchemeScript } from "@mui/material";

import App from "./App";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <InitColorSchemeScript attribute="[data-mode='%s']" />
    <App />
  </React.StrictMode>,
);
