import "./occupation.css";
import React from "react";
import PropTypes from "prop-types";

import { Typography } from "../../../design-system/typography/typography";
import { ProgressBar } from "../../../design-system/progress-bar/progress-bar";

export const Occupation = ({ nbFishes, occupationPercent }) => {
  return (
    <article className="occupation">
      <div className="occupation-first_line">
        <Typography variant="h4" component="h3">
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
      <ProgressBar className="occupation-bar" percent={occupationPercent} />
    </article>
  );
};

Occupation.propTypes = {
  nbFishes: PropTypes.number.isRequired,
  occupationPercent: PropTypes.number.isRequired
};
