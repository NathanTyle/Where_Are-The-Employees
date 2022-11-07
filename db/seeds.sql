use employees;

INSERT INTO department
    (name)
VALUES
    ('Sales'),
    ('Engineering'),
    ('Finance'),
    ('Legal');
    
INSERT INTO role
    (title, salary, department_id)
VALUES
    ('Head of Sales', 90000, 1),
    ('Sales Member', 75000, 1),
    ('Head Engineering', 150000, 2),
    ('Software Engineer', 100000, 2),
    ('Head of Accounting', 160000, 3),
    ('Accountant', 125000, 3),
    ('Head of the Legal Team', 250000, 4),
    ('Lawyer', 200000, 4);
