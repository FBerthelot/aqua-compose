import React from "react";
import { InputTextUnit } from "./input-text-unit";
import { shallow } from "enzyme";

describe("InputTextUnit", () => {
  it("should not throw an error", () => {
    expect(shallow(<InputTextUnit />)).toBeTruthy();
  });
});
