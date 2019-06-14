import React from "react";
import PropTypes from "prop-types";
import { Typography } from "../typography/typography";
import "./range-displayer.css";

export const RangeDisplayer = ({ known, range, type, unit }) => {
  return (
    <figure className="range-displayer-container range-displayer-illustration">
      <img
        alt={type}
        src={`/icon/${type}.svg`}
        className="range-displayer-illustration"
      />
      <Typography component="figcaption">
        {known
          ? range[0] === range[1]
            ? `${range[0]}`
            : `${range[0]} à ${range[1]}`
          : "non connu"}
        &nbsp;{known ? unit : ""}
      </Typography>
    </figure>
  );
};

RangeDisplayer.defaultProps = {
  known: true,
  unit: ""
};

RangeDisplayer.propTypes = {
  known: PropTypes.bool,
  range: PropTypes.arrayOf(PropTypes.number),
  type: PropTypes.string.isRequired,
  unit: PropTypes.string
};
