const mysql = require("mysql");
const inquirer = require("inquirer");
const logo = require("asciiart-logo");

const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "yourRootPassword",
  database: "employeeDB",
});

console.log(
    logo({
        name: "Employee Manager",
        lineChars: 10,
        padding: 2, 
        margin: 3, 
        borderColor: "white",
        logoColor: "white",
        textColor: "white"
    })
    .emptyLine()
    .render()
);

connection.connect(function (err) {
  if (err) {
    throw error;
  }
  console.log("connected as id " + connection.threadId);
  start();
});

function start() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "initialQuest",
        message: "What would you like to do?",
        choices: [
          //* Add departments, roles, employees
          "Add Department",
          "Add Roles",
          "Add Employees",
          //* View departments, roles, employees
          "View Department",
          "View Roles",
          "View Employees",
          //* Update employee roles
          "Update Roles",
          "Exit",
        ],
      },
    ])
    .then(function (answer) {
      switch (answer.initialQuest) {
        case "Add Department":
          addDepartment();
          break;
        case "Add Roles":
          addRoles();
          break;
        case "Add Employees":
          addEmployees();
          break;
        case "View Department":
          viewDepartment();
          break;
        case "View Roles":
          viewRoles();
          break;
        case "View Employees":
          viewEmployees();
          break;
        case "Update Roles":
          updateRoles();
          break;
        case "Exit":
          connection.end();
          break;
      }
    });
}

function addDepartment() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "addDept",
        message: "What is the name of the department you would like to add?",
      },
    ])
    .then(function (answer) {
      const queryString = "INSERT INTO department SET ?";
      connection.query(queryString, { dept_name: answer.addDept }, function (
        err
      ) {
        if (err) {
          throw error;
        }
        console.log("Department has been added successfully");
        start();
      });
    });
}

function addRoles() {
  let department = [];
  connection.query("SELECT * FROM department", function (err, res) {
    if (err) {
      throw error;
    }
    for (let i = 0; i < res.length; i++) {
      department.push({ name: res[i].dept_name, value: res[i].id });
    }
  });
  inquirer
    .prompt([
      {
        type: "input",
        name: "roleTitle",
        message: "What is the role's title?",
      },
      {
        type: "input",
        name: "roleSalary",
        message: "What is the yearly salary for this role?",
      },
      {
        type: "list",
        name: "deptId",
        message: "In what department does this role belong?",
        choices: department,
      },
    ])
    .then(function (answer) {
      const queryString = "INSERT INTO role SET ?";
      connection.query(
        queryString,
        {
          title: answer.roleTitle,
          salary: answer.roleSalary,
          department_id: answer.deptId,
        },
        function (err) {
          if (err) {
            throw error;
          }
          console.log("Role has been added successfully");
          start();
        }
      );
    });
}

function addEmployees() {
  let role = [];
  connection.query("SELECT * FROM role", function (err, res) {
    if (err) {
      throw error;
    }
    for (let i = 0; i < res.length; i++) {
      role.push({ name: res[i].title, value: res[i].id });
    }
  });
  inquirer
    .prompt([
      {
        type: "input",
        name: "firstName",
        message: "What is the employee's first name?",
      },
      {
        type: "input",
        name: "lastName",
        message: "What is the employee's last name?",
      },
      {
        type: "list",
        name: "roleId",
        message: "What is the employee's role?",
        choices: role,
      },
      {
        type: "input",
        name: "managerId",
        message:
          "If the employee has a manager, what is the manager's ID number?",
        default: "0",
      },
    ])
    .then(function (answer) {
      const queryString = "INSERT INTO employee SET ?";
      connection.query(
        queryString,
        {
          first_name: answer.firstName,
          last_name: answer.lastName,
          role_id: answer.roleId,
          manager_id: answer.managerId,
        },
        function (err) {
          if (err) {
            throw error;
          }
          console.log("Employee has been added successfully");
          start();
        }
      );
    });
}

function viewDepartment() {
  const queryString = "SELECT * FROM department";
  connection.query(queryString, function (err, res) {
    if (err) {
      throw error;
    }
    console.table(res);
    start();
  });
}

function viewRoles() {
  const queryString = "SELECT * FROM role";
  connection.query(queryString, function (err, res) {
    if (err) {
      throw error;
    }
    console.table(res);
    start();
  });
}

function viewEmployees() {
  const queryString = "SELECT * FROM employee";
  connection.query(queryString, function (err, res) {
    if (err) {
      throw error;
    }
    console.table(res);
    start();
  });
}

function updateRoles() {
  let role = [];
  connection.query("SELECT * FROM role", function (err, res) {
    if (err) {
      throw error;
    }
    for (let i = 0; i < res.length; i++) {
      role.push({ name: res[i].title, value: res[i].id });
    }
  });
  connection.query("SELECT first_name, last_name, id FROM employee", function (err, res) {
    if (err) {
      throw error;
    }
    let employee = res.map((employee) => ({
      name: employee.first_name + " " + employee.last_name,
      value: employee.id,
    }));
    inquirer.prompt([
      {
        type: "list",
        name: "employeeName",
        message: "Which employee would you like to role update?",
        choices: employee,
      },
      {
        type: "list",
        name: "newRole",
        message: "What is the employee's new role?",
        choices: role,
      },
    ]).then (function (res) {
        const queryString = "UPDATE role SET ? WHERE ?";
        connection.query(queryString, [{title: res.newRole}, {id: res.employeeName}], function (err) {
            if (err) {
                throw error;
            }
            console.log("Employee Role has been updated successfully")
            start();
        })
    })
  });
}
