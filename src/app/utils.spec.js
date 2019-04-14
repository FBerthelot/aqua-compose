import { isSmallDevice } from "./utils";

describe("utils", () => {
  it("should return true when device is less than 750px wide", () => {
    window.innerWidth = 749;
    expect(isSmallDevice()).toBe(true);
  });

  it("should return false when device is more than 750px wide", () => {
    window.innerWidth = 750;
    expect(isSmallDevice()).toBe(false);
  });
});
