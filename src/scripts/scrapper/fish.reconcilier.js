const { promisify } = require("util");
const fs = require("fs");
const writeFile = promisify(fs.writeFile);
const readFile = promisify(fs.readFile);
const inquirer = require("inquirer");
const diff = require("deep-object-diff").diff;
const chalk = require("chalk");

exports.reconcile = async (fishData, path) => {
  const oldFile = JSON.parse(await readFile(path, "utf8"));

  const fishDiff = diff(oldFile, fishData);

  if (Object.keys(fishDiff).length === 0) {
    console.log(`${chalk.cyan("*")} ${fishData.name} already exist`);
    return;
  }

  console.log(`${chalk.yellow("*")} ${fishData.name} already exist`);
  console.log(fishDiff);

  const newFish = await inquirer.prompt([
    {
      name: "data",
      type: "editor",
      message: "Write your new fish",
      default: JSON.stringify(oldFile, null, 2)
    }
  ]);

  // Parse JSON before stringify in order to minify the file
  return writeFile(path, JSON.stringify(JSON.parse(newFish.data)));
};
