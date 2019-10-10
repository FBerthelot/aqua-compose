import React from "react";
import PropTypes from "prop-types";
import "./typography.css";

export const Typography = ({
  className,
  component,
  variant,
  children,
  ...rest
}) => {
  return React.createElement(
    component,
    {
      ...rest,
      className: `typography typography_${variant} ${className}`
    },
    children
  );
};

Typography.defaultProps = {
  component: "p",
  variant: "text",
  className: ""
};

Typography.propTypes = {
  component: PropTypes.string,
  variant: PropTypes.oneOf([
    "button",
    "button-disabled",
    "error",
    "h1",
    "h2",
    "h3",
    "h4",
    "label",
    "scientific-name",
    "text",
    "text-center",
    "primary-dark",
    "white"
  ]),
  className: PropTypes.string
};
