CREATE DATABASE clients;


CREATE TABLE clients_register(
    id INTEGER PRIMARY KEY NOT NULL,
    name VARCHAR(150) NOT NULL,
    age INTEGER NOT NULL CHECK (age >= 18 AND age <= 99),
    income DECIMAL(10, 2) NOT NULL,
    location VARCHAR(150) NOT NULL
);
