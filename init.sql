-- Crea tabla productos al iniciar
CREATE TABLE my_database.products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255),
    description VARCHAR(255),
    status INT DEFAULT 1,
    createdAt TIMESTAMP DEFAULT NOW()
);