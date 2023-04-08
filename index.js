// Dependencies for configuration
const inquirer = require('inquirer');
const mysql = require('mysql');
const logo = require('asciiart-logo');
const cTable = require('console.table');

var manager = [];
var role = [];
var employee = [];


// configuration for connection SQL
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'employees_db'
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

const roleReview = `SELECT id, employee.first_name, employee.last_name, title, salary, department.role, manager.manager FROM employee JOIN role ON employee.role_id = role.role_id JOIN department ON role.department_id = department.department_id LEFT JOIN manager on employee.manager_id = manager.manager_id`;

const init = () =>{
    addEmployee();
    addRole()
    addManager
}





