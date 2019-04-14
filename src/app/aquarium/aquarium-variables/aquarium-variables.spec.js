import React from "react";
import { mount } from "enzyme";
import { AquariumVariables } from "./aquarium-variables";
import { setState } from "../../useRedux";

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

describe("Aquarium Variables", () => {
  let defaultStore;
  beforeEach(() => {
    defaultStore = {
      aquarium: {
        volume: 545,
        fishes: [
          {
            name: "bloby",
            adultSize: 10,
            nbInAquarium: 5,
            water: { temperature: [5, 20], PH: [5, 7], GH: [5, 10] }
          },
          {
            name: "golden",
            adultSize: 5,
            nbInAquarium: 25,
            water: { temperature: [5, 6], PH: [6, 7], GH: [0, 245425245] }
          },
          {
            name: "volley",
            adultSize: 50,
            nbInAquarium: 2,
            water: { temperature: [0, 6], PH: [6, 45], GH: [0, 9] }
          }
        ]
      }
    };

    setState(defaultStore);

    window.innerHeight = 750;
  });

  it("should not throw an error", () => {
    expect(mount(<AquariumVariables />)).toBeTruthy();
  });

  it("should display the aquarium volume", () => {
    const cmp = mount(<AquariumVariables />);
    expect(cmp.text()).toContain("545");
  });

  it("should display the total number of fishes", () => {
    const cmp = mount(<AquariumVariables />);
    expect(cmp.text()).toContain("32");
  });

  it("should display the occupation of the Aquarium", () => {
    const cmp = mount(<AquariumVariables />);
    expect(cmp.text()).toContain("68 %");
  });

  it("should display the acceptable range of temperature of the Aquarium", () => {
    const cmp = mount(<AquariumVariables />);
    expect(cmp.text()).toContain("5 à 6");
  });

  it("should display the acceptable range of PH of the Aquarium", () => {
    const cmp = mount(<AquariumVariables />);
    expect(cmp.text()).toContain("6 à 7");
  });

  it("should display the acceptable range of GH of the Aquarium", () => {
    const cmp = mount(<AquariumVariables />);
    expect(cmp.text()).toContain("5 à 9");
  });

  it("should display NC when there is no fish", () => {
    setState({
      aquarium: { volume: 80, fishes: [] }
    });

    const cmp = mount(<AquariumVariables />);
    expect(cmp.text()).toContain("non connu");
  });
});
