import React from "react";

import { storiesOf } from "@storybook/react";
import { withKnobs, text } from "@storybook/addon-knobs";
import { withTests } from "@storybook/addon-jest";
import results from "../../../../.jest-test-results.json";

import { Input } from "./input";

storiesOf("Input", module)
  .addDecorator(withTests({ results }))
  .addDecorator(withKnobs)
  .add(
    "input-text",
    () => (
      <div
        style={{
          width: "50%",
          backgroundColor: "var(--color_primary-light)",
          padding: "5rem"
        }}
      >
        <Input
          id="theID"
          variant="text"
          placeholder={text("placeholder", "Placeholder")}
          label={text("label", "label")}
        />

        <Input
          id="email"
          variant="text"
          value="cécile@chaVaBien?"
          label="Label Error"
          error="The email is not valid"
        />
      </div>
    ),
    {
      jest: ["input.js"]
    }
  )
  .add(
    "input-text-unit",
    () => (
      <div
        style={{
          width: "50%",
          backgroundColor: "var(--color_primary-light)",
          padding: "5rem"
        }}
      >
        <Input
          id="litron"
          label={text("label", "label")}
          unit={text("unit", "L")}
          placeholder={text("placeholder", "180")}
          type="number"
        />

        <Input
          id="celcius"
          label="Degree"
          unit="°C"
          value="-1"
          type="number"
          error="Enter a positive number"
        />
      </div>
    ),
    {
      jest: ["input.js"]
    }
  );
