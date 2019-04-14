import React from "react";
import { mount } from "enzyme";
import { Aquarium } from "./aquarium";
import { dispatch } from "../useRedux";

jest.mock("../useRedux", () => {
  const dispatch = jest.fn();
  return {
    useRedux: (mapState = () => {}, mapDispatch = () => {}) => {
      return {
        ...mapState(),
        ...mapDispatch(dispatch)
      };
    },
    dispatch
  };
});

jest.mock("./aquarium-fishes/aquarium-fishes", () => {
  return {
    AquariumFishes: () => {
      return <div />;
    }
  };
});

jest.mock("./aquarium-variables/aquarium-variables", () => {
  return {
    AquariumVariables: () => {
      return <div />;
    }
  };
});

describe("Aquarium", () => {
  beforeEach(() => {
    // eslint-disable-next-line no-native-reassign
    fetch = jest.fn(() => {
      return {
        then: cb => {
          return cb({
            json: () => ({
              then: cb => {
                cb([{ name: "fish1" }]);
                return {
                  catch: () => {}
                };
              }
            })
          });
        }
      };
    });
  });

  it("should not throw an error", () => {
    expect(mount(<Aquarium />)).toBeTruthy();
  });

  it("should initialize fish data by calling the reducer", async () => {
    await mount(<Aquarium />);

    expect(fetch).toHaveBeenCalledWith("/data/all.json");
    expect(dispatch).toHaveBeenCalledWith({
      payload: { fishes: [{ name: "fish1" }] },
      type: "POPULATE_FISHES"
    });
  });
});
