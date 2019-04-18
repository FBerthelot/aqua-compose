import { configure, addDecorator } from "@storybook/react";
import { withA11y } from "@storybook/addon-a11y";

function loadStories() {
  require("../src/stories");
}

addDecorator(withA11y);

configure(loadStories, module);
