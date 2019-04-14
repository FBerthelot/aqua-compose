import "./fish-picker.css";
import React, { useState } from "react";

import AddIcon from "@material-ui/icons/Add";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import IconButton from "@material-ui/core/IconButton";
import InfoIcon from "@material-ui/icons/Info";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import Button from "@material-ui/core/Button";
import DialogActions from "@material-ui/core/DialogActions";
import TextField from "@material-ui/core/TextField";

import { useRedux } from "../../../useRedux";
import { getMinMaxOfkey } from "../../aquarium.logic";

export const FishPicker = () => {
  const [isDialogOpen, setDialogOpen] = useState(false);

  const [selectedFish, setSelectedFish] = useState(null);
  const [nbOfFishes, setNbOfFishes] = useState(0);
  const [isPristine, setFormPristine] = useState(true);

  const formIsValid = !!(
    nbOfFishes &&
    selectedFish &&
    nbOfFishes >= selectedFish.minimumPopulation
  );
  const numberFieldIsValid = isPristine || formIsValid;

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
        open={isDialogOpen}
        onClose={() => setDialogOpen(false)}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">
          Ajouter un poisson ({fishes.length})
        </DialogTitle>

        <DialogContent>
          <GridList cellHeight={180}>
            {fishes.map((fish, i) => (
              <GridListTile key={fish.name}>
                <img src={fish.picture} alt={fish.surname} />
                <GridListTileBar
                  title={fish.name}
                  subtitle={<span>{fish.category}</span>}
                  actionIcon={
                    <div className="fish-info-buttons">
                      <IconButton
                        href={fish.link}
                        target="_blank"
                        rel="noopener"
                      >
                        <InfoIcon className="fish-info-button" />
                      </IconButton>
                      <IconButton
                        onClick={() => {
                          console.log(fish, "added");
                          setSelectedFish(fish);
                          setFormPristine(false);
                          setNbOfFishes(fish.minimumPopulation);
                        }}
                      >
                        <AddIcon className="fish-info-button" />
                      </IconButton>
                    </div>
                  }
                />
              </GridListTile>
            ))}
          </GridList>
        </DialogContent>

        <DialogActions>
          <form
            onSubmit={e => {
              e.preventDefault();
              setDialogOpen(false);
              addFishInAquarium(selectedFish, nbOfFishes);
            }}
          >
            <TextField
              label="Nombre de poissons"
              value={nbOfFishes}
              onChange={e => {
                setNbOfFishes(Number(e.target.value));
              }}
              required
              min={selectedFish ? selectedFish.minimumPopulation : 0}
              error={!numberFieldIsValid}
              type="number"
            />
            <Button onClick={() => setDialogOpen(false)} color="primary">
              Annuler
            </Button>
            <Button type="submit" color="primary" disabled={!formIsValid}>
              Ajouter
            </Button>
          </form>
        </DialogActions>
      </Dialog>
    </>
  );
};
