import React from "react";
import PropTypes from "prop-types";
import "./progress-bar.css";
import { Typography } from "../typography/typography";

export const ProgressBar = ({ className, percent, ...rest }) => {
  return (
    <Typography
      className={`progress-bar ${
        percent >= 90 ? "progress-bar_full" : ""
      } ${className}`}
      variant="primary-dark"
      style={{
        backgroundSize: `${percent}%`
      }}
    >
      {Math.floor(percent)}&nbsp;%
    </Typography>
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
