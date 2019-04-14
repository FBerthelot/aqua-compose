import React from "react";
import { Occupation } from "./occupation";
import { shallow } from "enzyme";

describe("Occupation", () => {
  let defaultProps;
  beforeEach(() => {
    defaultProps = {
      nbFishes: 100,
      occupationPercent: 59
    };
  });

  it("should display the number of fish", () => {
    expect(shallow(<Occupation {...defaultProps} />).html()).toContain(
      "100 poissons"
    );
  });

  it("should display the number at singular", () => {
    defaultProps.nbFishes = 1;

    expect(shallow(<Occupation {...defaultProps} />).html()).toContain(
      "1 poisson"
    );
  });

  it("should display the occupationPercent at singular", () => {
    defaultProps.nbFishes = 1;

    expect(shallow(<Occupation {...defaultProps} />).html()).toContain("59");
  });
});
