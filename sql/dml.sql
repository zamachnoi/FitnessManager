INSERT INTO equipment_type (name) VALUES ('Treadmill');
INSERT INTO equipment_type (name) VALUES ('Bench Press');
INSERT INTO equipment_type (name) VALUES ('Squat Rack');
INSERT INTO equipment_type (name) VALUES ('Dumbbell');
INSERT INTO equipment_type (name) VALUES ('Elliptical');
INSERT INTO equipment_type (name) VALUES ('Rowing Machine');

INSERT INTO equipment (name, equipment_type_id, under_maintenance, last_maintained) VALUES ('Treadmill 1', 1, FALSE, NOW());
INSERT INTO equipment (name, equipment_type_id, under_maintenance, last_maintained) VALUES ('Treadmill 2', 1, FALSE, NOW());
INSERT INTO equipment (name, equipment_type_id, under_maintenance, last_maintained) VALUES ('Bench Press 1', 2, FALSE, NOW());
INSERT INTO equipment (name, equipment_type_id, under_maintenance, last_maintained) VALUES ('Bench Press 2', 2, FALSE, NOW());
INSERT INTO equipment (name, equipment_type_id, under_maintenance, last_maintained) VALUES ('Squat Rack 1', 3, FALSE, NOW());
INSERT INTO equipment (name, equipment_type_id, under_maintenance, last_maintained) VALUES ('Squat Rack 2', 3, FALSE, NOW());
INSERT INTO equipment (name, equipment_type_id, under_maintenance, last_maintained) VALUES ('Dumbbell 1', 4, FALSE, NOW());
INSERT INTO equipment (name, equipment_type_id, under_maintenance, last_maintained) VALUES ('Dumbbell 2', 4, FALSE, NOW());
INSERT INTO equipment (name, equipment_type_id, under_maintenance, last_maintained) VALUES ('Elliptical 1', 5, FALSE, NOW());
INSERT INTO equipment (name, equipment_type_id, under_maintenance, last_maintained) VALUES ('Elliptical 2', 5, FALSE, NOW());

INSERT INTO exercises (name, type, description, equipment_type_id) VALUES ('Running', 'Cardio', 'Running on a treadmill', 1);
INSERT INTO exercises (name, type, description, equipment_type_id) VALUES ('Bench Press', 'Strength', 'Bench Press', 2);
INSERT INTO exercises (name, type, description, equipment_type_id) VALUES ('Squat', 'Strength', 'Squat', 3);
INSERT INTO exercises (name, type, description, equipment_type_id) VALUES ('Dumbbell Curl', 'Strength', 'Dumbbell Curl', 4);
INSERT INTO exercises (name, type, description, equipment_type_id) VALUES ('Elliptical', 'Cardio', 'Elliptical', 5);

INSERT INTO exercise_routines (name) VALUES ('Cardio');
INSERT INTO exercise_routines (name) VALUES ('Strength');

INSERT INTO routine_exercises (routine_id, exercise_id) VALUES (1, 1);
INSERT INTO routine_exercises (routine_id, exercise_id) VALUES (1, 5);
INSERT INTO routine_exercises (routine_id, exercise_id) VALUES (2, 2);
INSERT INTO routine_exercises (routine_id, exercise_id) VALUES (2, 3);
INSERT INTO routine_exercises (routine_id, exercise_id) VALUES (2, 4);


INSERT INTO users (user_id, last_name, first_name, username, password, type) VALUES (1, '1', 'Member', 'm1', '123', 'Member');
INSERT INTO members (member_id, weight) VALUES (1, 300);

INSERT INTO users (user_id, last_name, first_name, username, password, type) VALUES (2, '2', 'Member', 'm2', '123', 'Member');
INSERT INTO members (member_id, weight) VALUES (2, 200);

INSERT INTO users (user_id, last_name, first_name, username, password, type) VALUES (3, '3', 'Member', 'm3', '123', 'Member');
INSERT INTO members (member_id, weight) VALUES (3, 175);

INSERT INTO users (user_id, last_name, first_name, username, password, type) VALUES (4, 'Trainer', '1', 't1', '123', 'Trainer');
INSERT INTO trainers (trainer_id, start_availability, end_availability ,rate) VALUES (4, '00:00:00', '23:59:59', 50);

INSERT INTO users (user_id, last_name, first_name, username, password, type) VALUES (5, 'Trainer', '2', 't2', '123', 'Trainer');
INSERT INTO trainers (trainer_id, start_availability, end_availability ,rate) VALUES (5, '00:00:00', '23:59:59', 60);

INSERT INTO users (user_id, last_name, first_name, username, password, type) VALUES (6, 'Trainer', '3', 't3', '123', 'Trainer');
INSERT INTO trainers (trainer_id, start_availability, end_availability, rate) VALUES (6, '12:00:00', '13:00:00', 70);

INSERT INTO users (user_id, last_name, first_name, username, password, type) VALUES (7, 'Admin', '1', 'a1', '123', 'Admin');
INSERT INTO admins (admin_id) VALUES (7);



INSERT INTO member_bookings (member_id, booking_timestamp, type) VALUES (1, '2024-04-30T16:00:00Z', 'Trainer');
INSERT INTO trainer_booking (trainer_id, trainer_booking_timestamp) VALUES (6, '2024-04-30T16:00:00Z');

INSERT INTO member_trainer_booking (member_booking_id, trainer_booking_id, member_id, trainer_id) VALUES (1, 1, 1, 6);

INSERT INTO payments (member_id, booking_id, date_paid, amount_paid, processed) VALUES (1, 1, '2024-04-01', 70, FALSE);


INSERT INTO member_goals (member_id, weight_goal, goal_start, achieved_date, deleted) VALUES (1, 300, '2024-02-01', '2024-02-29', FALSE);

INSERT INTO member_goals (member_id, weight_goal, goal_start, achieved_date, deleted) VALUES (1, 250, '2024-03-01', NULL, TRUE);

INSERT INTO member_goals (member_id, weight_goal, goal_start, achieved_date, deleted) VALUES (1, 275, '2024-04-01', NULL, FALSE);

INSERT INTO member_health_statistics (member_id, systolic_bp, diastolic_bp, heart_rate, recorded) VALUES (1, 150, 120, 110, '2024-04-01T23:51:23Z');
INSERT INTO member_health_statistics (member_id, systolic_bp, diastolic_bp, heart_rate, recorded) VALUES (1, 145, 110, 90, '2024-04-01T22:12:00Z');

INSERT INTO rooms (name, room_number) VALUES ('test', 101);

INSERT INTO rooms (name, room_number) VALUES ('test2', 102);

INSERT INTO classes(class_id, name, trainer_id, room_id, trainer_booking_id, price, class_time) VALUES (1, 'class1', 5, 1, 3, 50, '2024-04-16T12:12:00Z')
