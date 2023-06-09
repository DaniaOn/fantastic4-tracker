// Dependencies for configuration
const inquirer = require('inquirer');
const mysql = require('mysql');
const cTable = require('console.table');

var manager = [];
var role = [];
var employee = [];


// configuration for connection SQL
const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'Dani1996',
    database: 'employees_db'
});

// Initiate MySQL Connection
connection.connect(function(err) {
    if (err) {
        console.error("connection error: " + err.stack);
        return;
    }
    console.log("connected as id " + connection.threadId);
});

const addManager = () => {
    connection.query(`SELECT manager, manager_id FROM manage`, (err, res) =>{
        if (err) throw err;
        manager = [];
        for (let i = 0 ; i < res.length; i++){
            const manager = res[i].manager;
            const manager_id = res[i].manager_id;
            var nwManager = {
                name: manager,
                value: manager_id
            }
            manager.push(nwManager);
    }
    return manager;
    });
};
// getting employees
const addRole = () => {
    connection.query(`SELECT title, role_id FROM role`, (err, res) =>{
        if (err) throw err;
        employee = [];
        for (let i = 0 ; i < res.length; i++){
            const id = res[i].role_id
            const title= res[i].title;
            var nwRole = {
                name: title,
                value: id
            }
            role.push(nwRole);
    }
    return role;
    });
};
// getting employees
const addEmployee = () => {
    connection.query(`SELECT first_name, last_name, id FROM employee`, (err, res) =>{
        if (err) throw err;
        employee = [];
        for (let i = 0 ; i < res.length; i++){
            const firstName = res[i].first_name
            const lastName= res[i].last_name;
            var nwEmployee = {
                name: firstName.concat("",lastName),
                value: id
            }
            employee.push(nwEmployee);
    }
    return employee;
    });
};

const init = () =>{
    addEmployee();
    addRole();
    addManager();
  inquirer .prompt({
    name:"init",
    type: "options",
    message: "What would you like to do?",
    choices:[
    'View All Employees',
    'View All Departments',
    'View All Roles',
    'View All Employees by Department',
    'Add a Department',
    'Add a Role',
    'Add an Employee',
    'Update an Employee Role',
  ],
})  
// Call function for selected action
    .then((answer) => {
        if (answer.startMenu === 'View All Employees') {
            viewAllEmployees();
        } else if (answer.startMenu === 'View All Departments') {
            viewAllDepartments();
        } else if (answer.startMenu === 'View All Roles') {
            viewAllRoles()
        } else if (answer.startMenu === 'Add Department') {
            addDepartment();
        } else if (answer.startMenu === 'Add Role') {
            addRole()
        } else if (answer.startMenu === 'Add Employee') {
            addEmployee();
        } else if (answer.startMenu === 'Update Employee Role') {
            updateEmployeeRole();
        } else if (answer.startMenu === 'Exit') {
            connection.end();
        }
    });

};
//Viewing all employees and their info
function viewAllEmployees() {
    var query = "SELECT * FROM employee";
    connection.query(query, function(err, res) {
        if (err) throw err;
        console.table(res);
    });
    Run();
}
//Viewing all departments and it's info 
function viewAllDepartments() {
    var query = "SELECT * FROM department";
    connection.query(query, function(err, res) {
        if (err) throw err;
        console.table(res);
    });
    Run();
}
//Viewing all roles and it's info

function viewAllRoles() {
    var query = "SELECT * FROM role";
    connection.query(query, function(err, res) {
        if (err) throw err;
        console.table(res);
    });
    Run();
}
// function to enter a new department
function addDepartment(){
    inquirer.prompt({
        name: "department_name",
        type: "input",
        message: "Please enter name of the department to be added"
    },
    ).then(function(answer) {
        let query = "INSERT INTO department (department_name) VALUES (?)";
        connection.query(query, [answer.department_name], function(err, res) {
            if (err) throw err;
            console.table(res);
        })
        Run();
    })
}

// function to enter a new role
function addRole(){
    inquirer.prompt([
        {
            name: "title",
            type: "input",
            message: "Please enter the name of the new role title"
        },
        {
            name: "department_name",
            type: "input",
            message: "Please enter the yearly salary of this role"
        },
        {
            name: "department_name",
            type: "input",
            message: "Please enter the department this new role is under"
        }
    ])

    .then(function(answer) {
        let query = "INSERT INTO role (title, salary, department_id) VALUES (?,?,?)";
        connection.query(query, [answer.title, answer.salary, answer.department_name ], function(err, res) {
            if (err) throw err;
            console.table(res);
        })
        Run();
    })
}
//Calling the addEmployee function to add an employee
function addEmployee() {
    inquirer.prompt(
        [
            {
                name: "first_name",
                type: "input",
                message: "Please enter the employee's first name"
            },
            {
                name: "last_name",
                type: "input",
                message: "Please enter the employee's last name"
            }, 
            {
                name: "roles_id",
                type: "input",
                message: "Enter the employee's role id"
            }, 
            {
                name: "manager_id",
                type: "input",
                message: "Enter your manager's id",
            }, 
        ]
    )
        .then(function(answer) {
            let query = "INSERT INTO role (first_name, last_name, roles_id, manager_id) VALUES (?,?,?,?)";
            connection.query(query, [answer.first_name, answer.last_name, answer.roles_i, answer.manager_id ], function(err, res) {
                if (err) throw err;
                console.table(res);
            })
            Run();
        })
}

//adding employee role
function updateEmployeeRole() {
    inquirer.prompt([
        {
             name: "employeeId",
             type: "input",
             message: "Please enter the employee's ID"
        },     
        {
            name: "roleId",
            type: "input",
            message: "Please enter the employee's new role"
       }
    ])
    .then(function(answer) {
        let query = "UPDATE employee SET roles_id = ? WHERE id =?";
        connection.query(query, [parseInt(answer.employeeID), parseInt(answer.roleID)], function(err, res) {
            if (err) throw err;
            console.table(res);
        })
        Run();
    }) 
}

init();