const mysql = require('mysql2');
const inquirer = require('inquirer');
require('dotenv').config();
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
  db.connect(function(err){
      console.log(err)
  });
 
  

//const cTable = require('console.table');

function start () {
    inquirer.prompt([
    //Main Menu
    {
        name: 'mainMenu',
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
                viewDepartments();
            break;

        case 'View all Roles':
            viewRoles();
            break;

        case 'View all employees':
            viewEmployees();
            break;

        case 'Add a department':
            addDepartment();
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





// what will be other question needto add for the other selections

// View All departments

function viewDepartments(){
    db.query('SELECT * FROM departments', (err, data) => {
        if (err) {
            console.error(err);
        } else {
            console.table(data);
            start();
        }
    })
};;

// View all Roles

function viewRoles(){
    db.query('SELECT * FROM roles', (err, data) => {
        if (err) {
            console.error(err);
        } else {
            console.table(data);
            start();
        }
    })
};

// View Employees

function viewEmployees(){
    db.query('SELECT * FROM employees', (err, data) => {
        if (err) {
            console.error(err);
        } else {
            console.table(data);
            start();
        }
    })
};

// ADD department

function addDepartment() {
    inquirer.prompt([
        {
            name:'departmentName',
            type: 'input',
            message: 'What is the name of the department?'
        }
    ]
    ).then((addDept) => {
        db.query(`INSERT INTO departments(department_names) VALUES ('${addDept.departmentName}')`, function(err, results){
            if(err){
                console.error(err)
            } else {
                console.table(results);
                console.log(`${addDept.departmentName} was successsfully added to the database.`)
            }
        })
        start();
    })    
};

/*

ADD Role

funciton addRole(){
    inquirer.prompt([
        {
            name: 'roleName',
            type: 'input'
            message: 'What is the name of the new role?'
        },
        {
            name: 'roleSalary',
            type: 'input'.
            message: 'What is the salaray of the new role?'
        },
        {
            name: 'roleDepartment',
            type:
        }
    ])
}

*/