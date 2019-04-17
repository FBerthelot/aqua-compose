import "./layout.css";
import React from "react";
import PropTypes from "prop-types";
import { Header } from "./header/header";

export const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <main className="main">{children}</main>
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.element.isRequired
};
