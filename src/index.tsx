import React from "react";
import * as ReactDOMCLIENT from "react-dom/client";
import "./index.css";
import AppBundle from "./AppBundle";
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';

// @ts-ignore 
const root = ReactDOMCLIENT.createRoot(document.getElementById("root"));
root.render(<React.StrictMode>{<AppBundle />}</React.StrictMode>);
