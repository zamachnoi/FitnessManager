import { ApiResponse } from "./util";
import { ExerciseRoutines } from "../db/types"

export type RoutineDataResponse = Omit<ExerciseRoutines, "routine_id">;

export type RoutinesApiResponse = Omit<ApiResponse, "data"> & {
  data: RoutineDataResponse[] | null;
};

export type RoutineApiResponse = Omit<ApiResponse, "data"> & {
  data: RoutineDataResponse | null;
};