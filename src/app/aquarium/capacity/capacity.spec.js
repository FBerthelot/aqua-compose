import React from "react";
import { Capacity } from "./capacity";
import { shallow } from "enzyme";
import router from "use-react-router";

jest.mock("use-react-router", () => {
  const routerMock = {
    history: {
      push: jest.fn()
    }
  };

  return jest.fn(() => routerMock);
});

jest.mock("../../useRedux", () => {
  const dispatch = jest.fn();
  let statemock;
  return {
    useRedux: (mapState = () => {}, mapDispatch = () => {}) => {
      return {
        ...mapState(statemock),
        ...(mapDispatch ? mapDispatch(dispatch) : {})
      };
    },
    dispatch,
    setState: s => (statemock = s)
  };
});

describe("capacity", () => {
  beforeEach(() => {});

  it("should not throw an error", () => {
    expect(shallow(<Capacity />)).toBeTruthy();
  });

  it("should not redirect to my-aquarium page when form is invalid", () => {
    const cmp = shallow(<Capacity />);
    cmp.find("form").simulate("submit", { preventDefault: jest.fn() });

    expect(router().history.push).not.toHaveBeenCalled();
  });

  it("should redirect to my-aquarium page when form is valid", () => {
    const cmp = shallow(<Capacity />);

    cmp.find("InputTextUnit").simulate("change", { target: { value: "50" } });
    cmp.find("form").simulate("submit", { preventDefault: jest.fn() });

    expect(router().history.push).toHaveBeenCalled();
  });

  it("should disable button when form is invalid", () => {
    const cmp = shallow(<Capacity />);

    cmp.find("InputTextUnit").simulate("change", { target: { value: "" } });

    expect(cmp.find("Button").props().disabled).toBe(true);
  });

  it("should not disabled button when form is valid", () => {
    const cmp = shallow(<Capacity />);

    cmp.find("InputTextUnit").simulate("change", { target: { value: "50" } });

    expect(cmp.find("Button").props().disabled).toBeFalsy();
  });
});
