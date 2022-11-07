const inquirer = require("inquirer");
const logo = require("asciiart-logo");
const mysql = require("mysql2");
require("console.table");
const db = require("./db");

init();

function init() {
  const logoText = logo({ name: "El Jefe" }).render();

  console.log(logoText);

  runPrompts();
  console.log(1);
}
