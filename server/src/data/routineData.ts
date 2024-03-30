import { db } from "../lib/db";
import { RoutineApiResponse, RoutinesApiResponse } from "../models/io/routines";

export async function getRoutineById(id: number): Promise<RoutineApiResponse> {
  const routine = await db
    .selectFrom("exercise_routines")
    .where("routine_id", "=", id)
    .selectAll()
    .executeTakeFirst();

  if (!routine) {
    throw new Error("No routine found");
  }

  return { message: "Routine found", status: 200, data: routine };
}

export async function getAllRoutines(): Promise<RoutinesApiResponse> {
  const routines = await db
    .selectFrom("exercise_routines")
    .selectAll()
    .execute();

  return { message: "Routines found", status: 200, data: routines };
}

export async function assignRoutineToMember(
  memberId: number,
  routineId: number
): Promise<RoutineApiResponse> {

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

  return { message: "Routine assigned", status: 200, data: routine };
}

export async function unassignRoutineFromMember(
  memberId: number,
  routineId: number
): Promise<RoutineApiResponse> {
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

  return { message: "Routine unassigned", status: 200, data: routine };
}

export async function getRoutinesByMemberId(
  memberId: number
): Promise<RoutinesApiResponse> {
  const routine = await db
    .selectFrom("exercise_routines")
    .innerJoin("member_exercise_routines", "exercise_routines.routine_id", "member_exercise_routines.routine_id")
    .where("member_exercise_routines.member_id", "=", memberId)
    .selectAll()
    .execute();

  if (!routine) {
    throw new Error("No routines found");
  }

  return { message: "Routine found", status: 200, data: routine };
}
