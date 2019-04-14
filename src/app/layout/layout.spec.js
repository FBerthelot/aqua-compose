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
});
