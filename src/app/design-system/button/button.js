import React from "react";
import PropTypes from "prop-types";
import "./button.css";

export const Button = ({ className, children, variant, ...rest }) => {
  return (
    <button
      className={`app-button app-button_${variant} ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
};

Button.defaultProps = {
  className: "",
  variant: "primary"
};

Button.propTypes = {
  className: PropTypes.string,
  variant: PropTypes.oneOf(["secondary", "primary"])
};
