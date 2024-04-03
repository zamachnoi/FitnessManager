DROP TABLE IF EXISTS member_trainer_booking CASCADE;
DROP TABLE IF EXISTS member_class_booking CASCADE;
DROP TABLE IF EXISTS room_bookings CASCADE;
DROP TABLE IF EXISTS member_goals CASCADE;
DROP TABLE IF EXISTS member_health_statistics CASCADE;
DROP TABLE IF EXISTS member_exercise_routines CASCADE;
DROP TABLE IF EXISTS routine_exercises CASCADE;
DROP TABLE IF EXISTS exercises CASCADE;
DROP TABLE IF EXISTS exercise_routines CASCADE;
DROP TABLE IF EXISTS classes CASCADE;
DROP TABLE IF EXISTS equipment CASCADE;
DROP TABLE IF EXISTS payments CASCADE;
DROP TABLE IF EXISTS equipment_type CASCADE;
DROP TABLE IF EXISTS trainer_booking CASCADE;
DROP TABLE IF EXISTS trainers CASCADE;
DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS admins CASCADE;
DROP TABLE IF EXISTS room CASCADE;
DROP TABLE IF EXISTS members CASCADE;
DROP TABLE IF EXISTS member_bookings CASCADE;
DROP TABLE IF EXISTS payment CASCADE;
DROP TABLE IF EXISTS member_booking CASCADE;

DROP TYPE IF EXISTS USER_TYPE;

CREATE TYPE USER_TYPE AS ENUM ('Member', 'Trainer', 'Admin');

-- Creating Users table
CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    last_name TEXT,
    first_name TEXT,
    username TEXT UNIQUE,
    password TEXT,
    type USER_TYPE CHECK (type IN ('Member', 'Trainer', 'Admin')) NOT NULL
);

-- Creating Trainers table
CREATE TABLE trainers (
    trainer_id INT PRIMARY KEY REFERENCES users(user_id),
    start_availability TIME,
    end_availability TIME,
    rate FLOAT
);

-- Creating Members table
CREATE TABLE members (
    member_id INT PRIMARY KEY REFERENCES users(user_id),
    weight FLOAT
);

CREATE TABLE admins (
    admin_id INT PRIMARY KEY REFERENCES users(user_id)
);


-- Creating Room table
CREATE TABLE room (
    room_id SERIAL PRIMARY KEY,
    name TEXT,
    open_time TIME,
    close_time TIME
);

-- Creating Trainer Availability table
-- NO END TIME, always for 1 hour.
CREATE TABLE trainer_booking (
    trainer_booking_id SERIAL PRIMARY KEY,
    trainer_id INT REFERENCES trainers(trainer_id),
    trainer_booking_timestamp TIMESTAMPTZ
);

-- Creating Equipment Type table
CREATE TABLE equipment_type (
    equipment_type_id SERIAL PRIMARY KEY,
    name TEXT
);


-- Creating Equipment table
CREATE TABLE equipment (
    equipment_id SERIAL PRIMARY KEY,
    name TEXT,
    equipment_type_id INT REFERENCES equipment_type(equipment_type_id),
    under_maintenance BOOLEAN
);



-- Creating Classes table
CREATE TABLE classes (
    class_id SERIAL PRIMARY KEY,
    name TEXT,
    trainer_id INT REFERENCES trainers(trainer_id),
    room_id INT REFERENCES room(room_id),
    trainer_booking_id INT REFERENCES trainer_booking(trainer_booking_id),
    price FLOAT
);

-- Create Bookings Table
CREATE TABLE member_bookings (
    member_booking_id SERIAL PRIMARY KEY,
    member_id INT REFERENCES members(member_id),
    booking_timestamp TIMESTAMPTZ
);

-- Creating Room Bookings table
CREATE TABLE room_bookings (
    booking_id SERIAL PRIMARY KEY,
    room_id INT REFERENCES room(room_id),
    class_time TIMESTAMPTZ,
    class_id INT REFERENCES classes(class_id)
);

-- Creating Member Class Booking table
CREATE TABLE member_class_booking (
    member_class_booking_id INT PRIMARY KEY REFERENCES member_bookings(member_booking_id),
    member_id INT REFERENCES members(member_id),
    class_id INT REFERENCES classes(class_id)
);

-- Creating exercise_routines table
CREATE TABLE exercise_routines (
    routine_id SERIAL PRIMARY KEY,
    name TEXT
);

-- Creating Exercises table
CREATE TABLE exercises (
    exercise_id SERIAL PRIMARY KEY,
    name TEXT,
    type TEXT,
    description TEXT,
    equipment_id INT REFERENCES equipment_type(equipment_type_id)
);

-- Creating Routine Exercises table
CREATE TABLE routine_exercises (
    routine_id INT REFERENCES exercise_routines(routine_id),
    exercise_id INT REFERENCES exercises(exercise_id),
    PRIMARY KEY (routine_id, exercise_id)
);

-- Creating Member exercise_routines table
CREATE TABLE member_exercise_routines (
    member_id INT REFERENCES members(member_id),
    routine_id INT REFERENCES exercise_routines(routine_id),
    PRIMARY KEY (member_id, routine_id) 
);

-- Creating Member Goals table
CREATE TABLE member_goals (
    goal_id SERIAL PRIMARY KEY,
    member_id INT REFERENCES members(member_id),
    weight_goal FLOAT,
    goal_start DATE,
    achieved_date DATE,
    deleted BOOLEAN DEFAULT FALSE
);

-- Creating Member Health Statistics table
CREATE TABLE member_health_statistics (
    stat_id SERIAL PRIMARY KEY,
    member_id INT REFERENCES members(member_id),
    systolic_bp FLOAT,
    diastolic_bp FLOAT,
    heart_rate FLOAT,    
    recorded TIMESTAMPTZ
);

-- Creating Member Trainer BOOKING
CREATE TABLE member_trainer_booking (
    member_booking_id INT REFERENCES member_bookings(member_booking_id),
    trainer_booking_id INT REFERENCES trainer_booking(trainer_booking_id),
    PRIMARY KEY (member_booking_id, trainer_booking_id),
    member_id INT REFERENCES members(member_id),
    trainer_id INT REFERENCES trainers(trainer_id)
);


-- Creating Payment History table
CREATE TABLE payments (
    payment_id SERIAL PRIMARY KEY,
    member_id INT REFERENCES members(member_id),
    booking_id INT REFERENCES member_bookings(member_booking_id),
    date_paid DATE,
    amount_paid FLOAT,
    processed BOOLEAN DEFAULT FALSE
);
