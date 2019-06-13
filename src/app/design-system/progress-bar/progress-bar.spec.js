import React from "react";
import { ProgressBar } from "./progress-bar";
import { shallow } from "enzyme";

describe("Progress", () => {
  it("should not throw an error", () => {
    expect(shallow(<ProgressBar />)).toBeTruthy();
  });

  it("should display percent", () => {
    const cmp = shallow(<ProgressBar percent={90} />);

    expect(cmp.debug()).toContain("90");
  });

  it("should add custom class when almost full", () => {
    const cmp = shallow(<ProgressBar percent={90} />);

    expect(cmp.debug()).toContain("progress-bar_full");
  });

  it("should not add custom class when not full", () => {
    const cmp = shallow(<ProgressBar percent={10} />);

    expect(cmp.debug()).not.toContain("progress-bar_full");
  });
});
