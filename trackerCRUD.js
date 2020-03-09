const mysql = require("mysql");
const inquirer = require("inquirer");




var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "",
  database: "company_db"
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId + "\n");
  
  start();

});

function start() {
    inquirer.prompt({
        name:"starter",
        type:"list",
        message:"What would you like to do?",
        choices:["View all Employees", 
        "View all Departments",
        "View all Roles",
        "Add an Employee",
        "Add a Department",
        "Add a Role",
        "Update Employee roles",
        "Exit"
    ]
    }).then(function(answer){
        switch(answer.starter){
            case "View all Employees":
                viewEmployees();
                break;
            case "View all Departments":
                viewDepartments();
                break;
            case "View all Roles":
                viewRoles();
                break;
            case "Add an Employee":
                addEmployee();
                break;
            case "Add a Department":
                addDepartment();
                break;
            case "Add a Role":
                addRole();
                break;
            case "Update Employee roles":
                updateRole();
                break;    
            case "Exit":
                connection.end;
                break;
        };
    });
};

function addEmployee() {
    inquirer.prompt([{
      name:"first",
      type:"input",
      message:"What is employees first name"  
    },
    {
        name:"last",
        type:"input",
        message:"What is employees last name"  
      },
      {
        name:"role",
        type:"input",
        message:"What is employees role"  
      },
      {
        name:"manager",
        type:"input",
        message:"Who is the employees manager"  
      },
    ]).then(function(answer){connection.query("INSERT INTO employee SET ?", 
{   
    first_name: answer.first,
    last_name: answer.last, 
    role_id: answer.role,
    manager_id: answer.manager
},
     function(err, res) {
        if (err) throw err;
        start();
    })
  })
}

function addDepartment() {
    inquirer.prompt({
        name:"name",
        type:"input",
        message:"What is the name of the new Department"
    }).then(function(answer){connection.query(`INSERT INTO department (name) VALUE (${answer.name})`),
    function(err, res) {
        if (err) throw err;
        start();
    }
})
}

function addRole() {
    inquirer.prompt([{
      name:"title",
      type:"input",
      message:"What is roles title?"  
    },
    {
        name:"salary",
        type:"input",
        message:"What is the roles salary?"  
      },
      {
        name:"department",
        type:"input",
        message:"What is the department id?"  
      }
    ]).then(function(answer){connection.query("INSERT INTO role SET ?", 
{   
    first_name: answer.title,
    last_name: answer.salary, 
    role_id: answer.department,
},
     function(err, res) {
        if (err) throw err;
        start();
    })
  })
}

function updateRole() {
    inquirer.prompt([{
        name:"employee",
        type:"input",
        message:"What is the ID of the employee whos role you want to update?"
    },
    {
        name:"role",
        type:"input",
        message:"What is the role id of their new role?"
    }
]).then(function(answer){connection.query(`UPDATE employee SET role_id = ${answer.role} WHERE id = ${answer.employee}`, function(err, res) {
        if (err) throw err;
        start();
        })
    })
}

function viewEmployees() {
    console.log("Displaying employees.., \n")
    connection.query("SELECT * FROM employee", function(err, res) {
        if (err) throw err;
        // Log all results of the SELECT statement
        console.table(res);
        start()
    });
};

function viewDepartments() {
    connection.query("SELECT * FROM department", function(err, res) {
        if (err) throw err;
        // Log all results of the SELECT statement
        console.table(res);
        start();
    });
};

function viewRoles() {
    connection.query("SELECT * FROM role", function(err, res) {
        if (err) throw err;
        // Log all results of the SELECT statement
        console.table(res);
        start();
    });
};