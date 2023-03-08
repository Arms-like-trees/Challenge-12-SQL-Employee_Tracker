const mysql = require('mysql2');
const inquirer = require('inquirer');
require('dotenv').config();
//const express = require('express');
const figlet = require('figlet');
const { response } = require('express');
//const PORT = process.env.PORT || 3001;
//const app = express();

// create the connection to database
const db = mysql.createConnection({
    host: 'localhost',
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});
db.connect(function (err) {
    console.log(err)
});



//const cTable = require('console.table');


// The header image once intialized
function init() {
    figlet('Empl. Database', async function (err, data) {
        if (err) {
            console.log('Error making header', err);
        } else {
            console.log(data)
            start()
        }
    })
};

function start() {
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
                    addRole();
                    break;

                case 'Add an employee':
                    addEmployee();
                    break;

                case 'Update employee role':
                    break;

                case 'Delete employee':
                    break;

                case 'Quit':
                    process.exit();
                    break
            }
        })
    // take the choice
    // to select other function to make dateabase quereis
    // then console.table()
}



init();





// what will be other question needto add for the other selections

// View All departments

function viewDepartments() {
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

function viewRoles() {
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

function viewEmployees() {
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
            name: 'departmentName',
            type: 'input',
            message: 'What is the name of the department?'
        }
    ]
    ).then((addDept) => {
        db.query(`INSERT INTO departments(department_names) VALUES ('${addDept.departmentName}')`, function (err, results) {
            if (err) {
                console.error(err)
            } else {
                console.table(results);
                console.log(`${addDept.departmentName} was successsfully added to the database.`)
                start();
            }
        })
        
    })
};



//ADD Role

function addRole() {

    // To create the array of choices from current department list
    let departmentsList = [];
    db.query(`SELECT * FROM departments`,
        function (err, results) {
            if (err) {
                console.error(err)
            } else {
                for (let i in results)
                    departmentsList.push({
                        name: results[i].department_names,
                        value: results[i].department_id,
                    });


                    //start of the question related to adding new role
                inquirer.prompt([
                    {
                        name: 'roleName',
                        type: 'input',
                        message: 'What is the name of the new role?'
                    },
                    {
                        name: 'roleSalary',
                        type: 'number',
                        message: 'What is the salaray of the new role?'
                    },
                    {
                        name: 'roleDepartment',
                        type: 'list',
                        message: 'What department does this role need to be added to?',
                        choices: departmentsList
                    }
                ])
                    .then((response) => {
                        db.query(`INSERT INTO roles(role_title, role_salary, department_id) VALUES ('${response.roleName}', '${response.roleSalary}', '${response.roleDepartment}')`,
                        function(err, results){
                            if(err){
                                console.error(err)
                            } else {
                                console.table(results);
                                console.log(`${response.roleName} was added`)
                                start();
                            }
                        })
                        
                    })
            }
        }
    )
};


//  Add employee

function addEmployee(){

    // for the selection of what role they are to have and who there manager is
    const managersList = ['NULL'];
    const rolesList =[];

    db.query(`SELECT * FROM employees`, function (err, results) {
        if (err) {
            console.log('from manager array list');
            console.error(err);
        } else {
            for (const result of results) {
                managersList.push({
                    name: `${result.first_names} ${result.last_names}`,
                    value: result.employee_id
                });
                
                console.log(managersList);
            }

            db.query(`SELECT role_id, role_title FROM roles`, function (err, results) {
                if (err) {
                    console.log('from role array list');
                    console.error(err);
                } else {
                    for (const result of results) {
                        rolesList.push({
                            name:result.role_title,
                            value: result.role_id
                        });
                    }
                    inquirer.prompt([
                        {
                            type: 'input',
                            name:'first_name',
                            message: 'What is the employee\'s first name?'
                        },
                        {
                            type: 'input',
                            name: 'last_name',
                            message: 'What is the employee\'s last name?'
                        },
                        {
                            type: 'list',
                            name: 'jobTitle',
                            message: 'What is the employee\'s job?',
                            choices: rolesList
                        },
                        {
                            type: "list",
                            name: 'manager',
                            message: 'Who is the employee\'s manager?',
                            choices: managersList
                        }
                    ])
                    .then((response) => {
                        db.query(`INSERT INTO employees(first_names, last_names, role_id, manager_id) VALUES ('${response.first_name}', '${response.last_name}', '${response.jobTitle}', '${response.manager}')`, 
                        function (err, results) {
                            if (err) {
                                console.error(err);
                                console.log('Employee not added');
                            } else {console.table(results);
                                console.log(`${response.first_name} ${response.last_name} was added.`);
                                start();
                        }
                        })
                    })
                }
            })
        }
    })
}