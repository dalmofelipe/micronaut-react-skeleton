-- Create Users table
CREATE TABLE TB_USERS (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    role VARCHAR(50) NOT NULL DEFAULT 'USER',
    enabled BOOLEAN NOT NULL DEFAULT TRUE
);

-- Create Books table (já existente no DataLoader, mas garantindo que existe)
CREATE TABLE IF NOT EXISTS TB_BOOKS (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    pages INTEGER NOT NULL
);