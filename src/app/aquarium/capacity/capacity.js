import React, { useState } from "react";
import { useRedux } from "../../useRedux";
import { InputTextUnit } from "../../design-system/input-text-unit/input-text-unit";
import { Typography } from "../../design-system/typography/typography";
import { Header } from "../../layout/header/header";
import { Button } from "../../design-system/button/button";
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

      <main className="content">
        <Typography variant="h1" component="h2">
          Mon Aquarium
        </Typography>

        <form onSubmit={onSubmit}>
          <Typography variant="h1" component="label" htmlFor="capacity-field">
            Quelle est la capacité de votre aquarium&nbsp;?
          </Typography>

          <Typography>
            Pour le bien être de vos poissons, il est recommandé d'avoir une
            capacité minimum de 120&nbsp;L
          </Typography>

          <InputTextUnit
            id="capacity-field"
            className="capacity-field-class"
            value={aquariumVolume}
            unit="L"
            placeholder="Exemple : 120"
            required
            min="0"
            type="number"
            onChange={handleVolumeChange}
          />

          <div>
            <Button type="submit" disabled={!aquariumVolume}>
              J'enregistre
            </Button>
          </div>
        </form>
      </main>
    </div>
  );
};
