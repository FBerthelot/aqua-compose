import React from "react";

import { storiesOf } from "@storybook/react";
import { withKnobs, number, select } from "@storybook/addon-knobs";
import { withTests } from "@storybook/addon-jest";
import results from "../../../../.jest-test-results.json";

import { RangeDisplayer } from "./range-displayer";

storiesOf("RangeDisplayer", module)
  .addDecorator(withTests({ results }))
  .addDecorator(withKnobs)
  .add(
    "all",
    () => (
      <>
        <RangeDisplayer
          unit={number("unit", "L")}
          range={[0, 14]}
          type={select("type", ["ph", "gh", "temperature", "volume"], "ph")}
        />
      </>
    ),
    {
      jest: ["range-displayer.spec.js"]
    }
  );
