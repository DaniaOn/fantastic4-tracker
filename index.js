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






