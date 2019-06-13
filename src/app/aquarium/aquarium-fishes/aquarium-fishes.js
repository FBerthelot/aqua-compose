import "./aquarium-fishes.css";
import React from "react";

import { Card } from "../../design-system/card/card";
import { FishPicker } from "./fish-picker/fish-picker";

import { useRedux } from "../../useRedux";
import { sortFishesByLifeZone } from "../aquarium.logic";

export const AquariumFishes = () => {
  const { fishes, setNbOfFishes, removeFish } = useRedux(
    state => ({
      fishes: sortFishesByLifeZone(state.aquarium.fishes)
    }),
    dispatch => ({
      setNbOfFishes: (fish, nb) => {
        dispatch({
          type: "CHANGE_NB_OF_FISHES_IN_AQUARIUM",
          payload: { name: fish.name, number: nb }
        });
      },
      removeFish: name =>
        dispatch({
          type: "REMOVE_FISH_FROM_AQUARIUM",
          payload: { name }
        })
    }),
    []
  );

  const content =
    fishes.length > 0 ? (
      <>
        <section className="aquarium-fishes-list">
          {fishes.map(fish => (
            <Card
              key={fish.name}
              fish={fish}
              onNbFishChange={nb => setNbOfFishes(fish, nb)}
              action={{
                name: "Supprimer",
                handler: () => {
                  removeFish(fish.name);
                }
              }}
            />
          ))}
        </section>
        <FishPicker />
      </>
    ) : (
      <>
        <img src="/icon/carpe.svg" className="aquarium-no_fish-img" alt="" />
        <FishPicker />
      </>
    );

  return <section className="aquarium-fishes">{content}</section>;
};
