import React, { useEffect } from "react";
import { useRedux } from "../useRedux";
import { AquariumFishes } from "./aquarium-fishes/aquarium-fishes";
import { AquariumVariables } from "./aquarium-variables/aquarium-variables";
import "./aquarium.css";

export const Aquarium = () => {
  const mapDispatch = dispatch => ({
    setFishes: fishes =>
      dispatch({ type: "POPULATE_FISHES", payload: { fishes } })
  });
  const { setFishes } = useRedux(undefined, mapDispatch, []);

  useEffect(() => {
    fetch("/data/all.json")
      .then(res => res.json())
      .then(setFishes)
      .catch(console.error.bind(console));
  }, []);

  return (
    <section className="aquarium">
      <AquariumVariables />

      <AquariumFishes />
    </section>
  );
};
