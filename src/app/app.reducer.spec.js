import { mainReducer } from "./app.reducer";

describe("app reducer", () => {
  let initialState;

  beforeEach(() => {
    initialState = {
      aquarium: {
        fishes: [],
        volume: 120
      },
      fishes: []
    };
  });

  it("should have a good initial state", () => {
    expect(mainReducer()).toEqual(initialState);
  });

  it("should modify the aquarium volume with SET_AQUARIUM_VOLUME action", () => {
    const finalState = mainReducer(initialState, {
      type: "SET_AQUARIUM_VOLUME",
      payload: { volume: 666 }
    });
    expect(finalState.aquarium.volume).toEqual(666);
  });

  it("should populate the available fish with POPULATE_FISHES action", () => {
    const finalState = mainReducer(initialState, {
      type: "POPULATE_FISHES",
      payload: { fishes: [{ name: "fish1" }] }
    });
    expect(finalState.fishes).toEqual([{ name: "fish1" }]);
  });

  it("should add one fish into the aquarium with ADD_FISH_IN_AQUARIUM", () => {
    const finalState = mainReducer(initialState, {
      type: "ADD_FISH_IN_AQUARIUM",
      payload: {
        nbOfFishes: 10,
        fish: {
          name: "poissonRouge"
        }
      }
    });

    expect(finalState.aquarium.fishes).toEqual([
      {
        nbInAquarium: 10,
        name: "poissonRouge"
      }
    ]);
  });

  it("should remove one fish into the aquarium with REMOVE_FISH_FROM_AQUARIUM", () => {
    initialState.aquarium.fishes = [
      {
        name: "poissonRouge"
      }
    ];
    const finalState = mainReducer(initialState, {
      type: "REMOVE_FISH_FROM_AQUARIUM",
      payload: {
        name: "poissonRouge"
      }
    });

    expect(finalState.aquarium.fishes).toEqual([]);
  });

  it("should update one nbInAquarium into the aquarium with CHANGE_NB_OF_FISHES_IN_AQUARIUM", () => {
    initialState.aquarium.fishes = [
      {
        name: "poissonRouge",
        toto: 40,
        nbInAquarium: 40
      },
      {
        name: "poissonBleue",
        nbInAquarium: 5
      }
    ];
    const finalState = mainReducer(initialState, {
      type: "CHANGE_NB_OF_FISHES_IN_AQUARIUM",
      payload: {
        name: "poissonRouge",
        number: 4
      }
    });

    expect(finalState.aquarium.fishes).toEqual([
      {
        name: "poissonRouge",
        toto: 40,
        nbInAquarium: 4
      },
      {
        name: "poissonBleue",
        nbInAquarium: 5
      }
    ]);
  });
});
