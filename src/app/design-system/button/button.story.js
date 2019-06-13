import React from "react";

import { storiesOf } from "@storybook/react";
import { withTests } from "@storybook/addon-jest";
import { action } from "@storybook/addon-actions";
import { withKnobs, select, boolean } from "@storybook/addon-knobs";

import results from "../../../../.jest-test-results.json";

import "../color.css";

import { Button } from "./button";

storiesOf("Button", module)
  .addDecorator(withTests({ results }))
  .addDecorator(withKnobs)
  .add(
    "default",
    () => (
      <div
        style={{
          backgroundColor: "var(--color_primary-light)",
          padding: "5rem"
        }}
      >
        <Button
          onClick={action("onClick")}
          variant={select("variant", ["primary", "secondary"], "primary")}
          disabled={boolean("disabled")}
        >
          With knobs
        </Button>
        <br />
        <br />

        <Button onClick={action("onClick")}>primary button</Button>
        <br />
        <br />
        <Button onClick={action("onClick")} disabled>
          primary button d
        </Button>
        <br />
        <br />
        <Button onClick={action("onClick")} variant="secondary">
          secondary button
        </Button>
        <br />
        <br />
        <Button onClick={action("onClick")} variant="secondary" disabled>
          secondary button d
        </Button>
      </div>
    ),
    {
      jest: ["button.spec.js"]
    }
  );
