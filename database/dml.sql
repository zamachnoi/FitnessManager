INSERT INTO equipment_type (name) VALUES ('Treadmill');
INSERT INTO equipment_type (name) VALUES ('Bench Press');
INSERT INTO equipment_type (name) VALUES ('Squat Rack');
INSERT INTO equipment_type (name) VALUES ('Dumbbell');
INSERT INTO equipment_type (name) VALUES ('Elliptical');
INSERT INTO equipment_type (name) VALUES ('Rowing Machine');

INSERT INTO equipment (name, equipment_type_id, under_maintenance) VALUES ('Treadmill 1', 1, FALSE);
INSERT INTO equipment (name, equipment_type_id, under_maintenance) VALUES ('Treadmill 2', 1, FALSE);
INSERT INTO equipment (name, equipment_type_id, under_maintenance) VALUES ('Bench Press 1', 2, FALSE);
INSERT INTO equipment (name, equipment_type_id, under_maintenance) VALUES ('Bench Press 2', 2, FALSE);
INSERT INTO equipment (name, equipment_type_id, under_maintenance) VALUES ('Squat Rack 1', 3, FALSE);
INSERT INTO equipment (name, equipment_type_id, under_maintenance) VALUES ('Squat Rack 2', 3, FALSE);
INSERT INTO equipment (name, equipment_type_id, under_maintenance) VALUES ('Dumbbell 1', 4, FALSE);
INSERT INTO equipment (name, equipment_type_id, under_maintenance) VALUES ('Dumbbell 2', 4, FALSE);
INSERT INTO equipment (name, equipment_type_id, under_maintenance) VALUES ('Elliptical 1', 5, FALSE);
INSERT INTO equipment (name, equipment_type_id, under_maintenance) VALUES ('Elliptical 2', 5, FALSE);

INSERT INTO exercises (name, type, description, equipment_id) VALUES ('Running', 'Cardio', 'Running on a treadmill', 1);
INSERT INTO exercises (name, type, description, equipment_id) VALUES ('Bench Press', 'Strength', 'Bench Press', 2);
INSERT INTO exercises (name, type, description, equipment_id) VALUES ('Squat', 'Strength', 'Squat', 3);
INSERT INTO exercises (name, type, description, equipment_id) VALUES ('Dumbbell Curl', 'Strength', 'Dumbbell Curl', 4);
INSERT INTO exercises (name, type, description, equipment_id) VALUES ('Elliptical', 'Cardio', 'Elliptical', 5);

INSERT INTO exercise_routines (name) VALUES ('Cardio');
INSERT INTO exercise_routines (name) VALUES ('Strength');

INSERT INTO routine_exercises (routine_id, exercise_id) VALUES (1, 1);
INSERT INTO routine_exercises (routine_id, exercise_id) VALUES (1, 5);
INSERT INTO routine_exercises (routine_id, exercise_id) VALUES (2, 2);
INSERT INTO routine_exercises (routine_id, exercise_id) VALUES (2, 3);
INSERT INTO routine_exercises (routine_id, exercise_id) VALUES (2, 4);







