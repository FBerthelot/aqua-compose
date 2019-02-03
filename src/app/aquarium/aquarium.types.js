/* import PropTypes from "prop-types";

export const fishType = {
  name: PropTypes.string.isRequired,
  surname: PropTypes.string,
  category: PropTypes.string,
  adultSize: PropTypes.number.isRequired,
  minimumPopulation: PropTypes.number.isRequired,
  minimumVolume: PropTypes.number.isRequired,
  water: PropTypes.shape({
    temperature: PropTypes.arrayOf(PropTypes.number).isRequired,
    PH: PropTypes.arrayOf(PropTypes.number).isRequired,
    GH: PropTypes.arrayOf(PropTypes.number).isRequired
  }).isRequired,
  lifeZone: PropTypes.arrayOf(PropTypes.string).isRequired,
  picture: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired
};

export const fishesType = PropTypes.arrayOf(PropTypes.shape(fishType));

export const aquariumType = PropTypes.shape({
  fishes: PropTypes.arrayOf(
    PropTypes.shape({
      ...fishType,
      nbInAquarium: PropTypes.number.isRequired
    })
  ).isRequired,
  volume: PropTypes.number.isRequired
});*/
