import "./reset.css";
import React from "react";
import ReactDOM from "react-dom";
import App from "./app/app";
import "particles.js";
import "./particule.css";

ReactDOM.render(<App />, document.getElementById("root"));

window.particlesJS.load("particles-js", "/particlesjs-config.json");
