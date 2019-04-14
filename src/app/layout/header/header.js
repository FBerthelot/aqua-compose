import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import "./header.css";

export const Header = () => {
  return (
    <AppBar component="header" className="app-header" position="static">
      <Toolbar>
        <h1>
          <img alt="Aqua Compose" src="/icon/icon-with-text.svg" />
        </h1>
      </Toolbar>
    </AppBar>
  );
};
