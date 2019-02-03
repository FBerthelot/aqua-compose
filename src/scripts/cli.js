const chalk = require("chalk");
const inquirer = require("inquirer");

const { scrap } = require("./scrapper/");
const generateAPI = require("./api/api.generator").generate;

const actions = {
  get: "Get data from aqua change",
  generateAPI: "Generate API"
};

exports.init = function init() {
  return inquirer
    .prompt([
      {
        name: "action",
        type: "list",
        choices: [actions.get, actions.generateAPI],
        message: "What you want to do?"
      }
    ])
    .then(({ action }) => {
      switch (action) {
        case actions.get:
          return scrap();
        default:
      }
    })
    .then(() => console.log(chalk.yellow("Start generating the API")))
    .then(() => generateAPI())
    .then(() => console.log(chalk.green("API generated")))
    .then(() => console.log(chalk.green("You are out now")))
    .catch(err => console.error(chalk.red(err)));
};
