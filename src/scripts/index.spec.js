import cli from "./cli";

jest.mock("./cli", () => {
  return { init: jest.fn() };
});

describe("script index", () => {
  it("should call init function of the cli", () => {
    require("./index");
    expect(cli.init).toHaveBeenCalled();
  });
});
