jest.mock("fs", () => {
  let readFileMock;
  return {
    writeFile: jest.fn((path, data, cb) => cb(null, true)),
    readFile: jest.fn((path, data, cb) => cb(null, readFileMock)),
    setReadFileMock: v => (readFileMock = v)
  };
});

jest.mock("inquirer", () => {
  let actionmock;
  return {
    prompt: jest.fn(() => actionmock),
    setPromptReturn: a => (actionmock = a)
  };
});

const reconcilier = require("./fish.reconcilier");
const fs = require("fs");
const inquirer = require("inquirer");

describe("fish reconcilier", () => {
  let fish;

  beforeEach(() => {
    fish = {
      name: "maurice",
      slug: "maurice_slug",
      water: {
        ph: [4, 9]
      }
    };

    fs.writeFile.mockClear();
    console.log = jest.fn();

    fs.setReadFileMock(JSON.stringify(fish));
  });

  it("should do not write file when fish are the same", async () => {
    await reconcilier.reconcile(fish);

    expect(fs.writeFile).not.toHaveBeenCalled();
    expect(inquirer.prompt).not.toHaveBeenCalled();
  });

  it("should show differences of the two object", async () => {
    inquirer.setPromptReturn({ data: '{"newFish": true}' });

    await reconcilier.reconcile({
      ...fish,
      new: true
    });

    expect(console.log).toHaveBeenCalledWith({ new: true });
  });

  it("should write file of the new fish", async () => {
    inquirer.setPromptReturn({ data: '{"newFish": true}' });

    await reconcilier.reconcile(
      {
        ...fish,
        new: true
      },
      "totoPath"
    );

    expect(fs.writeFile.mock.calls[0][1]).toBe('{"newFish":true}');
  });
});
