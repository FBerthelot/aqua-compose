import React from "react";

import { storiesOf } from "@storybook/react";
import { withKnobs, number } from "@storybook/addon-knobs";
import { withTests } from "@storybook/addon-jest";
import results from "../../../../.jest-test-results.json";

import { ProgressBar } from "./progress-bar";

storiesOf("ProgressBar", module)
  .addDecorator(withTests({ results }))
  .addDecorator(withKnobs)
  .add(
    "all",
    () => (
      <>
        <ProgressBar percent={number("percent", 10)} />
        <br />
        <ProgressBar percent={0} />
        <br />
        <ProgressBar percent={60} />
        <br />
        <ProgressBar percent={90} />
        <br />
        <ProgressBar percent={100} />
        <br />
        <ProgressBar percent={500} />
      </>
    ),
    {
      jest: ["progress-bar.spec.js"]
    }
  );
