import React from "react";

import { storiesOf } from "@storybook/react";
import { withKnobs, text } from "@storybook/addon-knobs";
import { withTests } from "@storybook/addon-jest";
import results from "../../../../.jest-test-results.json";

import { SearchInput } from "./search";

storiesOf("Input", module)
  .addDecorator(withTests({ results }))
  .addDecorator(withKnobs)
  .add(
    "search",
    () => (
      <div
        style={{
          width: "50%",
          backgroundColor: "var(--color_primary-light)",
          padding: "5rem"
        }}
      >
        <SearchInput id="litron" placeholder={text("placeholder", "180")} />
      </div>
    ),
    {
      jest: ["input.js"]
    }
  );
