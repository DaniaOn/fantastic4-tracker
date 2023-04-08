// Dependencies for configuration
const inquirer = require('inquirer');
const mysql = require('mysql');
const logo = require('asciiart-logo');
const cTable = require('console.table');

// configuration for connection SQL
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'employees_db'
});

