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
  variant: "default",
  className: ""
};

Typography.propTypes = {
  component: PropTypes.string,
  variant: PropTypes.string,
  className: PropTypes.string
};
