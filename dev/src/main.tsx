import * as React from "react";
import * as ReactDOM from "react-dom/client";

import { DiamondDSInitColorSchemeScript } from "../../src/index";

import App from "./App";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <DiamondDSInitColorSchemeScript />

    <App />
  </React.StrictMode>,
);
