import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./App.css";
import "./styles.css";
import ContextProvider from "./context";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ContextProvider cookies={null}>
      <App />
    </ContextProvider>
  </React.StrictMode>
);
