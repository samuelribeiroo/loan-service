CREATE DATABASE clients;

CREATE EXTENSION IF NOT EXISTS  "uuid-ossp";

CREATE TABLE clients_register(
    id UUID PRIMARY KEY DEFAULT uui_generate_v4(),
    name VARCHAR(150) NOT NULL,
    age INTEGER NOT NULL CHECK (age >= 18 AND age <= 99),
    cpf VARCHAR(14) NOT NULL,
    income DECIMAL(10, 2) NOT NULL,
    location VARCHAR(150) NOT NULL
);
