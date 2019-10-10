import React from "react";
import PropTypes from "prop-types";
import { Typography } from "../typography/typography";
import "./search.css";
import icon from "./search-icon.png";

export const SearchInput = ({ className, ...rest }) => {
  return (
    <div
      className={`
        search-input-container
        ${className}
      `}
    >
      <img alt="search" className="search-input-icon" src={icon} />
      <Typography component="input" className="search-input" {...rest} />
    </div>
  );
};

SearchInput.defaultProps = {
  className: ""
};

SearchInput.propTypes = {
  className: PropTypes.string
};
