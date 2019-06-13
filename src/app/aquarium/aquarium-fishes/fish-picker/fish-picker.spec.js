import React from "react";
import { mount, shallow } from "enzyme";
import { FishPicker } from "./fish-picker";
import { setState, dispatch } from "../../../useRedux";

jest.mock("../../../useRedux", () => {
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

const baseFishData = {
  name: "nemo",
  surname: "clown",
  category: "mer",
  adultSize: 15,
  minimumPopulation: 2,
  minimumVolume: 100,
  picture: "null",
  link: "gotolink",
  lifeZone: []
};

describe("fish-picker", () => {
  let defaultStore;
  beforeEach(() => {
    defaultStore = {
      fishes: [
        {
          ...baseFishData,
          minimumPopulation: 4,
          minimumVolume: 80,
          name: "poissonRouge",
          water: { PH: [5, 7], temperature: [25, 30], GH: [2, 20] }
        },
        {
          ...baseFishData,
          minimumVolume: 80,
          name: "poissonJaune",
          water: { PH: [6, 9], temperature: [15, 19], GH: [1, 2] }
        },
        {
          ...baseFishData,
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
      shallow(<FishPicker />)
        .find(".form-picker-modal")
        .props().className
    ).not.toContain("form-picker-modal_open");
  });

  it("should show modal when clicking the button", () => {
    setState(defaultStore);

    const component = shallow(<FishPicker />);

    component.find(".fish-picker-button").simulate("click");

    expect(component.find(".form-picker-modal").props().className).toContain(
      "form-picker-modal_open"
    );
  });

  it("should show the number of fish available for a 80L aquarium", () => {
    defaultStore.fishes[0].minimumVolume = 120;
    setState(defaultStore);

    const component = mount(<FishPicker />);

    component
      .find(".fish-picker-button")
      .at(1)
      .simulate("click");

    expect(component.find(".form-picker-modal").text()).toContain(2);
  });

  it("should show the number of fish available for the aquarium minus those who already are in", () => {
    defaultStore.aquarium.fishes = [
      {
        ...baseFishData,
        name: "poissonRouge",
        water: { PH: [0, 14], temperature: [0, 100], GH: [0, 100] }
      }
    ];
    setState(defaultStore);

    const component = mount(<FishPicker />);

    component
      .find(".fish-picker-button")
      .at(1)
      .simulate("click");

    expect(component.find(".form-picker-modal").text()).toContain(2);
  });

  it("should show the number of fish available that match PH of other fishes", () => {
    defaultStore.aquarium.fishes = [
      { name: "", water: { PH: [5, 8], temperature: [0, 100], GH: [0, 100] } }
    ];
    setState(defaultStore);

    const component = mount(<FishPicker />);

    component
      .find(".fish-picker-button")
      .at(1)
      .simulate("click");

    expect(component.find(".form-picker-modal").text()).toContain(2);
  });

  it("should show the number of fish available that match temperature of other fishes", () => {
    defaultStore.aquarium.fishes = [
      { name: "", water: { PH: [0, 100], temperature: [20, 25], GH: [0, 100] } }
    ];
    setState(defaultStore);

    const component = mount(<FishPicker />);

    component
      .find(".fish-picker-button")
      .at(1)
      .simulate("click");

    expect(component.find(".form-picker-modal").text()).toContain(2);
  });

  it("should show the number of fish available that match GH of other fishes", () => {
    defaultStore.aquarium.fishes = [
      { name: "", water: { PH: [0, 100], temperature: [0, 100], GH: [5, 10] } }
    ];
    setState(defaultStore);

    const component = mount(<FishPicker />);

    component
      .find(".fish-picker-button")
      .at(1)
      .simulate("click");

    expect(component.find(".form-picker-modal").text()).toContain(2);
  });

  it("should display some info about fishes", () => {
    setState(defaultStore);

    const component = mount(<FishPicker />);

    component
      .find(".fish-picker-button")
      .at(1)
      .simulate("click");

    defaultStore.fishes.forEach(fish => {
      expect(component.find(".form-picker-modal").text()).toContain(fish.name);
    });
  });

  it("should close the modal when clicking cancel button", () => {
    setState(defaultStore);

    const component = shallow(<FishPicker />);

    component.find(".fish-picker-button").simulate("click");
    component.find(".form-picker-button-close").simulate("click");

    expect(
      component.find(".form-picker-modal").props().className
    ).not.toContain("form-picker-modal_open");
  });

  it("should show dispatch ADD_FISH_IN_AQUARIUM when adding a fish", () => {
    setState(defaultStore);

    const component = mount(<FishPicker />);

    component
      .find(".fish-picker-button")
      .at(1)
      .simulate("click");
    component
      .find("Card")
      .at(0)
      .props()
      .action.handler(40);

    expect(dispatch).toHaveBeenCalledWith({
      type: "ADD_FISH_IN_AQUARIUM",
      payload: { fish: defaultStore.fishes[0], nbOfFishes: 40 }
    });
  });
});
