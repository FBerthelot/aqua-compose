import React from "react";
import PropTypes from "prop-types";
import "./button.css";

export const Button = ({ className, children, ...rest }) => {
  return (
    <button className={`app-button ${className}`} {...rest}>
      {children}
    </button>
  );
};

Button.defaultProps = {
  className: ""
};

Button.propTypes = {
  className: PropTypes.string
};
