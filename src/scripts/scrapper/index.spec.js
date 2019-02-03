jest.mock("axios", () => {
  let getDefaultResponseMock;
  let i = 0;
  let getResponseMock = [];

  return {
    get: jest.fn(() => {
      i++;
      if (getResponseMock[i]) {
        return getResponseMock[i];
      }

      return getDefaultResponseMock;
    }),
    setDefaultGetResponse: gdm => (getDefaultResponseMock = gdm),
    setGetResponseOnXTimes: (res, x) => {
      getResponseMock[x] = res;
    },
    reset: () => {
      i = 0;
      getResponseMock = [];
    }
  };
});

jest.mock("./fish.adapter", () => {
  return {
    adapt: jest.fn(() => Promise.resolve({ adaptedFish: true }))
  };
});

jest.mock("fs", () => {
  return {
    writeFile: jest.fn((path, data, cb) => cb(null, true)),
    access: jest.fn((path, _, cb) => cb(new Error("file not exist"))),
    constants: {
      F_OK: "ok"
    }
  };
});

jest.mock("./fish.reconcilier", () => {
  return {
    reconcile: jest.fn()
  };
});

const scrapper = require("./");
const axios = require("axios");
const fishAdapter = require("./fish.adapter");
const fishReconcilier = require("./fish.reconcilier");
const fs = require("fs");

describe("fish scrapper", () => {
  beforeEach(() => {
    console.log = jest.fn();
    console.error = jest.fn();
    fs.writeFile.mockClear();
    axios.get.mockClear();
    axios.reset();

    axios.setDefaultGetResponse(Promise.reject({ response: { status: 404 } }));
  });

  it("should call https://www.aquachange.fr/poisson_fiche_aquarium.php?id= urls", async () => {
    await scrapper.scrap();
    expect(axios.get.mock.calls[0][0]).toBe(
      "https://www.aquachange.fr/poisson_fiche_aquarium.php?id=0"
    );
  });

  it("should call 10 differents urls before quit", async () => {
    await scrapper.scrap();

    expect(axios.get.mock.calls[0][0]).toContain("id=0");
    expect(axios.get.mock.calls[1][0]).toContain("id=1");
    expect(axios.get.mock.calls[2][0]).toContain("id=2");
    expect(axios.get.mock.calls[3][0]).toContain("id=3");
    expect(axios.get.mock.calls[4][0]).toContain("id=4");
    expect(axios.get.mock.calls[5][0]).toContain("id=5");
    expect(axios.get.mock.calls[6][0]).toContain("id=6");
    expect(axios.get.mock.calls[7][0]).toContain("id=7");
    expect(axios.get.mock.calls[8][0]).toContain("id=8");
    expect(axios.get.mock.calls[9][0]).toContain("id=9");
  });

  it("should call the adapter with fish data", async () => {
    axios.setGetResponseOnXTimes(
      Promise.resolve({ data: "<html>TOTO</html>" }),
      1
    );

    await scrapper.scrap();

    expect(fishAdapter.adapt).toHaveBeenCalledWith("<html>TOTO</html>", 0);
  });

  it("should write file if it doesn't exist for now", async () => {
    axios.setGetResponseOnXTimes(
      Promise.resolve({ data: "<html>TOTO</html>" }),
      1
    );

    await scrapper.scrap();

    expect(fs.writeFile.mock.calls[0][1]).toEqual('{"adaptedFish":true}');
  });

  it("should call file reconsiliator if fish already exist", async () => {
    axios.setGetResponseOnXTimes(
      Promise.resolve({ data: "<html>TOTO</html>" }),
      1
    );

    fs.access.mockImplementation((path, _, cb) => cb());

    await scrapper.scrap();

    expect(fishReconcilier.reconcile.mock.calls[0][0]).toEqual({
      adaptedFish: true
    });
  });

  it("should show error in red when unexpected error happened", async () => {
    axios.setGetResponseOnXTimes(
      Promise.reject({ data: "<html>500</html>" }),
      1
    );

    fs.access.mockImplementation((path, _, cb) => cb());

    await scrapper.scrap();

    expect(console.error).toHaveBeenCalled();
  });
});
