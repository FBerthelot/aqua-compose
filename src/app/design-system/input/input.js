import React from "react";
import PropTypes from "prop-types";
import { Typography } from "../typography/typography";
import "./input.css";

export const Input = ({
  className,
  variant,
  unit,
  label,
  id,
  error,
  ...rest
}) => {
  return (
    <div
      className={`
        input-label-container
        ${error ? "input-label-container_error" : ""}
        ${variant === "text-unit" ? "input-label_with-unit" : ""}
        ${className}
      `}
    >
      {label && (
        <Typography
          component="label"
          variant="label"
          htmlFor={id}
          className="input-label"
        >
          {label}
        </Typography>
      )}
      <div className="input-container">
        <Typography
          component="input"
          variant="primary-dark"
          className="input"
          id={id}
          {...rest}
        />
        {variant === "text-unit" && (
          <Typography
            component="div"
            variant="primary-dark"
            className="input-unit"
          >
            {unit}
          </Typography>
        )}
      </div>
      {error && (
        <Typography variant="error" className="input-error-message">
          {error}
        </Typography>
      )}
    </div>
  );
};

Input.defaultProps = {
  className: "",
  unit: "",
  label: "",
  variant: "text-unit",
  error: null
};

Input.propTypes = {
  className: PropTypes.string,
  label: PropTypes.string,
  id: PropTypes.string.isRequired,
  unit: PropTypes.string,
  variant: PropTypes.oneOf(["text", "text-unit", "search"]),
  error: PropTypes.string
};
