INSERT INTO department (name)
VALUES ('Sales'), ('Engineering'), ('Finance'), ('Legal');

INSERT INTO role (title, salary, department_id)
VALUES ('Sales Lead', '100000', '1'),
       ('Salesperson', '80000', '1'),
       ('Lead Engineer', '150000', '2'),
       ('Software Engineer', '120000', '2'),
       ('Accountant', '125000', '3'),
       ('Legal Team Lead', '250000', '4'),
       ('Lawyer', '190000', '4');

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Natasha', 'Romanova', 1, null),
       ('Clint', 'Barton', 2, 1),
       ('Tony', 'Stark', 3, null),
       ('Peter', 'Parker', 4, 3),
       ('Bruce', 'Banner', 5, null),
       ('Stephen', 'Strange', 6, null),
       ('Steve', 'Rogers', 7, null),
       ('James', 'Buchanan', 8, 7);

SELECT * FROM department;
SELECT * FROM role;
SELECT * FROM employee;
