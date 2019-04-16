import "./occupation.css";
import React from "react";
import PropTypes from "prop-types";

import Typography from "@material-ui/core/Typography";
import LinearProgress from "@material-ui/core/LinearProgress";

export const Occupation = ({ nbFishes, occupationPercent }) => {
  return (
    <article className="occupation">
      <div className="occupation-first_line">
        <Typography gutterBottom variant="h5" component="h3">
          Taux d'occupation
        </Typography>
        <div className="occupation-first_line-fish_number">
          <img
            alt=""
            src="/icon/fish-number.svg"
            className="aquarium-data-illustration"
          />
          <Typography>
            {nbFishes} poisson
            {nbFishes > 1 ? "s" : ""}
          </Typography>
        </div>
      </div>
      <div className="occupation-second_line">
        <LinearProgress
          className="occupation-bar"
          variant="determinate"
          value={occupationPercent}
        />
        <div>{Math.floor(occupationPercent)}&nbsp;%</div>
      </div>
    </article>
  );
};

Occupation.propTypes = {
  nbFishes: PropTypes.number.isRequired,
  occupationPercent: PropTypes.number.isRequired
};
