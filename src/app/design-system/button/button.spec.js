import React from "react";
import { Button } from "./button";
import { shallow } from "enzyme";

describe("Button", () => {
  it("should not throw an error", () => {
    expect(shallow(<Button />)).toBeTruthy();
  });
});
