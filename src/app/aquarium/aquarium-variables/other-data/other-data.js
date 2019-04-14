import "./other-data.css";
import React from "react";
import PropTypes from "prop-types";

import Typography from "@material-ui/core/Typography";
import { isSmallDevice } from "../../../utils";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

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
            <img
              alt="Volume"
              src="/icon/equerre.svg"
              className="aquarium-data-illustration"
            />
            <Typography component="span">{volume}&nbsp;L</Typography>
          </li>
          <li>
            <img
              alt="Temperature"
              src="/icon/temperature.svg"
              className="aquarium-data-illustration"
            />
            <Typography component="span">
              {nbFishes > 0
                ? `${minMaxTemperature[0]} à ${minMaxTemperature[1]} °C`
                : "non connu"}
            </Typography>
          </li>
          <li>
            <img
              alt="PH"
              src="/icon/ph.svg"
              className="aquarium-data-illustration"
            />
            <Typography component="span">
              {nbFishes > 0 ? `${minMaxPH[0]} à ${minMaxPH[1]}` : "non connu"}
            </Typography>
          </li>
          <li>
            <img
              alt="GH"
              src="/icon/gh.svg"
              className="aquarium-data-illustration"
            />
            <Typography component="span">
              {nbFishes > 0
                ? `${minMaxGH[0]} à ${minMaxGH[1]}&nbsp;°d`
                : "non connu"}
            </Typography>
          </li>
        </ul>
        <Typography className="aquarium-data-info" variant="caption">
          * données éstimées par rapport aux poissons choisis
        </Typography>
      </>
    );
  }

  return (
    <ExpansionPanel className="aquarium-data-other_data">
      <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />} />
      <ExpansionPanelDetails className="aquarium-data-other_data-expended">
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
            <img
              alt="Volume"
              src="/icon/equerre.svg"
              className="aquarium-data-illustration"
            />
            <Typography component="span">{volume}&nbsp;L</Typography>
          </li>
          <li>
            <img
              alt="Temperature"
              src="/icon/temperature.svg"
              className="aquarium-data-illustration"
            />
            <Typography component="span">
              {nbFishes > 0
                ? `${minMaxTemperature[0]} à ${minMaxTemperature[1]} °C`
                : "non connu"}
            </Typography>
          </li>
          <li>
            <img
              alt="PH"
              src="/icon/ph.svg"
              className="aquarium-data-illustration"
            />
            <Typography component="span">
              {nbFishes > 0 ? `${minMaxPH[0]} à ${minMaxPH[1]}` : "non connu"}
            </Typography>
          </li>
          <li>
            <img
              alt="GH"
              src="/icon/gh.svg"
              className="aquarium-data-illustration"
            />
            <Typography component="span">
              {nbFishes > 0
                ? `${minMaxGH[0]} à ${minMaxGH[1]}&nbsp;°d`
                : "non connu"}
            </Typography>
          </li>
        </ul>

        <Typography className="aquarium-data-info" variant="caption">
          * données éstimées par rapport aux poissons choisis
        </Typography>
      </ExpansionPanelDetails>
    </ExpansionPanel>
  );
};

OtherData.propTypes = {
  volume: PropTypes.number.isRequired,
  nbFishes: PropTypes.number.isRequired,
  minMaxTemperature: PropTypes.arrayOf(PropTypes.number),
  minMaxPH: PropTypes.arrayOf(PropTypes.number),
  minMaxGH: PropTypes.arrayOf(PropTypes.number)
};
