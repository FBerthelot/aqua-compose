import React from "react";

import { storiesOf } from "@storybook/react";

import { ProgressBar } from "../app/design-system/progress-bar/progress-bar";

storiesOf("ProgressBar", module)
  .add("default", () => (
    <>
      <ProgressBar percent={10} />
      <br />
      <ProgressBar percent={60} />
    </>
  ))
  .add("full", () => <ProgressBar percent={100} />)
  .add("over", () => <ProgressBar percent={500} />)
  .add("warning", () => <ProgressBar percent={90} />);
