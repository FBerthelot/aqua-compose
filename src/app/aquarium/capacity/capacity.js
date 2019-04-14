import React, { useState } from "react";
import { useRedux } from "../../useRedux";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import { Header } from "../../layout/header/header";
import useReactRouter from "use-react-router";
import "./capacity.css";

export const Capacity = () => {
  const { history } = useReactRouter();
  const [aquariumVolume, setCurrentAquariumValue] = useState("");

  const { onSubmit } = useRedux(
    () => {},
    dispatch => ({
      onSubmit: e => {
        e.preventDefault();
        if (!aquariumVolume) {
          return;
        }
        dispatch({
          type: "SET_AQUARIUM_VOLUME",
          payload: { volume: aquariumVolume }
        });
        history.push("/my-aquarium");
      }
    }),
    [aquariumVolume]
  );

  const handleVolumeChange = e => {
    const number = Number(e.target.value);
    if (number > 0) {
      setCurrentAquariumValue(Number(e.target.value));
    }
  };

  return (
    <div className="capacity">
      <Header />

      <Paper component="main" className="content" elevation={2}>
        <Typography variant="h2" component="h2">
          Mon Aquarium
        </Typography>

        <form onSubmit={onSubmit}>
          <TextField
            label="Quel est la capcité de votre aquarium ?"
            value={aquariumVolume}
            placeholder="120"
            required
            min="0"
            type="number"
            onChange={handleVolumeChange}
          />

          <Typography>
            Pour le bien être de vos poissons, il est recommandé d'avoir une
            capacité minimum de 120 L
          </Typography>

          <div>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              disabled={!aquariumVolume}
            >
              J'enregiste
            </Button>
          </div>
        </form>
      </Paper>
    </div>
  );
};
