import React from "react";
import { mount, shallow } from "enzyme";
import { Layout } from "./layout";

describe("Layout", () => {
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
