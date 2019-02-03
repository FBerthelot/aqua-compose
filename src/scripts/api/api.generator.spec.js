jest.mock("fs", () => {
  let readFileMock;
  let readdirMock;
  return {
    writeFile: jest.fn((path, data, cb) => cb(null, true)),
    readFile: jest.fn((path, data, cb) => {
      cb(
        null,
        readFileMock[
          Object.keys(readFileMock).find(endPath => path.includes(endPath))
        ]
      );
    }),
    readdir: jest.fn((path, cb) => cb(null, readdirMock)),
    setReadFileMock: v => (readFileMock = v),
    setReaddirMock: v => (readdirMock = v)
  };
});

const fs = require("fs");
const apiGenerator = require("./api.generator");

describe("api generator", () => {
  let fishes;
  beforeEach(() => {
    fs.writeFile.mockClear();
    fs.readFile.mockClear();

    fishes = [{ slug: "fish1" }, { slug: "fish2" }];
  });

  describe("all.json", () => {
    it("should write [] in all.json file when fishes directory is empty", async () => {
      fs.setReaddirMock([]);

      await apiGenerator.generate();

      expect(fs.writeFile.mock.calls[0][1]).toBe("[]");
      expect(fs.writeFile.mock.calls[0][0]).toContain("all.json");
    });

    it("should write all fishes datas in all.json file", async () => {
      fs.setReaddirMock(["fish1.json", "fish2.json"]);
      fs.setReadFileMock({
        "fish1.json": JSON.stringify(fishes[0]),
        "fish2.json": JSON.stringify(fishes[1])
      });

      await apiGenerator.generate();

      expect(fs.writeFile.mock.calls[0][1]).toBe(
        '[{"slug":"fish1"},{"slug":"fish2"}]'
      );
    });
  });

  describe("metadata.json", () => {
    it("should write [fishesSlugs:[]] in all.json file when fishes directory is empty", async () => {
      fs.setReaddirMock([]);

      await apiGenerator.generate();

      expect(fs.writeFile.mock.calls[1][1]).toBe('{"fishSlugs":[]}');
      expect(fs.writeFile.mock.calls[1][0]).toContain("metadata.json");
    });

    it("should write all fishes datas in all.json file", async () => {
      fs.setReaddirMock(["fish1.json", "fish2.json"]);
      fs.setReadFileMock({
        "fish1.json": JSON.stringify(fishes[0]),
        "fish2.json": JSON.stringify(fishes[1])
      });

      await apiGenerator.generate();

      expect(fs.writeFile.mock.calls[1][1]).toBe(
        '{"fishSlugs":["fish1","fish2"]}'
      );
    });
  });
});
