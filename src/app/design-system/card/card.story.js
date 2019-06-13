import React from "react";

import { storiesOf } from "@storybook/react";
import { object, withKnobs, text } from "@storybook/addon-knobs";
import { withTests } from "@storybook/addon-jest";
import results from "../../../../.jest-test-results.json";

import { Card } from "./card";
import { action } from "@storybook/addon-actions";

storiesOf("Card", module)
  .addDecorator(withTests({ results }))
  .addDecorator(withKnobs)
  .add(
    "default",
    () => (
      <Card
        fish={object(
          "fish",
          {
            name: "Chechile",
            surname: "Designer dog",
            category: "Antillaise",
            adultSize: 153,
            minimumPopulation: 1,
            nbInAquarium: null,
            minimumVolume: 500,
            water: {
              temperature: [30, 35],
              PH: [5, 6.8],
              GH: [3, 10]
            },
            lifeZone: ["Paris"],
            picture:
              "https://www.woopets.fr/assets/races/000/159/screen/chihuahua.jpg",
            link: "gotolink"
          },
          "fish-props"
        )}
        onNbFishChange={action("onNbFishChange")}
        action={{
          name: text("action.name", "Supprimer", "fish-props"),
          handler: action("SupressAction")
        }}
      />
    ),
    {
      jest: ["card.spec.js"]
    }
  );
