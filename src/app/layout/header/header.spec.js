import React from "react";
import { mount } from "enzyme";
import { Header } from "./header";

describe("header", () => {
  it("should not throw an error", () => {
    expect(mount(<Header />)).toBeTruthy();
  });
});
