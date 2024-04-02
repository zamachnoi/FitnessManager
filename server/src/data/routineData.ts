import { db } from "../lib/db";
import { RoutineApiResponse, RoutineDataResponse, RoutinesDataResponse } from "../models/io/routinesIo";

export async function getRoutineById(id: number): Promise<RoutineDataResponse> {
  const routine = await db
    .selectFrom("exercise_routines")
    .where("routine_id", "=", id)
    .selectAll()
    .executeTakeFirst();

  if (!routine) {
    throw new Error("No routine found");
  }

  return routine;
}

export async function getAllRoutines(): Promise<RoutinesDataResponse> {
  const routines = await db
    .selectFrom("exercise_routines")
    .selectAll()
    .execute();

  return routines;
}

export async function assignRoutineToMember(
  memberId: number,
  routineId: number
): Promise<RoutineDataResponse> {

  // check if routine / member exists
  const member = await db
    .selectFrom("members")
    .where("member_id", "=", memberId)
    .selectAll()
    .executeTakeFirst();
  
  if (!member) {
    throw new Error("Member not found");
  }

  const routine = await db
    .selectFrom("exercise_routines")
    .where("routine_id", "=", routineId)
    .selectAll()
    .executeTakeFirst();

  if (!routine) {
    throw new Error("Routine not found");
  }

  await db
    .insertInto("member_exercise_routines")
    .values({ member_id: memberId, routine_id: routineId })
    .execute();

  return routine;
}

export async function unassignRoutineFromMember(
  memberId: number,
  routineId: number
): Promise<RoutineDataResponse> {
  const routine = await db
    .selectFrom("exercise_routines")
    .where("routine_id", "=", routineId)
    .selectAll()
    .executeTakeFirst();

  if (!routine) {
    throw new Error("Routine not found");
  }

  await db
    .deleteFrom("member_exercise_routines")
    .where("member_id", "=", memberId)
    .where("routine_id", "=", routineId)
    .execute();

  return routine;
}

export async function getRoutinesByMemberId(
  memberId: number
): Promise<RoutinesDataResponse> {
  const routines = await db
    .selectFrom("exercise_routines")
    .innerJoin("member_exercise_routines", "exercise_routines.routine_id", "member_exercise_routines.routine_id")
    .where("member_exercise_routines.member_id", "=", memberId)
    .selectAll()
    .execute();

  if (!routines.length) {
    throw new Error("No routines found");
  }

  return routines;
}
