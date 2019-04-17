import React from "react";
import { ProgressBar } from "./progress-bar";
import { shallow } from "enzyme";

describe("Progress", () => {
  it("should not throw an error", () => {
    expect(shallow(<ProgressBar />)).toBeTruthy();
  });
});
