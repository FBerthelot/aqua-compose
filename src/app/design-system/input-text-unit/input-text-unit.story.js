import React from "react";

import { storiesOf } from "@storybook/react";
import { withKnobs, text } from "@storybook/addon-knobs";
import { withTests } from "@storybook/addon-jest";
import results from "../../../../.jest-test-results.json";

import { InputTextUnit } from "./input-text-unit";

storiesOf("Input", module)
  .addDecorator(withTests({ results }))
  .addDecorator(withKnobs)
  .add(
    "input-text-unit",
    () => (
      <div style={{ width: "50%" }}>
        <InputTextUnit
          unit={text("unit", "L")}
          label={text("label", "label")}
          required
        />
      </div>
    ),
    {
      jest: ["input-text-unit.spec.js"]
    }
  );
