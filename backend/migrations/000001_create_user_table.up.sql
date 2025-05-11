CREATE EXTENSION IF NOT EXISTS "uuid-ossp";  

CREATE TABLE users (  
    id  UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    username VARCHAR(100) NOT NULL,  
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,  
    password VARCHAR(255) NOT NULL,  
    avatar VARCHAR(255),
    phone_number VARCHAR(20),
    created_at BIGINT NOT NULL,  
    updated_at BIGINT NOT NULL  
);  