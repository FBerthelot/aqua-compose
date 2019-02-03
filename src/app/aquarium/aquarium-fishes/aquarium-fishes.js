import "./aquarium-fishes.css";
import React from "react";

import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import TextField from "@material-ui/core/TextField";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import IconButton from "@material-ui/core/IconButton";
import InfoIcon from "@material-ui/icons/Info";
import RmIcon from "@material-ui/icons/RemoveCircleOutline";

import { useRedux } from "../../useRedux";
import { sortFishesByLifeZone } from "../aquarium.logic";

export const AquariumFishes = () => {
  const { fishes, setNbOfFishes, removeFish } = useRedux(
    state => ({
      fishes: sortFishesByLifeZone(state.aquarium.fishes)
    }),
    dispatch => ({
      setNbOfFishes: fish => e => {
        e.preventDefault();
        if (Number(e.target.value) >= fish.minimumPopulation) {
          dispatch({
            type: "CHANGE_NB_OF_FISHES_IN_AQUARIUM",
            payload: { name: fish.name, number: Number(e.target.value) }
          });
        }
      },
      removeFish: name => () =>
        dispatch({
          type: "REMOVE_FISH_FROM_AQUARIUM",
          payload: { name }
        })
    }),
    []
  );

  return (
    <section className="aquarium">
      <div className="aquarium-fishes_container">
        <Typography gutterBottom variant="h4" component="h3">
          Mes poissons
        </Typography>
        <section className="aquarium-fishes">
          {fishes.map(fish => (
            <article key={fish.name}>
              <Card>
                <CardMedia
                  component="img"
                  alt={fish.surname}
                  image={fish.picture}
                  title={fish.surname}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                    {fish.name}
                  </Typography>
                  <ul>
                    <li>
                      T : {fish.water.temperature[0]} à{" "}
                      {fish.water.temperature[1]}°C
                    </li>
                    <li>
                      PH : {fish.water.PH[0]} à {fish.water.PH[1]}
                    </li>
                    <li>
                      GH : {fish.water.GH[0]} à {fish.water.GH[1]}°D
                    </li>
                  </ul>
                </CardContent>
                <CardActions>
                  <TextField
                    label="Nombre de poissons"
                    value={fish.nbInAquarium}
                    onChange={setNbOfFishes(fish)}
                    required
                    min={fish.minimumPopulation}
                    type="number"
                  />
                  <IconButton href={fish.link} target="_blank" rel="noopener">
                    <InfoIcon />
                  </IconButton>

                  <IconButton onClick={removeFish(fish.name)}>
                    <RmIcon />
                  </IconButton>
                </CardActions>
              </Card>
            </article>
          ))}
        </section>
      </div>
    </section>
  );
};
