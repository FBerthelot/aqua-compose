import React from "react";
import { Typography } from "./typography";
import { shallow } from "enzyme";

describe("Typography", () => {
  it("should not throw an error", () => {
    expect(shallow(<Typography />)).toBeTruthy();
  });

  it("should add typography class with variant", () => {
    expect(shallow(<Typography variant="text" />).props().className).toContain(
      "typography_text"
    );
  });
});
