import "./fish-card.css";
import React, { useState } from "react";
import PropTypes from "prop-types";
import { fishType } from "../../aquarium.types";

import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/AddCircleOutline";
import RmIcon from "@material-ui/icons/RemoveCircleOutline";

import { RangeDisplayer } from "../../../common/range-displayer";

export const FishCard = ({ fish, action, onNbFishChange = () => {} }) => {
  const [currentNumber, setCurrentNumber] = useState(
    fish.nbInAquarium || fish.minimumPopulation
  );

  return (
    <article className="fish_card">
      <Card>
        <CardMedia
          component="img"
          alt={fish.surname}
          image={fish.picture}
          title={fish.surname}
        />
        <CardContent>
          <Typography
            variant="h4"
            title={fish.surname || fish.name}
            component="h2"
            className="fish_card-title"
          >
            {fish.surname || fish.name}
          </Typography>
          <Typography
            variant="h6"
            title={fish.surname ? fish.name : ""}
            component="h2"
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
        </CardContent>
        <CardActions className="fish_card-actions">
          <div className="fish_card-number_changer">
            <IconButton
              onClick={() => {
                if (currentNumber === fish.minimumPopulation) {
                  return;
                }
                setCurrentNumber(currentNumber - 1);
                onNbFishChange(currentNumber - 1);
              }}
            >
              <RmIcon />
            </IconButton>
            <Typography>{currentNumber}</Typography>
            <IconButton
              onClick={() => {
                setCurrentNumber(currentNumber + 1);
                onNbFishChange(currentNumber + 1);
              }}
            >
              <AddIcon />
            </IconButton>
          </div>

          <Button
            type="button"
            variant="contained"
            color="primary"
            onClick={() => action.handler(currentNumber)}
          >
            {action.name}
          </Button>
        </CardActions>
      </Card>
    </article>
  );
};

FishCard.propTypes = {
  fish: PropTypes.shape(fishType).isRequired,
  onNbFishChange: PropTypes.func,
  action: PropTypes.shape({
    name: PropTypes.string.isRequired,
    handler: PropTypes.func.isRequired
  })
};
