import React from "react";
import { FishCard } from "./fish-card";
import { shallow } from "enzyme";

describe("fish-card", () => {
  let defaultProps;
  beforeEach(() => {
    defaultProps = {
      fish: {
        name: "nemo",
        surname: "clown",
        category: "mer",
        adultSize: 15,
        minimumPopulation: 2,
        minimumVolume: 100,
        water: {
          temperature: [0, 50],
          PH: [6, 10],
          GH: [3, 10]
        },
        lifeZone: ["Milieu"],
        picture: "null",
        link: "gotolink"
      },
      removeFish: jest.fn(),
      setNbOfFishes: jest.fn()
    };
  });

  it("should not throw error", () => {
    expect(shallow(<FishCard {...defaultProps} />)).toBeTruthy();
  });
});
