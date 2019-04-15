import React from "react";
import { mount } from "enzyme";
import { AquariumFishes } from "./aquarium-fishes";
import { setState, dispatch } from "../../useRedux";

jest.mock("../../useRedux", () => {
  const dispatch = jest.fn();
  let statemock;
  return {
    useRedux: (mapState = () => {}, mapDispatch = () => {}) => {
      return {
        ...mapState(statemock),
        ...(mapDispatch ? mapDispatch(dispatch) : {})
      };
    },
    dispatch,
    setState: s => (statemock = s)
  };
});

jest.mock("./fish-picker/fish-picker", () => {
  return {
    FishPicker: () => <div />
  };
});

const baseFishData = {
  name: "nemo",
  surname: "clown",
  category: "mer",
  adultSize: 15,
  minimumPopulation: 2,
  minimumVolume: 100,
  picture: "null",
  link: "gotolink"
};

describe("Aquarium Fishes", () => {
  let defaultStore;
  beforeEach(() => {
    defaultStore = {
      aquarium: {
        fishes: [
          {
            ...baseFishData,
            name: "bloby",
            picture: "r",
            lifeZone: ["Fond"],
            water: { temperature: [5, 6], PH: [6, 7], GH: [0, 10] }
          },
          {
            ...baseFishData,
            name: "golden",
            picture: "a",
            lifeZone: ["Surface"],
            minimumPopulation: 4,
            water: { temperature: [5, 6], PH: [6, 7], GH: [0, 245425245] }
          },
          {
            ...baseFishData,
            name: "volley",
            picture: "e",
            lifeZone: ["Milieu"],
            water: { temperature: [5, 6], PH: [6, 45], GH: [0, 10] }
          }
        ]
      }
    };

    dispatch.mockReset();

    setState(defaultStore);
  });

  it("should not throw an error", () => {
    expect(mount(<AquariumFishes />)).toBeTruthy();
  });

  it("should list all fish name i have in the aquarium", () => {
    const cmp = mount(<AquariumFishes />);
    defaultStore.aquarium.fishes.forEach(fish => {
      expect(cmp.text()).toContain(fish.name);
    });
  });

  it("should list all fish temperature i have in the aquarium", () => {
    const cmp = mount(<AquariumFishes />);
    defaultStore.aquarium.fishes.forEach(fish => {
      expect(cmp.text()).toContain(fish.water.temperature[0]);
      expect(cmp.text()).toContain(fish.water.temperature[1]);
    });
  });

  it("should list all fish PH i have in the aquarium", () => {
    const cmp = mount(<AquariumFishes />);
    defaultStore.aquarium.fishes.forEach(fish => {
      expect(cmp.text()).toContain(fish.water.PH[0]);
      expect(cmp.text()).toContain(fish.water.PH[1]);
    });
  });

  it("should list all fish GH i have in the aquarium", () => {
    const cmp = mount(<AquariumFishes />);
    defaultStore.aquarium.fishes.forEach(fish => {
      expect(cmp.text()).toContain(fish.water.GH[0]);
      expect(cmp.text()).toContain(fish.water.GH[1]);
    });
  });

  it("should dispatch removeFish when clicking on the remove button", () => {
    const cmp = mount(<AquariumFishes />);

    cmp
      .find("FishCard")
      .at(0)
      .props()
      .action.handler("click");

    expect(dispatch).toHaveBeenCalledWith({
      type: "REMOVE_FISH_FROM_AQUARIUM",
      payload: { name: defaultStore.aquarium.fishes[1].name }
    });
  });

  it("should dispatch change nbOfFishes when modifying the input", () => {
    const cmp = mount(<AquariumFishes />);

    cmp
      .find("FishCard")
      .at(0)
      .props()
      .onNbFishChange(40);

    expect(dispatch).toHaveBeenCalledWith({
      type: "CHANGE_NB_OF_FISHES_IN_AQUARIUM",
      payload: { name: defaultStore.aquarium.fishes[1].name, number: 40 }
    });
  });

  it("should display parametrage button when no fish in the aquarium", () => {
    defaultStore.aquarium.fishes = [];
    setState(defaultStore);

    const cmp = mount(<AquariumFishes />);
    expect(cmp.html()).toContain("Je paramètre");
  });
});
