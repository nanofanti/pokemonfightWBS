import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import PokemonAPIContextProvider from "./Context/PokemonAPIContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <PokemonAPIContextProvider>
        <App />
      </PokemonAPIContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);
