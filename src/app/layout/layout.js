import "./layout.css";
import React, { useState } from "react";
import PropTypes from "prop-types";
import { Header } from "./header/header";
import { Menu } from "./menu/menu";

export const Layout = ({ children }) => {
  const [drawerIsOpen, setDrawerIsOpen] = useState(false);

  return (
    <>
      <Menu drawerIsOpen={drawerIsOpen} setDrawerIsOpen={setDrawerIsOpen} />
      <Header setDrawerIsOpen={setDrawerIsOpen} />
      <main className="main">{children}</main>
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.element.isRequired
};
