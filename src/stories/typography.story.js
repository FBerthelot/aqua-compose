import React from "react";

import { storiesOf } from "@storybook/react";

import { Typography } from "../app/design-system/typography/typography";
import { withKnobs, text } from "@storybook/addon-knobs";

storiesOf("Typography", module)
  .addDecorator(withKnobs)
  .add("default", () => <Typography>default typography</Typography>)
  .add("h1", () => (
    <Typography
      variant={text("variant", "h1")}
      component={text("component", "h2")}
    >
      H1 variant example
    </Typography>
  ))
  .add("h2", () => (
    <Typography
      variant={text("variant", "h2")}
      component={text("component", "h2")}
    >
      H2 variant example
    </Typography>
  ))
  .add("h3", () => (
    <Typography
      variant={text("variant", "h3")}
      component={text("component", "h2")}
    >
      H3 variant example
    </Typography>
  ))
  .add("h4", () => (
    <Typography
      variant={text("variant", "h4")}
      component={text("component", "h2")}
    >
      H4 variant example
    </Typography>
  ))
  .add("scientific-name", () => (
    <Typography variant={text("variant", "scientific-name")}>
      scientific-name example
    </Typography>
  ));
