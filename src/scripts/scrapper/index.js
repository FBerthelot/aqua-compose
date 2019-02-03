const axios = require("axios");
const { promisify } = require("util");
const fs = require("fs");
const path = require("path");
const writeFile = promisify(fs.writeFile);
const access = promisify(fs.access);
const { adapt } = require("./fish.adapter");
const { reconcile } = require("./fish.reconcilier");
const chalk = require("chalk");

exports.scrap = async () => {
  // Stop after 5 404 in a row
  let nbOfErrInARow = 0;
  let id = 0;

  while (nbOfErrInARow < 10) {
    try {
      const res = await axios.get(
        `https://www.aquachange.fr/poisson_fiche_aquarium.php?id=${id}`
      );

      const adaptedFish = await adapt(res.data, id);

      const fishFilePath = path.join(
        __dirname,
        `../../../public/data/fishes/${adaptedFish.slug}.json`
      );

      const fishAlreadyExist = await access(fishFilePath, fs.constants.F_OK)
        .then(() => true)
        .catch(() => false);

      if (fishAlreadyExist) {
        await reconcile(adaptedFish, fishFilePath);
      } else {
        await writeFile(fishFilePath, JSON.stringify(adaptedFish));
        console.log(`${chalk.green("*")} ${adaptedFish.name} added`);
      }

      nbOfErrInARow = 0;
    } catch (e) {
      if (!e.response || e.response.status !== 404) {
        console.error(e);
      } else {
        console.log(`${chalk.red("*")} fish N°${id} doesn't exist`);
      }
      nbOfErrInARow++;
    }
    id++;
  }
  console.log(chalk.cyan("Maximum error reached, stop fetching"));
};
