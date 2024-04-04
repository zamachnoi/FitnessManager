import type { ColumnType } from "kysely";

export type Generated<T> = T extends ColumnType<infer S, infer I, infer U>
  ? ColumnType<S, I | undefined, U>
  : ColumnType<T, T | undefined, T>;

export type Timestamp = ColumnType<Date, Date | string, Date | string>;

export type UserBookingType = "Class" | "Trainer";

export type UserType = "Admin" | "Member" | "Trainer";

export interface Admins {
  admin_id: number;
}

export interface Classes {
  class_id: Generated<number>;
  class_time: Timestamp | null;
  name: string | null;
  price: number | null;
  room_id: number | null;
  trainer_booking_id: number | null;
  trainer_id: number | null;
}

export interface Equipment {
  equipment_id: Generated<number>;
  equipment_type_id: number | null;
  last_maintained: Timestamp | null;
  name: string | null;
  under_maintenance: boolean | null;
}

export interface EquipmentType {
  equipment_type_id: Generated<number>;
  name: string | null;
}

export interface ExerciseRoutines {
  name: string | null;
  routine_id: Generated<number>;
}

export interface Exercises {
  description: string | null;
  equipment_type_id: number | null;
  exercise_id: Generated<number>;
  name: string | null;
  type: string | null;
}

export interface MemberBookings {
  booking_timestamp: Timestamp | null;
  member_booking_id: Generated<number>;
  member_id: number | null;
  type: UserBookingType;
}

export interface MemberClassBooking {
  class_id: number | null;
  member_class_booking_id: number;
  member_id: number | null;
}

export interface MemberExerciseRoutines {
  member_id: number;
  routine_id: number;
}

export interface MemberGoals {
  achieved_date: Timestamp | null;
  deleted: Generated<boolean | null>;
  goal_id: Generated<number>;
  goal_start: Timestamp | null;
  member_id: number | null;
  weight_goal: number | null;
}

export interface MemberHealthStatistics {
  diastolic_bp: number | null;
  heart_rate: number | null;
  member_id: number | null;
  recorded: Timestamp | null;
  stat_id: Generated<number>;
  systolic_bp: number | null;
}

export interface Members {
  member_id: number;
  weight: number | null;
}

export interface MemberTrainerBooking {
  member_booking_id: number;
  member_id: number | null;
  trainer_booking_id: number | null;
  trainer_id: number | null;
}

export interface Payments {
  amount_paid: number | null;
  booking_id: number | null;
  date_paid: Timestamp | null;
  member_id: number | null;
  payment_id: Generated<number>;
  processed: Generated<boolean | null>;
}

export interface RoomBookings {
  booking_id: Generated<number>;
  class_id: number | null;
  class_time: Timestamp | null;
  room_id: number;
}

export interface Rooms {
  name: string | null;
  room_id: Generated<number>;
  room_number: number | null;
}

export interface RoutineExercises {
  exercise_id: number;
  routine_id: number;
}

export interface TrainerBooking {
  trainer_booking_id: Generated<number>;
  trainer_booking_timestamp: Timestamp | null;
  trainer_id: number | null;
}

export interface Trainers {
  end_availability: string | null;
  rate: number | null;
  start_availability: string | null;
  trainer_id: number;
}

export interface Users {
  first_name: string | null;
  last_name: string | null;
  password: string | null;
  type: UserType;
  user_id: Generated<number>;
  username: string | null;
}

export interface DB {
  admins: Admins;
  classes: Classes;
  equipment: Equipment;
  equipment_type: EquipmentType;
  exercise_routines: ExerciseRoutines;
  exercises: Exercises;
  member_bookings: MemberBookings;
  member_class_booking: MemberClassBooking;
  member_exercise_routines: MemberExerciseRoutines;
  member_goals: MemberGoals;
  member_health_statistics: MemberHealthStatistics;
  member_trainer_booking: MemberTrainerBooking;
  members: Members;
  payments: Payments;
  room_bookings: RoomBookings;
  rooms: Rooms;
  routine_exercises: RoutineExercises;
  trainer_booking: TrainerBooking;
  trainers: Trainers;
  users: Users;
}
