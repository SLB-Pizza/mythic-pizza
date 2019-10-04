import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import "./sass/index.scss";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import "./fonts/Graphik-Regular.otf";

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById("root")
);

serviceWorker.unregister();
