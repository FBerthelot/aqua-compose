import React from "react";

import { storiesOf } from "@storybook/react";
import { withTests } from "@storybook/addon-jest";
import { object, withKnobs, text } from "@storybook/addon-knobs";
import results from "../../.jest-test-results.json";

import { FishCard } from "../app/aquarium/aquarium-fishes/fish-card/fish-card";
import { action } from "@storybook/addon-actions";

storiesOf("Fish card", module)
  .addDecorator(withTests({ results }))
  .addDecorator(withKnobs)
  .add(
    "default",
    () => (
      <FishCard
        fish={object(
          "fish",
          {
            name: "Chechile",
            surname: "Designer",
            category: "Antillaise",
            adultSize: 150,
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
              "https://pbs.twimg.com/profile_images/1081180282978484224/WFXPlDwl_400x400.jpg",
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
      jest: ["fish-card.spec.js"]
    }
  );
