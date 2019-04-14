import React from "react";
import { shallow } from "enzyme";
import App from "./app";

describe("app", () => {
  it("should not throw an error", () => {
    expect(shallow(<App />)).toBeTruthy();
  });

  it("should return a valid component for my-aquarium route", () => {
    const app = shallow(<App />);
    const RenderProps = app.find('[path="/my-aquarium/"]').props().component;
    const myAquariumCmp = shallow(<RenderProps />);

    expect(myAquariumCmp).toBeTruthy();
  });
});
