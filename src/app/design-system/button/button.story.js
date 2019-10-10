import React from "react";

import { storiesOf } from "@storybook/react";
import { withTests } from "@storybook/addon-jest";
import { action } from "@storybook/addon-actions";
import { withKnobs, select, boolean, text } from "@storybook/addon-knobs";

import results from "../../../../.jest-test-results.json";

import "../color.css";

import { Button } from "./button";

storiesOf("Button", module)
  .addDecorator(withTests({ results }))
  .addDecorator(withKnobs)
  .add(
    "primary",
    () => (
      <div
        style={{
          backgroundColor: "var(--color_primary-light)",
          padding: "0rem"
        }}
      >
        <Button onClick={action("onClick")}>primary button</Button>
        <br />
        <Button onClick={action("onClick")} disabled>
          dispabled button
        </Button>
      </div>
    ),
    {
      jest: ["button.spec.js"]
    }
  )
  .add(
    "secondary",
    () => (
      <div
        style={{
          backgroundColor: "var(--color_primary-light)",
          padding: "0rem"
        }}
      >
        <Button onClick={action("onClick")} variant="secondary">
          secondary button
        </Button>
        <br />
        <Button onClick={action("onClick")} variant="secondary" disabled>
          secondary button d
        </Button>
      </div>
    ),
    {
      jest: ["button.spec.js"]
    }
  )
  .add(
    "withKnobs",
    () => (
      <div
        style={{
          padding: "0rem"
        }}
      >
        <Button
          onClick={action("onClick")}
          variant={select("variant", ["primary", "secondary"], "primary")}
          disabled={boolean("disabled")}
        >
          {text("content", "With knobs")}
        </Button>
      </div>
    ),
    {
      jest: ["button.spec.js"]
    }
  );
