jest.mock("./scrapper/", () => {
  return {
    scrap: jest.fn()
  };
});

jest.mock("./api/api.generator", () => {
  return {
    generate: jest.fn(() => Promise.resolve())
  };
});

jest.mock("inquirer", () => {
  let actionmock;
  return {
    prompt: jest.fn(() => actionmock),
    setActionReturn: a => (actionmock = a)
  };
});

const originalConsole = console;
const consoleMock = {
  log: jest.fn(),
  error: jest.fn(),
  debug: console.log
};

const cli = require("./cli");
const scrapper = require("./scrapper/");
const inquirer = require("inquirer");
const apiGenerator = require("./api/api.generator");

describe("cli", () => {
  beforeEach(() => {
    console = consoleMock; // eslint-disable-line
    apiGenerator.generate.mockClear();
    scrapper.scrap.mockClear();
  });

  afterEach(() => {
    console = originalConsole; // eslint-disable-line
  });

  it("should call the scrapper when chosing get data option", async () => {
    inquirer.setActionReturn(
      Promise.resolve({ action: "Get data from aqua change" })
    );

    await cli.init();

    expect(scrapper.scrap).toHaveBeenCalled();
  });

  it("should generate api when chosing get data option", async () => {
    inquirer.setActionReturn(
      Promise.resolve({ action: "Get data from aqua change" })
    );

    await cli.init();

    expect(apiGenerator.generate).toHaveBeenCalled();
  });

  it("should generate api but not scrap when chosing Generate API option", async () => {
    inquirer.setActionReturn(Promise.resolve({ action: "Generate API" }));

    await cli.init();

    expect(scrapper.scrap).not.toHaveBeenCalled();
    expect(apiGenerator.generate).toHaveBeenCalled();
  });

  it("should handle errors", async () => {
    inquirer.setActionReturn(Promise.reject(new Error("Errror")));

    await cli.init();

    expect(console.error).toHaveBeenCalled();
  });
});
