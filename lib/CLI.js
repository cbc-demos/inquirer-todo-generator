const fs = require("fs");
const util = require("util");
const path = require("path");
const inquirer = require("inquirer");
const Task = require("./Task");
const htmlRenderer = require("./htmlRenderer");

const writeFileAsync = util.promisify(fs.writeFile);

class CLI {
  constructor() {
    this.tasks = [];
  }

  run() {
    console.log("Please add tasks.");
    this.menu();
  }

  menu() {
    inquirer
      .prompt([
        {
          type: "list",
          name: "choice",
          message: "Add a task?",
          choices: ["Yes", "No", "Quit"],
          default: "Yes",
        },
      ])
      .then((answers) => {
        switch (answers.choice) {
          case "Yes":
            return this.creatTask();
          case "No":
            return this.generateHtml();
          default:
            console.log("good bye!");
            process.exit(0);
        }
      });
  }

  creatTask() {
    inquirer
      .prompt([
        {
          type: "input",
          name: "text",
          message: "Enter a description:",
        },
        {
          type: "confirm",
          name: "isHighPriority",
          message: "Is this task a high priority?",
        },
      ])
      .then((answers) => {
        // create a new task
        const { text, isHighPriority } = answers;
        const task = new Task(text, isHighPriority);
        // add it to tasks property
        this.tasks.push(task);
        // go back to the menu
        this.menu();
      });
  }

  generateHtml() {
    // generate a string of  html using the htmlRenderer
    const html = htmlRenderer(this.tasks);

    // get an absolute path for the output file
    const file = path.join(__dirname, "../output/todos.html");
    writeFileAsync(file, html)
      .then(() => {
        console.log(`Created ${file}.`);
        process.exit(0);
      })
      .catch((error) => {
        console.log(error);
        console.log("Unable to create todos file. Try again.");
        process.exit(1);
      });
  }
}

module.exports = CLI;
