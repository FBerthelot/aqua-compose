import React from "react";
import { mount, shallow } from "enzyme";
import { Layout } from "./layout";
import { setReduxMock } from "../useRedux";

jest.mock("../useRedux", () => {
  let reduxmock;
  return {
    useRedux: () => reduxmock,
    setReduxMock: m => (reduxmock = m)
  };
});

describe("Layout", () => {
  beforeEach(() => {
    setReduxMock({
      aquariumVolume: 80,
      onVolumeChange: jest.fn()
    });
  });

  it("should not throw an error", () => {
    expect(
      shallow(
        <Layout>
          <p>TOTO</p>
        </Layout>
      )
    ).toBeTruthy();
  });

  it("should display children content", () => {
    const component = mount(
      <Layout>
        <div>childContent</div>
      </Layout>
    );

    expect(component.debug()).toContain("childContent");
  });

  it("should open the menu when clicking on the button", () => {
    const component = mount(
      <Layout>
        <p>TOTO</p>
      </Layout>
    );

    expect(component.find("form").exists()).toBeFalsy();

    component.find("button").simulate("click");

    expect(component.find("form").exists()).toBeTruthy();
  });
});
