import React from "react";
import PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography";
import "./range-displayer.css";

export const RangeDisplayer = ({ known, range, type, unit }) => {
  return (
    <>
      <img
        alt={type}
        src={`/icon/${type}.svg`}
        className="rang-displayer-illustration"
      />
      <Typography component="span">
        {known
          ? range[0] === range[1]
            ? `${range[0]} ${unit}`
            : `${range[0]} à ${range[1]} ${unit}`
          : "non connu"}
      </Typography>
    </>
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
