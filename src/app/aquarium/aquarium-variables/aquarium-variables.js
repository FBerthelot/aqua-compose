import "./aquarium-variables.css";
import React from "react";

import Typography from "@material-ui/core/Typography";
import LinearProgress from "@material-ui/core/LinearProgress";
import { getOccupationRatio, getMinMaxOfkey } from "../aquarium.logic";
import { useRedux } from "../../useRedux";

export const AquariumVariables = () => {
  const { aquarium } = useRedux(
    state => ({ aquarium: state.aquarium }),
    undefined,
    []
  );

  const occupationPercent = getOccupationRatio(
    aquarium.fishes,
    aquarium.volume
  );
  const minMaxTemperature = getMinMaxOfkey(aquarium.fishes, "temperature");
  const minMaxPH = getMinMaxOfkey(aquarium.fishes, "PH");
  const minMaxGH = getMinMaxOfkey(aquarium.fishes, "GH");

  return (
    <section className="aquarium-data">
      <Typography gutterBottom variant="h4" component="h3">
        Mes informations
      </Typography>

      <Typography gutterBottom variant="h5" component="h4">
        Occupation de l'aquarium
      </Typography>
      <div>
        <LinearProgress variant="determinate" value={occupationPercent} />
        {Math.floor(occupationPercent)} %
      </div>

      <Typography gutterBottom variant="h5" component="h4">
        Constantes
      </Typography>

      <ul>
        <li>V&nbsp;&nbsp; : {aquarium.volume} L</li>
        <li>
          T&nbsp;&nbsp; :{" "}
          {aquarium.fishes.length > 0
            ? `${minMaxTemperature[0]} à ${minMaxTemperature[1]} °C`
            : "NC"}
        </li>
        <li>
          PH :{" "}
          {aquarium.fishes.length > 0
            ? `${minMaxPH[0]} à ${minMaxPH[1]}`
            : "NC"}
        </li>
        <li>
          GH :{" "}
          {aquarium.fishes.length > 0
            ? `${minMaxGH[0]} à ${minMaxGH[1]} °d`
            : "NC"}
        </li>
      </ul>
    </section>
  );
};
