import React from "react";
import { mount } from "enzyme";
import { Header } from "./header";

describe("header", () => {
  let defaultProps;
  beforeEach(() => {
    defaultProps = {
      setDrawerIsOpen: jest.fn()
    };
  });

  it("should not throw an error", () => {
    expect(mount(<Header {...defaultProps} />)).toBeTruthy();
  });

  it("should call setDrawerIsOpen props when clicking the button", () => {
    const component = mount(<Header {...defaultProps} />);

    component.find("button").simulate("click");

    expect(defaultProps.setDrawerIsOpen).toHaveBeenCalled();
  });
});
