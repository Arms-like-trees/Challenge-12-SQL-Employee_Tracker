const mysql = require('mysql2');
const inquirer = require('inquirer');
//const express = require('express');

//const PORT = process.env.PORT || 3001;
//const app = express();

// create the connection to database
const db = mysql.createConnection({
    host: 'localhost',
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
  });
  connection.connect(function(err){
      console.log(err)
  });
 
  

//const cTable = require('console.table');

function start () {
    inquirer
    .prompt([
    //Main Menu
    {
        name:mainMenu,
        type: 'list',
        message: 'What would you like to do?',
        choices: [
            'View all departments',
            'View all Roles',
            'View all employees',
            'Add a department',
            'Add a role',
            'Add an employee',
            'Update employee role',
            'Delete employee',
            'Quit'
        ]
    }
])
.then((answers) => {
    
    // depending on user selection determines which case is used
    switch (answers.mainMenu) {

        case 'View all departments':
            db.query('SELECT * FROM departments', (err, data) => {
                if (err) {
                    console.error(err);
                } else {
                    console.table(data);
                    start();
                }
            })
            break;

        case 'View all Roles':
            db.query('SELECT * FROM roles', (err, data) => {
                if (err) {
                    console.error(err);
                } else {
                    console.table(data);
                    start();
                }
            })
            break;

        case 'View all employees':
            db.query('SELECT * FROM employees', (err, data) => {
                if (err) {
                    console.error(err);
                } else {
                    console.table(data);
                    start();
                }
            })
            break;

        case 'Add a department':
            break;

        case 'Add a role':
            break;

        case 'Add an employee':
            break;

        case 'Update employee role':
            break;

        case 'Delete employee':
            break;

        case 'Quit':
            break
    }
})
// take the choice
// to select other function to make dateabase quereis
// then console.table()
}



start();