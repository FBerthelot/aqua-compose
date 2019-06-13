import React from "react";
import { Button } from "./button";
import { shallow } from "enzyme";

describe("Button", () => {
  it("should not throw an error", () => {
    expect(shallow(<Button />)).toBeTruthy();
  });

  it("should display children", () => {
    expect(shallow(<Button>toto</Button>).debug()).toContain("toto");
  });

  it("should add secondary class when variant is secondary", () => {
    expect(
      shallow(<Button variant="secondary">toto</Button>).debug()
    ).toContain("app-button_secondary");
  });
});
