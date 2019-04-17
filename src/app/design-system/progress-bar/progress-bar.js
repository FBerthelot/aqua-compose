import React from "react";
import PropTypes from "prop-types";
import "./progress-bar.css";

export const ProgressBar = ({ className, percent, ...rest }) => {
  return (
    <div
      className={`progress-bar ${
        percent >= 90 ? "progress-bar_full" : ""
      } ${className}`}
      style={{
        backgroundSize: `${percent}%`
      }}
    >
      {Math.floor(percent)}&nbsp;%
    </div>
  );
};

ProgressBar.defaultProps = {
  className: "",
  unit: ""
};

ProgressBar.propTypes = {
  className: PropTypes.string,
  percent: PropTypes.number
};
