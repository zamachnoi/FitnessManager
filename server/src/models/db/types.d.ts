import type { ColumnType } from "kysely";

export type Generated<T> = T extends ColumnType<infer S, infer I, infer U>
  ? ColumnType<S, I | undefined, U>
  : ColumnType<T, T | undefined, T>;

export type Timestamp = ColumnType<Date, Date | string, Date | string>;

export type UserType = "Admin" | "Member" | "Trainer";

export interface Classes {
  class_id: Generated<number>;
  name: string | null;
  price: number | null;
  room_id: number | null;
  timeslot_availability_id: number | null;
  trainer_id: number | null;
}

export interface Equipment {
  equipment_id: Generated<number>;
  equipment_type_id: number | null;
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
  exercise_id: Generated<number>;
  name: string | null;
  type: string | null;
}

export interface MemberClassBooking {
  booking_id: Generated<number>;
  class_id: number | null;
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
  blood_pressure: string | null;
  member_id: number | null;
  stat_id: Generated<number>;
}

export interface Members {
  member_id: number;
  weight: number | null;
}

export interface MemberTrainingReservation {
  member_id: number | null;
  reservation_id: Generated<number>;
  slot_availability_id: number | null;
  trainer_id: number | null;
}

export interface PaymentHistory {
  active_until: Timestamp | null;
  amount_paid: number | null;
  date_paid: Timestamp | null;
  description: string | null;
  member_id: number | null;
  payment_id: Generated<number>;
}

export interface Room {
  close_time: string | null;
  name: string | null;
  open_time: string | null;
  room_id: Generated<number>;
}

export interface RoomBookings {
  booking_id: Generated<number>;
  class_id: number | null;
  end_time: string | null;
  room_id: number | null;
  start_time: string | null;
}

export interface RoutineExercises {
  exercise_id: number;
  routine_id: number;
}

export interface TrainerAvailability {
  availability_id: Generated<number>;
  available_date: Timestamp | null;
  end_time: string | null;
  is_booked: Generated<boolean | null>;
  start_time: string | null;
  trainer_id: number | null;
}

export interface Trainers {
  rate: number | null;
  trainer_id: number;
}

export interface Users {
  first_name: string | null;
  last_name: string | null;
  password: string | null;
  type: UserType | null;
  user_id: Generated<number>;
  username: string | null;
}

export interface DB {
  classes: Classes;
  equipment: Equipment;
  equipment_type: EquipmentType;
  exercise_routines: ExerciseRoutines;
  exercises: Exercises;
  member_class_booking: MemberClassBooking;
  member_exercise_routines: MemberExerciseRoutines;
  member_goals: MemberGoals;
  member_health_statistics: MemberHealthStatistics;
  member_training_reservation: MemberTrainingReservation;
  members: Members;
  payment_history: PaymentHistory;
  room: Room;
  room_bookings: RoomBookings;
  routine_exercises: RoutineExercises;
  trainer_availability: TrainerAvailability;
  trainers: Trainers;
  users: Users;
}
