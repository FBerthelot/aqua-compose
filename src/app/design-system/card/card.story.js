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
        style={{ marginLeft: "3rem" }}
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
              "https://lh3.googleusercontent.com/-r95Z6bh7yqE/XQOUS7S2uaI/AAAAAAAAKiw/DnvV1tWX824ADWi0wNuCXEtfsjA6sX55wCK8BGAs/s0/2019-06-14.jpg",
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
