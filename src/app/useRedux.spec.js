import { useRedux } from "./useRedux";
import { useMappedState, setStateMock } from "redux-react-hook";
import { useCallback } from "react";

jest.mock("react", () => {
  return {
    useCallback: jest.fn((fn, memo) => fn)
  };
});

jest.mock("redux-react-hook", () => {
  let stateMock;
  return {
    useMappedState: jest.fn((fn, memo) => ({ ...fn(stateMock) })),
    useDispatch: jest.fn(),
    setStateMock: s => (stateMock = s)
  };
});

describe("useRedux", () => {
  let defaultState;
  beforeEach(() => {
    defaultState = {
      toto: 42
    };
    setStateMock(defaultState);

    useMappedState.mockClear();
    useCallback.mockClear();
  });

  it("should return an object with stateData", () => {
    const mapState = state => state;
    expect(useRedux(mapState)).toEqual({
      toto: 42
    });
  });

  it("should return an object with dispatch function", () => {
    const setTotoFunction = jest.fn();
    const mapDispatch = () => {
      return {
        setToto: setTotoFunction
      };
    };

    expect(useRedux(null, mapDispatch)).toEqual({
      setToto: setTotoFunction
    });
  });

  it("should call useCallback eachTime with the memo object", () => {
    const mapState = state => state;
    const mapDispatch = () => {
      return {
        setToto: jest.fn()
      };
    };
    const memo = ["id"];
    useRedux(mapState, mapDispatch, memo);

    useCallback.mock.calls.forEach(call => {
      expect(call[1]).toBe(memo);
    });
  });
});
