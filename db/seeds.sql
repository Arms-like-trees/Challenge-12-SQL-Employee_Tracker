INSERT INTO departments(department_names)
VALUES ('Sales'),
('Engineering'),
('Finance'),
('Legal');


INSERT INTO roles(role_title, role_salary, department_id)
VALUES ('Sales Lead', 109999, 1),
('Salesperson', 59999, 1),
('Lead Engineer', 179999, 2),
('Software Engineer', 99999, 2),
('Account Manager', 159999, 3),
('Accountant', 124999, 3),
('Legal Team Lead', 229999, 4),
('Lawyer', 199999, 4);

INSERT INTO employees(first_names, last_names, role_id, manager_id)
VALUES ('Jon', 'Smith', 1, NULL),
('Greg', 'Nayr', 2, 1),
('Caleb', 'Whitson', 3, NULL),
('Jason', 'Adams', 7, NULL),
('Big', 'Stout', 4, 3),
('Little', 'Sout', 8, 4),
('Big', 'Wusy', 5, NULL),
('Chris', 'Mcfly', 6, 7);
