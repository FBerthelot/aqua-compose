import React from "react";
import { mount, shallow } from "enzyme";
import { Menu } from "./menu";
import { setState, dispatch } from "../../useRedux";

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

describe("header", () => {
  let defaultProps;
  beforeEach(() => {
    defaultProps = {
      drawerIsOpen: true,
      setDrawerIsOpen: jest.fn()
    };

    setState({
      aquarium: { volume: 80 }
    });
  });

  it("should not throw an error", () => {
    expect(shallow(<Menu {...defaultProps} />)).toBeTruthy();
  });

  it("should open the menu when drawerIsOpen is at true", () => {
    const component = mount(<Menu {...defaultProps} />);
    expect(component.find("form").exists()).toBeTruthy();
  });

  it("should not open the menu when drawerIsOpen is at false", () => {
    defaultProps.drawerIsOpen = false;

    const component = mount(<Menu {...defaultProps} />);

    expect(component.find("form").exists()).toBeFalsy();
  });

  it("should dispatch SET_AQUARIUM_VOLUME when changing the volume input", () => {
    const component = mount(<Menu {...defaultProps} />);
    component
      .find("TextField")
      .props()
      .onChange({ target: { value: "180" } });

    expect(dispatch).toHaveBeenCalledWith({
      type: "SET_AQUARIUM_VOLUME",
      payload: { volume: 180 }
    });
  });
});
