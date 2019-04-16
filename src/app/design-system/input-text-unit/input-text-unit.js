import React from "react";
import PropTypes from "prop-types";
import "./input-text-unit.css";

export const InputTextUnit = ({ className, unit, ...rest }) => {
  return (
    <div className={`text-field-container ${className}`}>
      <input className="text-field" {...rest} />
      <div className="text-field-unit">{unit}</div>
    </div>
  );
};

InputTextUnit.defaultProps = {
  className: "",
  unit: ""
};

InputTextUnit.propTypes = {
  className: PropTypes.string,
  unit: PropTypes.string
};
