import React from "react";
import { FishCard } from "./fish-card";
import { shallow } from "enzyme";

describe("fish-card", () => {
  let defaultProps;
  beforeEach(() => {
    defaultProps = {
      fish: {
        name: "nemo",
        surname: "clown",
        category: "mer",
        adultSize: 15,
        minimumPopulation: 254,
        minimumVolume: 100,
        water: {
          temperature: [0, 50],
          PH: [6, 10],
          GH: [3, 10]
        },
        lifeZone: ["Milieu"],
        picture: "null",
        link: "gotolink"
      },
      action: {
        name: "action",
        handler: jest.fn()
      },
      onNbFishChange: jest.fn()
    };
  });

  it("should not throw error", () => {
    expect(shallow(<FishCard {...defaultProps} />)).toBeTruthy();
  });

  it("should initialize number of fish with the number in aquarium if any", () => {
    defaultProps.fish.nbInAquarium = 4759;
    expect(shallow(<FishCard {...defaultProps} />).html()).toContain("4759");
  });

  it("should initialize number of fish with the minimumPopulation by default", () => {
    expect(shallow(<FishCard {...defaultProps} />).html()).toContain("254");
  });

  it("should not display the fish name twice when no surname is given", () => {
    delete defaultProps.fish.surname;
    const cmp = shallow(<FishCard {...defaultProps} />);

    expect(cmp.find('[variant="scientific-name"]').html()).not.toContain(
      defaultProps.fish.name
    );
  });

  it("should call the action handler when clicking on his button", () => {
    const cmp = shallow(<FishCard {...defaultProps} />);

    cmp.find("WithStyles(Button)").simulate("click");

    expect(defaultProps.action.handler).toHaveBeenCalledWith(254);
  });

  it("should call onNbFishChange when clicking on upgrade fish", () => {
    const cmp = shallow(<FishCard {...defaultProps} />);

    cmp
      .find("WithStyles(IconButton)")
      .at(1)
      .simulate("click");

    expect(defaultProps.onNbFishChange).toHaveBeenCalledWith(255);
  });

  it("should call onNbFishChange when clicking on downgrade fish", () => {
    defaultProps.fish.nbInAquarium = 4759;
    const cmp = shallow(<FishCard {...defaultProps} />);

    cmp
      .find("WithStyles(IconButton)")
      .at(0)
      .simulate("click");

    expect(defaultProps.onNbFishChange).toHaveBeenCalledWith(4758);
  });

  it("should not call onNbFishChange when clicking on downgrade fish but nbFish is already at minmum", () => {
    const cmp = shallow(<FishCard {...defaultProps} />);

    cmp
      .find("WithStyles(IconButton)")
      .at(0)
      .simulate("click");

    expect(defaultProps.onNbFishChange).not.toHaveBeenCalled();
  });
});
