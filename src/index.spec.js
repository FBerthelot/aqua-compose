import ReactDOM from "react-dom";

jest.mock("react-dom", () => {
  return {
    render: jest.fn()
  };
});

describe("index", () => {
  it("should call react.render", () => {
    require("./index");
    expect(ReactDOM.render).toHaveBeenCalled();
  });
});
