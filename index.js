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

function removeEmployee() {
    db.findAllEmployees().then(([rows]) => {
      let employees = rows;
      const employeeChoices = employees.map(({ id, first_name, last_name }) => ({
        name: `${first_name} ${last_name}`,
        value: id,
      }));
  
      inquirer
        .prompt([
          {
            type: "list",
            name: "employeeId",
            message:
              "Letting someone go? Tough break, which one are we cutting loose Boss?",
            choices: employeeChoices,
          },
        ])
        .then((res) => db.removeEmployee(res.employeeId))
        .then(() =>
          console.log(
            "Alright Boss they've been cleared from the database. The poor soul had kids!"
          )
        )
        .then(() => runPrompts());
    });
    console.log(6);
  }
  
function updateEmployeeRole() {
    db.findAllEmployees().then(([rows]) => {
      let employees = rows;
      const employeeChoices = employee.map(({ id, first_name, last_name }) => ({
        name: `${first_name} ${last_name}`,
        value: id,
      }));
  
      inquirer
        .prompt([
          {
            type: "list",
            name: "employeeId",
            message:
              "Oooh is someone getting promoted or demoted? Eh doesn't matter which employee's role are we updating?",
            choice: employeeChoices,
          },
        ])
        .then((res) => {
          let employeeId = res.employeeId;
          db.findAllRoles().then(([rows]) => {
            let roles = rows;
            const roleChoices = roles.map(({ id, title }) => ({
              name: title,
              value: id,
            }));
            inquirer
              .prompt([
                {
                  type: "list",
                  name: "roleId",
                  message: "Alright boss lets assign someone a title.",
                  choices: roleChoices,
                },
              ])
              .then((res) => db.updateEmployeeRole(employeeId, res.roleId))
              .then(() => console.log("New role assigned"))
              .then(() => runPrompts());
          });
        });
    });
    console.log(7);
}

function viewRoles() {
    db.findAllRoles()
      .then(([rows]) => {
        let roles = rows;
        console.log("\n");
        console.log(roles);
      })
      .then(() => runPrompts());
    console.log(9);
}

function addRoles() {
    db.findAllDepartments().then(([rows]) => {
      let departments = rows;
      const departmentChoices = departments.map(({ id, name }) => ({
        name: name,
        value: id,
      }));
      inquirer
        .prompt([
          {
            name: "title",
            message: "What's their title?",
          },
          {
            name: "salary",
            message: "How much does this title make?",
          },
          {
            type: "list",
            name: "department_id",
            message: "What department does this title belong to?",
            choices: departmentChoices,
          },
        ])
        .then((role) => {
          db.createRole(role)
            .then(() => console.log(`Added ${role.title} to the databse`))
            .then(() => runPrompts());
        });
    });
    console.log(10);
}

function removeRole() {
    db.findAllRoles().then(([rows]) => {
      let roles = rows;
      const roleChoices = roles.map(({ id, title }) => ({
        name: title,
        value: id,
      }));
  
      inquirer
        .prompt([
          {
            type: "list",
            name: "roleId",
            message:
              "The Boss giveth and taketh away. So what role are we geting rid of? (Warning: This will also remove the employees)",
            choices: roleChoices,
          },
        ])
        .then((res) => db.removeRole(res.roleId))
        .then(() => console.log("Goodbye role"))
        .then(() => runPrompts());
    });
    console.log(11);
}

function viewDepartments() {
    db.findAllDepartments()
      .then(([rows]) => {
        let departments = rows;
        console.log("\n");
        console.table(departments);
      })
      .then(() => runPrompts());
    console.log(12);
}

function addDepartment() {
    inquirer
      .prompt([
        {
          name: "name",
          message: "So we're expanding huh? What's the new department?",
        },
      ])
      .then((res) => {
        let name = res;
        db.createDepartment(name)
          .then(() => console.log(`Added${name.name} to the database`))
          .then(() => runPrompts());
      });
    console.log(13);
}