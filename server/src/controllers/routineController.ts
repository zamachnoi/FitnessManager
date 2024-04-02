import { 
  RoutineApiResponse,
  RoutinesApiResponse,
  RoutineDataResponse
} from "../models/io/routinesIo";

import { 
  getRoutineById,
  getAllRoutines,
  assignRoutineToMember,
  unassignRoutineFromMember,
  getRoutinesByMemberId
} from "../data/routineData";

export async function generateRoutineByIdGetResponse(
  id: number
): Promise<RoutineApiResponse> {
  try {
    const routine = await getRoutineById(id);
    let res: RoutineApiResponse = {
      message: `success`,
      status: 200,
      data: routine,
    }
    return res;
  } catch (e) {
    return { message: "Could not find routine", status: 404, data: null };
  }
}

export async function generateAllRoutinesGetResponse(): Promise<RoutinesApiResponse> {
  try {
    const routines = await getAllRoutines();
    let res: RoutinesApiResponse = {
      message: `success`,
      status: 200,
      data: routines,
    }
    return res;
  } catch (e) {
    return { message: "Could not find routines", status: 404, data: [] };
  }
}

export async function generateAssignRoutineToMemberPostResponse(
  memberId: number,
  routineId: number
): Promise<RoutineApiResponse> {
  try {
    const routine = await assignRoutineToMember(memberId, routineId);
    let res: RoutineApiResponse = {
      message: `success`,
      status: 200,
      data: routine,
    }
    return res;
  } catch (e) {
    return { message: "Could not assign routine", status: 404, data: null };
  }
}

export async function generateUnassignRoutineFromMemberPostResponse(
  memberId: number,
  routineId: number
): Promise<RoutineApiResponse> {
  try {
    const routine = await unassignRoutineFromMember(memberId, routineId);
    let res: RoutineApiResponse = {
      message: `success`,
      status: 200,
      data: routine,
    }
    return res;
  } catch (e) {
    return { message: "Could not unassign routine", status: 404, data: null };
  }
}

export async function generateRoutinesByMemberIdGetResponse(
  memberId: number
): Promise<RoutinesApiResponse> {
  try {
    const routines = await getRoutinesByMemberId(memberId);
    let res: RoutinesApiResponse = {
      message: `success`,
      status: 200,
      data: routines,
    }
    return res;
  } catch (e) {
    return { message: "Could not find routines", status: 404, data: [] };
  }
}

