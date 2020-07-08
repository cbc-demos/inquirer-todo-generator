# inquirer-todo-generator

Command line app to generate a todolist web page.

## Starter Code

You can access the starter code for this activity here.

https://github.com/cbc-demos/inquirer-todo-generator/tree/starter-code

## Pseudo-code

### htmlRenderer

Function which accepts an array of task objects and returns an html string.

### Task

Create task objects

- `text`: property is a string which holds the description of the task.
- `isHighPriority`: property is a boolean which is true if the task has a high priority.

### CLI

Object manages user interface and app flow. Depends on `Task`, `inquirer`, `htmlRenderer`, and `fs`.

- `tasks`: Array of `Task` objects. Defaults to an empty array. (`[]`)
- `run`: Start the app
- `addTask`: Method to prompt user to create a task and add the task to `tasks`.
- `menu`: Method to prompt user to add a new task, finish, or cancel/quit.
- `generateHtml`: Method to create html using `tasks`, `htmlRenderer`, and create the file.

