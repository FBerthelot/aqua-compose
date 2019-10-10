import React from "react";
import { Input } from "./input";
import { shallow } from "enzyme";

describe("Input", () => {
  it("should not throw an error", () => {
    expect(shallow(<Input id="test" />)).toBeTruthy();
  });

  it("should not display the unit when variant is not text-unit", () => {
    const cmp = shallow(<Input id="test" unit="unit" />);

    expect(cmp.debug()).toContain("unit");
  });

  it("should display the unit", () => {
    const cmp = shallow(<Input id="test" unit="unit" />);

    expect(cmp.debug()).toContain("unit");
  });
});
