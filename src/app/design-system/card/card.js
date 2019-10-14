import "./card.css";
import React, { useState } from "react";
import PropTypes from "prop-types";
import { fishType } from "../../aquarium/aquarium.types";

import { Typography } from "../typography/typography";
import { Button } from "..//button/button";
import { RangeDisplayer } from "../range-displayer/range-displayer";

export const Card = ({ fish, action, onNbFishChange, ...otherProps }) => {
  const [currentNumber, setCurrentNumber] = useState(
    fish.nbInAquarium || fish.minimumPopulation
  );

  return (
    <article className="fish_card" {...otherProps}>
      <img
        alt={fish.surname}
        src={fish.picture}
        title={fish.surname}
        className="fish_card-img"
      />
      <div>
        <Typography
          variant="h2"
          title={fish.surname || fish.name}
          component="h2"
          className="fish_card-title"
        >
          {fish.surname || fish.name}
        </Typography>
        <Typography
          variant="scientific-name"
          title={fish.surname ? fish.name : ""}
          component="h3"
          className="fish_card-subtitle"
        >
          {fish.surname ? fish.name : ""}
        </Typography>
        <ul className="fish_card-data">
          <li>
            <RangeDisplayer
              unit="cm"
              range={[fish.adultSize, fish.adultSize]}
              type="taille"
            />
          </li>
          <li>
            <RangeDisplayer
              unit="°C"
              range={fish.water.temperature}
              type="temperature"
            />
          </li>
          <li>
            <RangeDisplayer range={fish.water.PH} type="ph" />
          </li>
          <li>
            <RangeDisplayer unit="°D" range={fish.water.GH} type="gh" />
          </li>
        </ul>
      </div>
      <div className="fish_card-actions">
        <div className="fish_card-number_changer">
          <button
            type="button"
            disabled={currentNumber === fish.minimumPopulation}
            onClick={() => {
              if (currentNumber === fish.minimumPopulation) {
                return;
              }
              setCurrentNumber(currentNumber - 1);
              onNbFishChange(currentNumber - 1);
            }}
          >
            <img
              src={`/icon/moins${
                currentNumber === fish.minimumPopulation ? "-disabled" : ""
              }.svg`}
              alt="remove one fish"
            />
          </button>
          <Typography>
            {currentNumber} poisson{currentNumber > 1 ? "s" : ""}
          </Typography>
          <button
            type="button"
            onClick={() => {
              setCurrentNumber(currentNumber + 1);
              onNbFishChange(currentNumber + 1);
            }}
          >
            <img src="/icon/plus.svg" alt="add one fish" />
          </button>
        </div>

        <Button type="button" onClick={() => action.handler(currentNumber)}>
          {typeof action.name === "function"
            ? action.name(currentNumber)
            : action.name}
        </Button>
      </div>
    </article>
  );
};

Card.defaultProps = {
  onNbFishChange: () => {}
};

Card.propTypes = {
  fish: PropTypes.shape(fishType).isRequired,
  onNbFishChange: PropTypes.func,
  action: PropTypes.shape({
    name: PropTypes.string.isRequired,
    handler: PropTypes.func.isRequired
  })
};
