import React from "react";
import { shallow } from "enzyme";
import App from "./app";

describe("app", () => {
  it("should not throw an error", () => {
    expect(shallow(<App />)).toBeTruthy();
  });
});
