import "./other-data.css";
import React from "react";
import PropTypes from "prop-types";

import Typography from "@material-ui/core/Typography";
import { isSmallDevice } from "../../../utils";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { RangeDisplayer } from "../../../common/range-displayer";

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
