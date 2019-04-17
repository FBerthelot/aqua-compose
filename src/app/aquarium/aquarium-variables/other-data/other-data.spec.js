import React from "react";
import { OtherData } from "./other-data";
import { shallow } from "enzyme";

describe("Occupation", () => {
  let defaultProps;
  beforeEach(() => {
    defaultProps = {
      volume: 80,
      nbFishes: 69,
      minMaxTemperature: [10, 20],
      minMaxPH: [150, 151],
      minMaxGH: [19, 29]
    };
    window.innerWidth = 2000;
  });

  it("should display an acordeon when device is mobile", () => {
    window.innerWidth = 700;
    const cmp = shallow(<OtherData {...defaultProps} />);

    expect(cmp.find(".aquarium-data-expend-bar").exists()).toBe(true);
  });

  it("should not display an acordeon when device is not mobile", () => {
    const cmp = shallow(<OtherData {...defaultProps} />);

    expect(cmp.find("WithStyles(ExpansionPanel)").exists()).toBe(false);
  });

  it("should display the number at plural", () => {
    window.innerWidth = 700;

    expect(shallow(<OtherData {...defaultProps} />).html()).toContain(
      "69 poissons"
    );
  });

  it("should display the number at singular", () => {
    defaultProps.nbFishes = 1;
    window.innerWidth = 700;

    expect(shallow(<OtherData {...defaultProps} />).html()).toContain(
      "1 poisson"
    );
  });

  it("should display the volume", () => {
    expect(shallow(<OtherData {...defaultProps} />).html()).toContain("80");
  });

  it("should display the minMaxTemperature", () => {
    expect(shallow(<OtherData {...defaultProps} />).html()).toContain(
      "10 à 20"
    );
  });
});
