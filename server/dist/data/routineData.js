"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRoutinesByMemberId = exports.unassignRoutineFromMember = exports.assignRoutineToMember = exports.getAllRoutines = exports.getRoutineById = void 0;
const db_1 = require("../lib/db");
function getRoutineById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const routine = yield db_1.db
            .selectFrom("exercise_routines")
            .where("routine_id", "=", id)
            .selectAll()
            .executeTakeFirst();
        if (!routine) {
            throw new Error("No routine found");
        }
        return routine;
    });
}
exports.getRoutineById = getRoutineById;
function getAllRoutines() {
    return __awaiter(this, void 0, void 0, function* () {
        const routines = yield db_1.db
            .selectFrom("exercise_routines")
            .selectAll()
            .execute();
        return routines;
    });
}
exports.getAllRoutines = getAllRoutines;
function assignRoutineToMember(memberId, routineId) {
    return __awaiter(this, void 0, void 0, function* () {
        // check if routine / member exists
        const member = yield db_1.db
            .selectFrom("members")
            .where("member_id", "=", memberId)
            .selectAll()
            .executeTakeFirst();
        if (!member) {
            throw new Error("Member not found");
        }
        const routine = yield db_1.db
            .selectFrom("exercise_routines")
            .where("routine_id", "=", routineId)
            .selectAll()
            .executeTakeFirst();
        if (!routine) {
            throw new Error("Routine not found");
        }
        yield db_1.db
            .insertInto("member_exercise_routines")
            .values({ member_id: memberId, routine_id: routineId })
            .execute();
        return routine;
    });
}
exports.assignRoutineToMember = assignRoutineToMember;
function unassignRoutineFromMember(memberId, routineId) {
    return __awaiter(this, void 0, void 0, function* () {
        const routine = yield db_1.db
            .selectFrom("exercise_routines")
            .where("routine_id", "=", routineId)
            .selectAll()
            .executeTakeFirst();
        if (!routine) {
            throw new Error("Routine not found");
        }
        yield db_1.db
            .deleteFrom("member_exercise_routines")
            .where("member_id", "=", memberId)
            .where("routine_id", "=", routineId)
            .execute();
        return routine;
    });
}
exports.unassignRoutineFromMember = unassignRoutineFromMember;
function getRoutinesByMemberId(memberId) {
    return __awaiter(this, void 0, void 0, function* () {
        const routines = yield db_1.db
            .selectFrom("exercise_routines")
            .innerJoin("member_exercise_routines", "exercise_routines.routine_id", "member_exercise_routines.routine_id")
            .where("member_exercise_routines.member_id", "=", memberId)
            .selectAll()
            .execute();
        if (!routines.length) {
            throw new Error("No routines found");
        }
        return routines;
    });
}
exports.getRoutinesByMemberId = getRoutinesByMemberId;
