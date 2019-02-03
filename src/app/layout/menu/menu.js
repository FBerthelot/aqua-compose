import React, { useCallback } from "react";
import PropTypes from "prop-types";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import TextField from "@material-ui/core/TextField";
import { useRedux } from "../../useRedux";

export const Menu = ({ drawerIsOpen, setDrawerIsOpen }) => {
  const { aquariumVolume, onVolumeChange } = useRedux(
    state => ({
      aquariumVolume: state.aquarium.volume
    }),
    dispatch => ({
      onVolumeChange: e => {
        dispatch({
          type: "SET_AQUARIUM_VOLUME",
          payload: { volume: Number(e.target.value) }
        });
      }
    }),
    []
  );

  const closeDrawer = useCallback(() => setDrawerIsOpen(false), []);
  const openDrawer = useCallback(() => setDrawerIsOpen(true), []);

  return (
    <SwipeableDrawer
      open={drawerIsOpen}
      onClose={closeDrawer}
      onOpen={openDrawer}
    >
      <form>
        <TextField
          label="Volume de l'aquarium"
          value={aquariumVolume}
          onChange={onVolumeChange}
          required
          min="0"
          type="number"
        />
      </form>
    </SwipeableDrawer>
  );
};

Menu.propTypes = {
  drawerIsOpen: PropTypes.bool.isRequired,
  setDrawerIsOpen: PropTypes.func.isRequired
};
