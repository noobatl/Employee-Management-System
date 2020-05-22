const mysql = require('mysql');
const inquirer = require('inquirer');

const questions = {
    type: 'list',
    name: 'questions',
    message: 'What would you like to do?',
    choices: [
        'Add Department',
        'Add Roles',
        'Add Employees',
        'View Department',
        'View Roles',
        'View Employees',
        'Update Departments',
        'Update Roles',
        'Update Employees',
        'Remove Departments',
        'Remove Roles',
        'Remove Employees',
        'Exit'
    ]
};

