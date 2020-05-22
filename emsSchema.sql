-- Drops the task_saver_db if it already exists --
DROP DATABASE IF EXISTS employeeDB;

-- Create the database task_saver_db and specified it for use.
CREATE DATABASE employeeDB;

USE employeeDB;

-- Create the table tasks.
-- * **department**:

CREATE TABLE department(
  --   * **id** - INT PRIMARY KEY
  id INT NOT NULL AUTO_INCREMENT,
  --   * **name** - VARCHAR(30) to hold department name
  name VARCHAR(30),
  PRIMARY KEY (id)
);


-- * **role**:
CREATE TABLE role(
  --   * **id** - INT PRIMARY KEY
  id INT NOT NULL AUTO_INCREMENT,
  --   * **title** -  VARCHAR(30) to hold role title
  title VARCHAR(30),
  --   * **salary** -  DECIMAL to hold role salary
  salary DECIMAL(10,2),
  --   * **department_id** -  INT to hold reference to department role belongs to
  department_id INT,
  PRIMARY KEY (id)
);

-- * **employee**:
CREATE TABLE emmployee(
  --   * **id** - INT PRIMARY KEY
  id INT NOT NULL AUTO_INCREMENT,
  --   * **first_name** - VARCHAR(30) to hold employee first name
  first_name VARCHAR(30),
  --   * **last_name** - VARCHAR(30) to hold employee last name
  last_name VARCHAR(30),
  --   * **role_id** - INT to hold reference to role employee has
  role_id INT,
  --   * **manager_id** - INT to hold reference to another employee that manager of the current employee. This field may be null if the employee has no manager
  manager_id INT NULL,
  PRIMARY KEY (id)
);