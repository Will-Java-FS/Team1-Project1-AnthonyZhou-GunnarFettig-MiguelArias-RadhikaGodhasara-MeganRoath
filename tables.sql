-- Drop existing tables to avoid conflicts during creation
DROP TABLE IF EXISTS bookings CASCADE;
DROP TABLE IF EXISTS properties CASCADE;
DROP TABLE IF EXISTS renters CASCADE;
DROP TABLE IF EXISTS owners CASCADE;
DROP TABLE IF EXISTS users CASCADE;

-- Create Users table
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    first_name VARCHAR(50),
    last_name VARCHAR(50)
);

-- Create Renters table
CREATE TABLE renters (
    id SERIAL PRIMARY KEY,
    user_id INTEGER UNIQUE NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Create Owners table
CREATE TABLE owners (
    id SERIAL PRIMARY KEY,
    user_id INTEGER UNIQUE NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Create Properties table
CREATE TABLE properties (
    id SERIAL PRIMARY KEY,
    owner_id INTEGER NOT NULL,
    title VARCHAR(100) NOT NULL,
    description TEXT,
    max_guests INTEGER NOT NULL,
    location VARCHAR(255),
    FOREIGN KEY (owner_id) REFERENCES owners(id) ON DELETE CASCADE
);

-- Create Bookings table
CREATE TABLE bookings (
    id SERIAL PRIMARY KEY,
    property_id INTEGER NOT NULL,
    renter_id INTEGER NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    status VARCHAR(20) CHECK (status IN ('pending', 'confirmed', 'canceled')) NOT NULL,
    FOREIGN KEY (property_id) REFERENCES properties(id) ON DELETE CASCADE,
    FOREIGN KEY (renter_id) REFERENCES renters(id) ON DELETE CASCADE
);
