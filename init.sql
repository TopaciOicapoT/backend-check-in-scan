-- Crea tabla productos al iniciar, la variable estatus se usa coo true o false, siendo 0 false y 1 true
CREATE TABLE my_database.products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255),
    description VARCHAR(255),
    status INT DEFAULT 1,
    createdAt TIMESTAMP DEFAULT NOW()
);