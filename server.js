const mysql = require('mysql2');
const inquirer = require('inquirer');
const express = require('express');

const PORT = process.env.PORT || 3001;
const app = express();

const cTable = require('console.table');