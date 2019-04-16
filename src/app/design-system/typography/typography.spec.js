import React from "react";
import { Typography } from "./typography";
import { shallow } from "enzyme";

describe("Typography", () => {
  it("should not throw an error", () => {
    expect(shallow(<Typography />)).toBeTruthy();
  });
});
