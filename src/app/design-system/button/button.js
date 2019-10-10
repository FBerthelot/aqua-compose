import React from "react";
import PropTypes from "prop-types";
import { Typography } from "../typography/typography";
import "./button.css";

export const Button = ({ className, children, variant, disabled, ...rest }) => {
  return (
    <button
      className={`app-button app-button_${variant} ${className}`}
      {...rest}
      disabled={disabled}
    >
      <Typography
        component="span"
        variant={disabled ? "button-disabled" : "button"}
      >
        {children}
      </Typography>
    </button>
  );
};

Button.defaultProps = {
  className: "",
  variant: "primary",
  disabled: false
};

Button.propTypes = {
  className: PropTypes.string,
  disabled: PropTypes.bool,
  variant: PropTypes.oneOf(["secondary", "primary"])
};
