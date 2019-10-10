import "./fish-picker.css";
import React, { useState } from "react";

import { SearchInput } from "../../../design-system/search/search";
import { Typography } from "../../../design-system/typography/typography";

import { Button } from "../../../design-system/button/button";

import { Card } from "../../../design-system/card/card";

import { useRedux } from "../../../useRedux";
import { getMinMaxOfkey } from "../../aquarium.logic";

export const FishPicker = () => {
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [search, setSearch] = useState("");
  const searchLowerCase = search.toLowerCase();

  const { fishes, addFishInAquarium } = useRedux(
    state => {
      const minMaxAquaPH = getMinMaxOfkey(state.aquarium.fishes, "PH");
      const minMaxAquaGH = getMinMaxOfkey(state.aquarium.fishes, "GH");
      const minMaxAquaTemperature = getMinMaxOfkey(
        state.aquarium.fishes,
        "temperature"
      );

      return {
        fishes: state.fishes
          .filter(f => {
            if (!search) {
              return true;
            }
            return (
              f.name.toLowerCase().includes(searchLowerCase) ||
              (f.surname && f.surname.toLowerCase().includes(searchLowerCase))
            );
          })
          .filter(f => f.minimumVolume <= state.aquarium.volume)
          .filter(
            f => !state.aquarium.fishes.find(fish => fish.name === f.name)
          )
          .filter(
            f =>
              state.aquarium.fishes.length === 0 ||
              (!(f.water.PH[0] > minMaxAquaPH[1]) &&
                !(f.water.PH[1] < minMaxAquaPH[0]))
          )
          .filter(
            f =>
              state.aquarium.fishes.length === 0 ||
              (!(f.water.temperature[0] > minMaxAquaTemperature[1]) &&
                !(f.water.temperature[1] < minMaxAquaTemperature[0]))
          )
          .filter(
            f =>
              state.aquarium.fishes.length === 0 ||
              (!(f.water.GH[0] > minMaxAquaGH[1]) &&
                !(f.water.GH[1] < minMaxAquaGH[0]))
          )
      };
    },
    dispatch => ({
      addFishInAquarium: (selectedFish, nbOfFishes) => {
        dispatch({
          type: "ADD_FISH_IN_AQUARIUM",
          payload: { fish: selectedFish, nbOfFishes }
        });
      }
    }),
    [search]
  );

  return (
    <div className="form-picker">
      <Button
        type="button"
        className={`fish-picker-button ${
          isDialogOpen ? "fish-picker-button-modal_open" : ""
        }`}
        onClick={() => setDialogOpen(true)}
      >
        J'ajoute un poisson
      </Button>

      <div
        className={`form-picker-modal ${
          isDialogOpen ? "form-picker-modal_open" : ""
        }`}
        aria-labelledby="form-dialog"
      >
        <header className="form-picker-header">
          <button
            className="form-picker-button-close"
            onClick={() => setDialogOpen(false)}
            aria-label="Close"
          >
            <img
              alt="toogle"
              src="/icon/low.svg"
              onClick={() => setDialogOpen(false)}
            />
          </button>
          <SearchInput
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </header>

        <section className="form-picker-content">
          {fishes.map((fish, i) => (
            <Card
              key={fish.name}
              fish={fish}
              action={{
                name: "J'ajoute",
                handler: nbOfFishes => {
                  setDialogOpen(false);
                  addFishInAquarium(fish, nbOfFishes);
                }
              }}
            />
          ))}
          {fishes.length === 0 && (
            <Typography variant="primary-dark" className="no-fish-message">
              Aucun de nos poissons correspond à vos critères.
              <br />
              <br />
              Vous cherchez peut-être une licorne des mers ?
            </Typography>
          )}
        </section>
      </div>
    </div>
  );
};
