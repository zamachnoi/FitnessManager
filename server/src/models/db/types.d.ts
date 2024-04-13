import type { ColumnType } from "kysely";

export type Generated<T> = T extends ColumnType<infer S, infer I, infer U>
  ? ColumnType<S, I | undefined, U>
  : ColumnType<T, T | undefined, T>;

export type PaymentType = "Class" | "Registration" | "Trainer";

export type Timestamp = ColumnType<Date, Date | string, Date | string>;

export type UserBookingType = "Class" | "Trainer";

export type UserType = "Admin" | "Member" | "Trainer";

export interface Admins {
  admin_id: number;
}

export interface Classes {
  class_id: Generated<number>;
  class_time: Timestamp;
  name: string;
  price: number;
  room_id: number;
  trainer_booking_id: number;
  trainer_id: number;
}

export interface Equipment {
  equipment_id: Generated<number>;
  equipment_type_id: number;
  last_maintained: Timestamp;
  name: string;
  under_maintenance: boolean;
}

export interface EquipmentType {
  equipment_type_id: Generated<number>;
  name: string;
}

export interface ExerciseRoutines {
  name: string;
  routine_id: Generated<number>;
}

export interface Exercises {
  description: string;
  equipment_type_id: number;
  exercise_id: Generated<number>;
  name: string;
  type: string;
}

export interface MemberBookings {
  booking_timestamp: Timestamp;
  member_booking_id: Generated<number>;
  member_id: number;
  type: UserBookingType;
}

export interface MemberClassBooking {
  class_id: number;
  member_class_booking_id: number;
  member_id: number;
}

export interface MemberExerciseRoutines {
  member_id: number;
  routine_id: number;
}

export interface MemberGoals {
  achieved_date: Timestamp | null;
  deleted: Generated<boolean>;
  goal_end: Timestamp;
  goal_id: Generated<number>;
  goal_start: Timestamp;
  member_id: number;
  weight_goal: number;
}

export interface MemberHealthStatistics {
  diastolic_bp: number;
  heart_rate: number;
  member_id: number;
  recorded: Timestamp;
  stat_id: Generated<number>;
  systolic_bp: number;
}

export interface Members {
  member_id: number;
  weight: number | null;
}

export interface MemberTrainerBooking {
  member_booking_id: number;
  member_id: number | null;
  trainer_booking_id: number;
  trainer_id: number | null;
}

export interface Payments {
  amount_paid: number;
  booking_id: number | null;
  date_paid: Timestamp;
  member_id: number | null;
  payment_id: Generated<number>;
  payment_type: PaymentType;
  processed: Generated<boolean>;
}

export interface RoomBookings {
  booking_id: Generated<number>;
  class_id: number;
  class_time: Timestamp;
  room_id: number;
}

export interface Rooms {
  name: string;
  room_id: Generated<number>;
  room_number: number;
}

export interface RoutineExercises {
  exercise_id: number;
  routine_id: number;
}

export interface TrainerBooking {
  trainer_booking_id: Generated<number>;
  trainer_booking_timestamp: Timestamp;
  trainer_id: number;
}

export interface Trainers {
  end_availability: string | null;
  rate: number | null;
  start_availability: string | null;
  trainer_id: number;
}

export interface Users {
  first_name: string;
  last_name: string;
  password: string;
  type: UserType;
  user_id: Generated<number>;
  username: string;
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
