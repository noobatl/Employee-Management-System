INSERT INTO department (dept_name)
VALUES ('Sales'), ('Engineering'), ('Finance'), ('Legal');

INSERT INTO role (title, salary, department_id)
VALUES ('Sales Lead', 100000, 1),
       ('Salesperson', 80000, 1),
       ('Lead Engineer', 150000, 2),
       ('Software Engineer', 120000, 2),
       ('Accountant', 125000, 3),
       ('Legal Team Lead', 250000, 4),
       ('Lawyer', '190000', 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Natasha', 'Romanova', 1, 0),
       ('Clint', 'Barton', 2, 1),
       ('Tony', 'Stark', 3, 0),
       ('Peter', 'Parker', 4, 3),
       ('Bruce', 'Banner', 5, 0),
       ('Stephen', 'Strange', 5, 0),
       ('Steve', 'Rogers', 6, 0),
       ('James', 'Buchanan', 7, 7);

SELECT * FROM department;
SELECT * FROM role;
SELECT * FROM employee;
