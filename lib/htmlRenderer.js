const path = require("path");
const fs = require("fs");

const templatesDir = path.resolve(__dirname, "../templates");

const badgeHtml = fs.readFileSync(
  path.resolve(templatesDir, "priority-badge.html"),
  "utf8"
);
const taskTemplate = fs.readFileSync(
  path.resolve(templatesDir, "task.html"),
  "utf8"
);
const mainTemplate = fs.readFileSync(
  path.resolve(templatesDir, "main.html"),
  "utf8"
);

const replacePlaceholders = (template, placeholder, value) => {
  const pattern = new RegExp("{{ " + placeholder + " }}", "gm");
  return template.replace(pattern, value);
};

const renderTask = (task) => {
  const badge = task.isHighPriority ? badgeHtml : "";
  let html = replacePlaceholders(taskTemplate, "text", task.text);
  html = replacePlaceholders(html, "badge", badge);
  return html;
};

const renderHtml = (tasks) => {
  const tasksHtml = tasks.map((task) => renderTask(task)).join("");
  const html = replacePlaceholders(mainTemplate, "tasks", tasksHtml);
  return html;
};

module.exports = renderHtml;
