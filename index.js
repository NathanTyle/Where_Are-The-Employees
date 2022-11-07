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

function runPrompts() {
    console.log(2);
    inquirer
      .prompt([
        {
          type: "list",
          name: "choice",
          message: "What're we doing today Boss?",
          choices: [
            {
              name: "View All Employees",
              value: "VIEW_EMPLOYEES",
            },
            {
              name: "View All Departments",
              value: "VIEW_DEPARTMENTS",
            },
            {
              name: "View All Employees By Department",
              value: "VIEW_EMPLOYEES_BY_DEPARTMENT",
            },
            {
              name: "View All Roles",
              value: "VIEW_ROLES",
            },
            {
              name: "Add Employee",
              value: " ADD_EMPLOYEE",
            },
            {
              name: "Add Department",
              value: "ADD_DEPARTMENT",
            },
            {
              name: "Add Role",
              value: "ADD_ROLE",
            },
            {
              name: "Remove Employee",
              value: "REMOVE_EMPLOYEE",
            },
            {
              name: "Remove Role",
              value: "REMOVE_ROLE",
            },
            {
              name: "Update Employee Role",
              value: "UPDATE_EMPLOYEE_ROLE",
            },
            {
              name: "Quit",
              value: "QUIT",
            },
          ],
        },
      ])
      .then((res) => {
        let choice = res.choice;
        switch (choice) {
          case "VIEW_EMPLOYEES":
            viewEmployees();
            break;
          case "VIEW_DEPARTMENTS":
            viewDepartments();
            break;
          case "VIEW_EMPLOYEES_BY_DEPARTMENT":
            viewEmployeesByDepartment();
            break;
          case "VIEW_ROLES":
            viewRoles();
            break;
          case "ADD_EMPLOYEE":
            addEmployee();
            break;
          case "ADD_DEPARTMENT":
            addDepartment();
            break;
          case "ADD_ROLE":
            addRoles();
            break;
          case "REMOVE_EMPLOYEE":
            removeEmployee();
            break;
          case "REMOVE_ROLE":
            removeRole();
            break;
          case "UPDATE_EMPLOYEE_ROLE":
            updateEmployeeRole();
            break;
          default:
            quit();
        }
      });
  }
  
function viewEmployees() {
    db.findAllEmployees()
      .then(([rows]) => {
        let employees = rows;
        console.log("\n");
        console.table(employees);
      })
      .then(() => runPrompts());
    console.log(3);
  }
  
function viewEmployeesByDepartment() {
    db.findAllDepartments().then(([rows]) => {
      let departments = rows;
      const departmentChoices = departments.map(({ id, name }) => ({
        name: name,
        value: id,
      }));
  
      inquirer
        .prompt([
          {
            type: "list",
            name: "departmentId",
            message:
              "Looking for an employee? What department are we looking at?",
            choices: departmentChoices,
          },
        ])
        .then((res) => db.findAllEmployeesByDepartment(res.departmentId))
        .then(([rows]) => {
          let employees = rows;
          console.log("\n");
          console.table(employees);
        })
        .then(() => runPrompts());
    });
    console.log(4);
  }