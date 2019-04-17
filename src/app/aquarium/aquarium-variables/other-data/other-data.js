import "./other-data.css";
import React, { useState } from "react";
import PropTypes from "prop-types";

import { Typography } from "../../../design-system/typography/typography";
import { isSmallDevice } from "../../../utils";
import { RangeDisplayer } from "../../../design-system/range-displayer/range-displayer";

export const OtherData = ({
  volume,
  nbFishes,
  minMaxTemperature,
  minMaxPH,
  minMaxGH
}) => {
  if (!isSmallDevice()) {
    return (
      <>
        <ul className="aquarium-data-other_data">
          <li>
            <RangeDisplayer range={[volume, volume]} type="volume" unit="L" />
          </li>
          <li>
            <RangeDisplayer
              known={nbFishes > 0}
              range={minMaxTemperature}
              type="temperature"
              unit="°C"
            />
          </li>
          <li>
            <RangeDisplayer known={nbFishes > 0} range={minMaxPH} type="ph" />
          </li>
          <li>
            <RangeDisplayer
              known={nbFishes > 0}
              range={minMaxGH}
              type="gh"
              unit="°d"
            />
          </li>
        </ul>
        <Typography className="aquarium-data-info" variant="caption">
          * données éstimées par rapport aux poissons choisis
        </Typography>
      </>
    );
  }

  const [isExpended, toogle] = useState(false);

  const content = (
    <div
      className={`other-data-content ${
        isExpended ? "other-data-content_expended" : ""
      }`}
    >
      <div className="occupation-other_data-fish_number" />
      <ul className="aquarium-data-other_data">
        <li>
          <img
            alt=""
            src="/icon/fish-number.svg"
            className="aquarium-data-illustration"
          />
          <Typography component="span">
            {nbFishes} poisson
            {nbFishes > 1 ? "s" : ""}
          </Typography>
        </li>
        <li>
          <RangeDisplayer range={[volume, volume]} type="volume" unit="L" />
        </li>
        <li>
          <RangeDisplayer
            known={nbFishes > 0}
            range={minMaxTemperature}
            type="temperature"
            unit="°C"
          />
        </li>
        <li>
          <RangeDisplayer known={nbFishes > 0} range={minMaxPH} type="ph" />
        </li>
        <li>
          <RangeDisplayer
            known={nbFishes > 0}
            range={minMaxGH}
            type="gh"
            unit="°d"
          />
        </li>
      </ul>

      <Typography className="aquarium-data-info">
        * données éstimées par rapport aux poissons choisis
      </Typography>
    </div>
  );

  return (
    <>
      {content}
      <div className="aquarium-data-expend-bar">
        <button
          className={isExpended ? "aquarium-data-expend-button_expended" : ""}
        >
          <img
            alt="toogle"
            src="/icon/low.svg"
            onClick={() => toogle(!isExpended)}
          />
        </button>
      </div>
    </>
  );
};

OtherData.propTypes = {
  volume: PropTypes.number.isRequired,
  nbFishes: PropTypes.number.isRequired,
  minMaxTemperature: PropTypes.arrayOf(PropTypes.number),
  minMaxPH: PropTypes.arrayOf(PropTypes.number),
  minMaxGH: PropTypes.arrayOf(PropTypes.number)
};
