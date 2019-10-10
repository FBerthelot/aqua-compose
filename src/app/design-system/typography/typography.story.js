import React from "react";
import "../color.css";

import { storiesOf } from "@storybook/react";
import { withTests } from "@storybook/addon-jest";

import { Typography } from "./typography";
import { withKnobs, select } from "@storybook/addon-knobs";

import results from "../../../../.jest-test-results.json";

const variants = [
  "button",
  "button-disabled",
  "error",
  "h1",
  "h2",
  "h3",
  "h4",
  "label",
  "scientific-name",
  "text",
  "text-center",
  "primary-dark",
  "white"
];

storiesOf("Typography", module)
  .addDecorator(withTests({ results }))
  .addDecorator(withKnobs)
  .add(
    "all",
    () => (
      <>
        <Typography variant={select("variant", variants, "text")}>
          with knobs
        </Typography>

        <Typography>default typography</Typography>

        {variants.map(variant => {
          return (
            <Typography variant={variant} component="h2">
              {variant} variant example
            </Typography>
          );
        })}
      </>
    ),
    {
      jest: ["typography.spec.js"]
    }
  );
