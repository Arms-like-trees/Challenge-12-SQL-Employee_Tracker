DROP DATABASE IF EXISTS employees_db;
CREATE DATABASE employees_db;

USE employees_db;

CREATE table departments(
    department_id INT AUTO_INCREMENT PRIMARY KEY,
    department_names VARCHAR(200) NOT NULL
);

CREATE table roles(
    role_id INT AUTO_INCREMENT PRIMARY KEY,
    role_title VARCHAR(200) NOT NULL,
    role_salary DECIMAL NOT NULL,
    department_id INT,
    FOREIGN KEY (department_id)
    REFERENCES departments(department_id)
    ON DELETE SET NULL
);

CREATE table employees(
    employee_id INT AUTO_INCREMENT PRIMARY KEY,
    first_names VARCHAR(200) NOT NULL,
    last_names VARCHAR(200) NOT NULL,
    role_id INT,
    FOREIGN KEY (role_id)
    REFERENCES roles(role_id)
    ON DELETE SET NULL,
    manager_id INT DEFAULT NULL,
    FOREIGN KEY (manager_id)
    REFERENCES employees(employee_id)
    ON DELETE SET NULL
);