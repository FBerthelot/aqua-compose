import "./fish-picker.css";
import React, { useState } from "react";

import Dialog from "@material-ui/core/Dialog";
import Typography from "@material-ui/core/Typography";

import AppBar from "@material-ui/core/AppBar";
import DialogContent from "@material-ui/core/DialogContent";
import IconButton from "@material-ui/core/IconButton";
import Toolbar from "@material-ui/core/Toolbar";
import CloseIcon from "@material-ui/icons/Close";
import Button from "@material-ui/core/Button";
import Slide from "@material-ui/core/Slide";

import { FishCard } from "../fish-card/fish-card";

import { useRedux } from "../../../useRedux";
import { getMinMaxOfkey } from "../../aquarium.logic";

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

export const FishPicker = () => {
  const [isDialogOpen, setDialogOpen] = useState(false);

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
    []
  );

  return (
    <>
      <Button
        variant="contained"
        color="primary"
        type="button"
        className="fish-picker-button"
        onClick={() => setDialogOpen(true)}
      >
        J'ajoute un poisson
      </Button>

      <Dialog
        fullScreen
        TransitionComponent={Transition}
        open={isDialogOpen}
        onClose={() => setDialogOpen(false)}
        aria-labelledby="form-dialog-title"
      >
        <AppBar>
          <Toolbar>
            <IconButton
              className="form-picker-button-close"
              color="inherit"
              onClick={() => setDialogOpen(false)}
              aria-label="Close"
            >
              <CloseIcon />
            </IconButton>
            <Typography
              className="form-picker-title"
              variant="h3"
              component="h2"
            >
              J'ajoute des poissons
            </Typography>
          </Toolbar>
        </AppBar>

        <DialogContent className="form-picker-content">
          {fishes.map((fish, i) => (
            <FishCard
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
        </DialogContent>
      </Dialog>
    </>
  );
};
