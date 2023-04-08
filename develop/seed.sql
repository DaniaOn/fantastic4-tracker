INSERT INTO employee(first_name, last_name, role_id, manager_id)
VALUES ("Dani", "Escoto", 1, NULL), ("Jordan", "Jones", 2, 1), ("Torre", "Torres", 3, NULL),  ("Walter", "Walker", 1, 2),  ("Anna", "Toves", 4, 3)

INSERT INTO manager(manager)
VALUES ("Dani Escoto"), ("Torre Torres");

SELECT * FROM employee;
SELECT * FROM manager;