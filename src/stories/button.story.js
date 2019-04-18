import React from "react";

import { storiesOf } from "@storybook/react";

import { Button } from "../app/design-system/button/button";

storiesOf("Button", module).add("default", () => (
  <Button>default button</Button>
));
