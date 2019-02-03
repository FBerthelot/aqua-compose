import React from "react";
import { mount } from "enzyme";
import { FishPicker } from "./fish-picker";
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

describe("fish-picker", () => {
  let defaultStore;
  beforeEach(() => {
    defaultStore = {
      fishes: [
        {
          minimumPopulation: 4,
          minimumVolume: 80,
          name: "poissonRouge",
          water: { PH: [5, 7], temperature: [25, 30], GH: [2, 20] }
        },
        {
          minimumVolume: 80,
          name: "poissonJaune",
          water: { PH: [6, 9], temperature: [15, 19], GH: [1, 2] }
        },
        {
          minimumVolume: 50,
          name: "poissonViolet",
          water: { PH: [2, 3], temperature: [20, 25], GH: [10, 15] }
        }
      ],
      aquarium: {
        fishes: [],
        volume: 80
      }
    };
  });

  it("should not throw an error", () => {
    setState(defaultStore);
    expect(mount(<FishPicker />)).toBeTruthy();
  });

  it("should not show modal in initial state", () => {
    setState(defaultStore);
    expect(
      mount(<FishPicker />)
        .find("Dialog")
        .props().open
    ).toBe(false);
  });

  it("should show modal when clicking the button", () => {
    setState(defaultStore);

    const component = mount(<FishPicker />);

    component.find("Fab").simulate("click");

    expect(component.find("Dialog").props().open).toBe(true);
  });

  it("should show the number of fish available for a 80L aquarium", () => {
    defaultStore.fishes[0].minimumVolume = 120;
    setState(defaultStore);

    const component = mount(<FishPicker />);

    component.find("Fab").simulate("click");

    expect(component.find("Modal").text()).toContain(2);
  });

  it("should show the number of fish available for the aquarium minus those who already are in", () => {
    defaultStore.aquarium.fishes = [
      {
        name: "poissonRouge",
        water: { PH: [0, 14], temperature: [0, 100], GH: [0, 100] }
      }
    ];
    setState(defaultStore);

    const component = mount(<FishPicker />);

    component.find("Fab").simulate("click");

    expect(component.find("Modal").text()).toContain(2);
  });

  it("should show the number of fish available that match PH of other fishes", () => {
    defaultStore.aquarium.fishes = [
      { name: "", water: { PH: [5, 8], temperature: [0, 100], GH: [0, 100] } }
    ];
    setState(defaultStore);

    const component = mount(<FishPicker />);

    component.find("Fab").simulate("click");

    expect(component.find("Modal").text()).toContain(2);
  });

  it("should show the number of fish available that match temperature of other fishes", () => {
    defaultStore.aquarium.fishes = [
      { name: "", water: { PH: [0, 100], temperature: [20, 25], GH: [0, 100] } }
    ];
    setState(defaultStore);

    const component = mount(<FishPicker />);

    component.find("Fab").simulate("click");

    expect(component.find("Modal").text()).toContain(2);
  });

  it("should show the number of fish available that match GH of other fishes", () => {
    defaultStore.aquarium.fishes = [
      { name: "", water: { PH: [0, 100], temperature: [0, 100], GH: [5, 10] } }
    ];
    setState(defaultStore);

    const component = mount(<FishPicker />);

    component.find("Fab").simulate("click");

    expect(component.find("Modal").text()).toContain(2);
  });

  it("should display some info about fishes", () => {
    setState(defaultStore);

    const component = mount(<FishPicker />);

    component.find("Fab").simulate("click");

    defaultStore.fishes.forEach(fish => {
      expect(component.find("Modal").text()).toContain(fish.name);
    });
  });

  it("should close the modal when clicking cancel button", () => {
    setState(defaultStore);

    const component = mount(<FishPicker />);

    component.find("Fab").simulate("click");
    component
      .find("Modal DialogActions Button")
      .at(0)
      .simulate("click");

    expect(component.find("Dialog").props().open).toBe(false);
  });

  xit("should close dialog while submiting form", () => {
    setState(defaultStore);
    const component = mount(<FishPicker />);

    component.find("Fab").simulate("click");
    component
      .find("Modal")
      .find("form")
      .props()
      .onSubmit({ preventDefault: jest.fn() });

    expect(component.find("Dialog").props().open).toBe(false);
  });
});
