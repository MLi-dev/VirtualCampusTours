import React from "react";
import * as ReactDOMCLIENT from "react-dom/client";
import "./index.css";
import App from "./App";
// import AppBundle from "./AppBundle";

const root = ReactDOMCLIENT.createRoot(document.getElementById("root"));
root.render(<React.StrictMode>{<App />}</React.StrictMode>);
