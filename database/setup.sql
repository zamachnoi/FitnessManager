DROP TABLE IF EXISTS member_training_reservation CASCADE;
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
DROP TABLE IF EXISTS payment_history CASCADE;
DROP TABLE IF EXISTS equipment_type CASCADE;
DROP TABLE IF EXISTS trainer_availability CASCADE;
DROP TABLE IF EXISTS trainers CASCADE;
DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS room CASCADE;
DROP TABLE IF EXISTS members CASCADE;

DROP TYPE IF EXISTS USER_TYPE;

CREATE TYPE USER_TYPE AS ENUM ('Member', 'Trainer', 'Admin');

-- Creating Users table
CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    last_name TEXT,
    first_name TEXT,
    username TEXT UNIQUE,
    password TEXT,
    type USER_TYPE CHECK (type IN ('Member', 'Trainer', 'Admin'))
);

-- Creating Trainers table
CREATE TABLE trainers (
    trainer_id INT PRIMARY KEY REFERENCES users(user_id),
    rate FLOAT
);
-- Creating Members table
CREATE TABLE members (
    member_id INT PRIMARY KEY REFERENCES users(user_id),
    weight FLOAT
);

-- Creating Room table
CREATE TABLE room (
    room_id SERIAL PRIMARY KEY,
    name TEXT,
    open_time TIME,
    close_time TIME
);

-- Creating Trainer Availability table
CREATE TABLE trainer_availability (
    availability_id SERIAL PRIMARY KEY,
    trainer_id INT REFERENCES trainers(trainer_id),
    available_date DATE,
    start_time TIME,
    end_time TIME,
    is_booked BOOLEAN DEFAULT FALSE
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

-- Creating Payment History table
CREATE TABLE payment_history (
    payment_id SERIAL PRIMARY KEY,
    member_id INT REFERENCES members(member_id),
    date_paid DATE,
    amount_paid FLOAT,
    active_until DATE,
    description TEXT
);

-- Creating Classes table
CREATE TABLE classes (
    class_id SERIAL PRIMARY KEY,
    name TEXT,
    trainer_id INT REFERENCES trainers(trainer_id),
    room_id INT REFERENCES room(room_id),
    timeslot_availability_id INT REFERENCES trainer_availability(availability_id),
    price FLOAT
);



-- Creating Room Bookings table
CREATE TABLE room_bookings (
    booking_id SERIAL PRIMARY KEY,
    room_id INT REFERENCES room(room_id),
    start_time TIME,
    end_time TIME,
    class_id INT REFERENCES classes(class_id)
);

-- Creating Member Class Booking table
CREATE TABLE member_class_booking (
    booking_id SERIAL PRIMARY KEY,
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
    description TEXT
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

-- Creating Member Training Reservation table
CREATE TABLE member_training_reservation (
    reservation_id SERIAL PRIMARY KEY,
    member_id INT REFERENCES members(member_id),
    trainer_id INT REFERENCES trainers(trainer_id),
    slot_availability_id INT REFERENCES trainer_availability(availability_id)
);
