import "./aquarium-variables.css";
import React from "react";

import { Typography } from "../../design-system/typography/typography";
import { Occupation } from "./occupation/occupation";
import { OtherData } from "./other-data/other-data";

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
  const nbFishes = aquarium.fishes.reduce(
    (acc, fish) => acc + fish.nbInAquarium,
    0
  );
  const minMaxTemperature = getMinMaxOfkey(aquarium.fishes, "temperature");
  const minMaxPH = getMinMaxOfkey(aquarium.fishes, "PH");
  const minMaxGH = getMinMaxOfkey(aquarium.fishes, "GH");

  return (
    <section className="aquarium-data">
      <Typography variant="h1" component="h2">
        Mon aquarium
      </Typography>

      <Occupation nbFishes={nbFishes} occupationPercent={occupationPercent} />

      <OtherData
        volume={aquarium.volume}
        nbFishes={nbFishes}
        minMaxTemperature={minMaxTemperature}
        minMaxPH={minMaxPH}
        minMaxGH={minMaxGH}
      />
    </section>
  );
};
