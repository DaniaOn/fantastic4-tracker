// Dependencies for configuration
const inquirer = require('inquirer');
const mysql = require('mysql');
const logo = require('asciiart-logo');
const cTable = require('console.table');

var manager = [];// line 20
var role = [];
var employee = []; // line 36


// configuration for connection SQL
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'employees_db'
});
// getting manager
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





