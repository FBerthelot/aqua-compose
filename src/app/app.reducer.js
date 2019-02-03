const defaultState = {
  aquarium: {
    fishes: [],
    volume: 80
  },
  fishes: []
};

export const mainReducer = (state = defaultState, action = {}) => {
  switch (action.type) {
    case "SET_AQUARIUM_VOLUME":
      return {
        ...state,
        aquarium: {
          ...state.aquarium,
          volume: action.payload.volume
        }
      };
    case "POPULATE_FISHES":
      return {
        ...state,
        fishes: action.payload.fishes
      };

    case "ADD_FISH_IN_AQUARIUM":
      return {
        ...state,
        aquarium: {
          ...state.aquarium,
          fishes: [
            ...state.aquarium.fishes,
            {
              ...action.payload.fish,
              nbInAquarium: action.payload.nbOfFishes
            }
          ]
        }
      };
    case "REMOVE_FISH_FROM_AQUARIUM":
      return {
        ...state,
        aquarium: {
          ...state.aquarium,
          fishes: state.aquarium.fishes.filter(
            f => f.name !== action.payload.name
          )
        }
      };
    case "CHANGE_NB_OF_FISHES_IN_AQUARIUM":
      return {
        ...state,
        aquarium: {
          ...state.aquarium,
          fishes: state.aquarium.fishes.map(f => {
            if (f.name !== action.payload.name) {
              return f;
            }
            return {
              ...f,
              nbInAquarium: action.payload.number
            };
          })
        }
      };
    default:
      return state;
  }
};
