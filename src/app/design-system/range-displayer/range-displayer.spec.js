import React from "react";
import { RangeDisplayer } from "./range-displayer";
import { shallow } from "enzyme";

describe("RangeDisplayer", () => {
  it("should display message when unknonw", () => {
    const cmp = shallow(<RangeDisplayer known={false} type="plus" />);

    expect(cmp.debug()).toContain("non connu");
  });

  it("should not display message when knwon", () => {
    const cmp = shallow(<RangeDisplayer known type="ph" range={[0, 42]} />);

    expect(cmp.debug()).not.toContain("non connu");
  });

  it("should display unit", () => {
    const cmp = shallow(<RangeDisplayer unit="Ph" type="ph" range={[0, 42]} />);

    expect(cmp.debug()).toContain("Ph");
  });

  it("should display range", () => {
    const cmp = shallow(<RangeDisplayer unit="Ph" type="ph" range={[0, 42]} />);

    expect(cmp.debug()).toContain("0 à 42");
  });
});
