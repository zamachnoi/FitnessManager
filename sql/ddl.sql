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
DROP TABLE IF EXISTS rooms CASCADE;
DROP TABLE IF EXISTS members CASCADE;
DROP TABLE IF EXISTS member_bookings CASCADE;
DROP TABLE IF EXISTS payment CASCADE;
DROP TABLE IF EXISTS member_booking CASCADE;
DROP TABLE IF EXISTS room CASCADE;
DROP TYPE IF EXISTS USER_TYPE;
DROP TYPE IF EXISTS USER_BOOKING_TYPE;
DROP TYPE IF EXISTS PAYMENT_TYPE;

CREATE TYPE USER_TYPE AS ENUM ('Member', 'Trainer', 'Admin');
CREATE TYPE USER_BOOKING_TYPE AS ENUM ('Class', 'Trainer');
CREATE TYPE PAYMENT_TYPE AS ENUM ('Registration', 'Class', 'Trainer');
-- Creating Users table
CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    last_name TEXT NOT NULL,
    first_name TEXT NOT NULL,
    username TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    type USER_TYPE CHECK (type IN ('Member', 'Trainer', 'Admin')) NOT NULL
);

CREATE INDEX usernameIndex ON users (username);

-- Creating Trainers table
CREATE TABLE trainers (
    trainer_id INT PRIMARY KEY REFERENCES users(user_id) ON DELETE CASCADE,
    start_availability TIME,
    end_availability TIME,
    rate FLOAT
);

-- Creating Members table
CREATE TABLE members (
    member_id INT PRIMARY KEY REFERENCES users(user_id) ON DELETE CASCADE,
    weight FLOAT
);

CREATE TABLE admins (
    admin_id INT PRIMARY KEY REFERENCES users(user_id) ON DELETE CASCADE
);


-- Creating Room table
CREATE TABLE rooms (
    room_id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    room_number INT UNIQUE NOT NULL
);

-- Creating Trainer Availability table
-- NO END TIME, always for 1 hour.
CREATE TABLE trainer_booking (
    trainer_booking_id SERIAL PRIMARY KEY,
    trainer_id INT REFERENCES trainers(trainer_id) NOT NULL,
    trainer_booking_timestamp TIMESTAMPTZ NOT NULL
);

-- Creating Equipment Type table
CREATE TABLE equipment_type (
    equipment_type_id SERIAL PRIMARY KEY,
    name TEXT NOT NULL
);


-- Creating Equipment table
CREATE TABLE equipment (
    equipment_id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    equipment_type_id INT REFERENCES equipment_type(equipment_type_id) NOT NULL,
    under_maintenance BOOLEAN NOT NULL,
    last_maintained TIMESTAMPTZ NOT NULL
);

-- Creating Classes table
CREATE TABLE classes (
    class_id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    trainer_id INT REFERENCES trainers(trainer_id) NOT NULL,
    room_id INT REFERENCES rooms(room_id) NOT NULL,
    trainer_booking_id INT REFERENCES trainer_booking(trainer_booking_id) ON DELETE CASCADE NOT NULL,
    price FLOAT NOT NULL,
    class_time TIMESTAMPTZ NOT NULL
);

CREATE INDEX classTimeIndex ON classes (class_time);
CREATE INDEX roomIdIndex ON classes (room_id);

-- Create Bookings Table
CREATE TABLE member_bookings (
    member_booking_id SERIAL PRIMARY KEY,
    member_id INT REFERENCES members(member_id) NOT NULL,
    booking_timestamp TIMESTAMPTZ NOT NULL,
    type USER_BOOKING_TYPE CHECK (type IN ('Trainer', 'Class')) NOT NULL
);

CREATE INDEX memberBookingMemberIdIndex ON member_bookings (member_id);

-- Creating Room Bookings table
CREATE TABLE room_bookings (
    booking_id SERIAL PRIMARY KEY,
    room_id INT REFERENCES rooms(room_id) NOT NULL,
    class_time TIMESTAMPTZ NOT NULL,
    class_id INT REFERENCES classes(class_id) ON DELETE CASCADE NOT NULL
);

CREATE INDEX roomBookingClassIdIndex ON room_bookings (class_id);

-- Creating Member Class Booking table
CREATE TABLE member_class_booking (
    member_class_booking_id INT PRIMARY KEY REFERENCES member_bookings(member_booking_id) ON DELETE CASCADE NOT NULL,
    member_id INT REFERENCES members(member_id) NOT NULL,
    class_id INT REFERENCES classes(class_id) ON DELETE CASCADE NOT NULL
);

CREATE INDEX memberBookingClassIdIndex ON member_class_booking (class_id);

-- Creating exercise_routines table
CREATE TABLE exercise_routines (
    routine_id SERIAL PRIMARY KEY,
    name TEXT NOT NULL
);

-- Creating Exercises table
CREATE TABLE exercises (
    exercise_id SERIAL PRIMARY KEY,
    name TEXT UNIQUE NOT NULL,
    type TEXT NOT NULL,
    description TEXT NOT NULL,
    equipment_type_id INT REFERENCES equipment_type(equipment_type_id) NOT NULL
);

-- Creating Routine Exercises table
CREATE TABLE routine_exercises (
    routine_id INT REFERENCES exercise_routines(routine_id) ON DELETE CASCADE,
    exercise_id INT REFERENCES exercises(exercise_id),
    PRIMARY KEY (routine_id, exercise_id)
);

-- Creating Member exercise_routines table
CREATE TABLE member_exercise_routines (
    member_id INT REFERENCES members(member_id) NOT NULL,
    routine_id INT REFERENCES exercise_routines(routine_id) NOT NULL,
    PRIMARY KEY (member_id, routine_id)
);

-- Creating Member Goals table
CREATE TABLE member_goals (
    goal_id SERIAL PRIMARY KEY,
    member_id INT REFERENCES members(member_id) NOT NULL,
    weight_goal FLOAT NOT NULL,
    goal_start DATE NOT NULL,
    goal_end DATE NOT NULL,
    achieved_date DATE,
    deleted BOOLEAN DEFAULT FALSE NOT NULL
);

-- Creating Member Health Statistics table
CREATE TABLE member_health_statistics (
    stat_id SERIAL PRIMARY KEY,
    member_id INT REFERENCES members(member_id) NOT NULL,
    systolic_bp FLOAT NOT NULL,
    diastolic_bp FLOAT NOT NULL,
    heart_rate FLOAT NOT NULL,    
    recorded TIMESTAMPTZ NOT NULL
);

-- Creating Member Trainer BOOKING
CREATE TABLE member_trainer_booking (
    member_booking_id INT REFERENCES member_bookings(member_booking_id) ON DELETE CASCADE,
    trainer_booking_id INT REFERENCES trainer_booking(trainer_booking_id) ON DELETE CASCADE,
    member_id INT REFERENCES members(member_id),
    trainer_id INT REFERENCES trainers(trainer_id),
    PRIMARY KEY (member_booking_id, trainer_booking_id) 
);


-- Creating Payment History table
CREATE TABLE payments (
    payment_id SERIAL PRIMARY KEY,
    member_id INT REFERENCES members(member_id),
    booking_id INT REFERENCES member_bookings(member_booking_id) ON DELETE CASCADE,
    date_paid DATE NOT NULL,
    amount_paid FLOAT NOT NULL,
    payment_type PAYMENT_TYPE CHECK (payment_type IN ('Registration', 'Class', 'Trainer')) NOT NULL,
    processed BOOLEAN DEFAULT FALSE NOT NULL
);
