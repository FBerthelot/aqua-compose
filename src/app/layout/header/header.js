import React from "react";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";

export const Header = ({ setDrawerIsOpen }) => {
  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton
          onClick={() => setDrawerIsOpen(true)}
          color="inherit"
          aria-label="Menu"
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" color="inherit">
          Aqua compose
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

Header.propTypes = {
  setDrawerIsOpen: PropTypes.func.isRequired
};
