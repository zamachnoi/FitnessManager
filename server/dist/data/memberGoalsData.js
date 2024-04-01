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
exports.getActiveGoals = exports.getDeletedGoals = exports.getUnachievedGoals = exports.getAchievedGoals = exports.achieveMemberGoal = exports.deleteMemberGoal = exports.updateMemberGoal = exports.getMemberGoalById = exports.getMemberGoals = exports.createMemberGoal = void 0;
const db_1 = require("../lib/db");
function createMemberGoal(member_id, goal) {
    return __awaiter(this, void 0, void 0, function* () {
        const { weight_goal } = goal;
        const goal_start = new Date().toISOString();
        const memberGoal = yield db_1.db
            .insertInto("member_goals")
            .values({ member_id, weight_goal, goal_start })
            .returningAll()
            .executeTakeFirst();
        if (!memberGoal) {
            throw new Error("Failed to create member goal");
        }
        return memberGoal;
    });
}
exports.createMemberGoal = createMemberGoal;
function getMemberGoals(member_id) {
    return __awaiter(this, void 0, void 0, function* () {
        const memberGoals = yield db_1.db
            .selectFrom("member_goals")
            .where("member_id", "=", member_id)
            .selectAll()
            .execute();
        return memberGoals;
    });
}
exports.getMemberGoals = getMemberGoals;
function getMemberGoalById(member_id, goal_id) {
    return __awaiter(this, void 0, void 0, function* () {
        const memberGoal = yield db_1.db
            .selectFrom("member_goals")
            .where("member_id", "=", member_id)
            .where("goal_id", "=", goal_id)
            .selectAll()
            .executeTakeFirst();
        if (!memberGoal) {
            throw new Error("No member goal found");
        }
        return memberGoal;
    });
}
exports.getMemberGoalById = getMemberGoalById;
function updateMemberGoal(member_id, goal_id, goal) {
    return __awaiter(this, void 0, void 0, function* () {
        const { weight_goal } = goal;
        const memberGoal = yield db_1.db
            .updateTable("member_goals")
            .set({ weight_goal })
            .where("member_id", "=", member_id)
            .where("goal_id", "=", goal_id)
            .returningAll()
            .executeTakeFirst();
        if (!memberGoal) {
            throw new Error("Failed to update member goal");
        }
        return memberGoal;
    });
}
exports.updateMemberGoal = updateMemberGoal;
function deleteMemberGoal(member_id, goal_id) {
    return __awaiter(this, void 0, void 0, function* () {
        const memberGoal = yield db_1.db
            .updateTable("member_goals")
            .set({ deleted: true })
            .where("member_id", "=", member_id)
            .where("goal_id", "=", goal_id)
            .returningAll()
            .executeTakeFirst();
        if (!memberGoal) {
            throw new Error("Failed to delete member goal");
        }
        return memberGoal;
    });
}
exports.deleteMemberGoal = deleteMemberGoal;
function achieveMemberGoal(member_id, goal_id) {
    return __awaiter(this, void 0, void 0, function* () {
        const achieved_date = new Date().toISOString();
        const memberGoal = yield db_1.db
            .updateTable("member_goals")
            .set({ achieved_date })
            .where("member_id", "=", member_id)
            .where("goal_id", "=", goal_id)
            .returningAll()
            .executeTakeFirst();
        if (!memberGoal) {
            throw new Error("Failed to achieve member goal");
        }
        return memberGoal;
    });
}
exports.achieveMemberGoal = achieveMemberGoal;
function getAchievedGoals(member_id) {
    return __awaiter(this, void 0, void 0, function* () {
        const memberGoals = yield db_1.db
            .selectFrom("member_goals")
            .where("member_id", "=", member_id)
            .where("achieved_date", "!=", null)
            .selectAll()
            .execute();
        return memberGoals;
    });
}
exports.getAchievedGoals = getAchievedGoals;
function getUnachievedGoals(member_id) {
    return __awaiter(this, void 0, void 0, function* () {
        const memberGoals = yield db_1.db
            .selectFrom("member_goals")
            .where("member_id", "=", member_id)
            .where("achieved_date", "=", null)
            .selectAll()
            .execute();
        return memberGoals;
    });
}
exports.getUnachievedGoals = getUnachievedGoals;
function getDeletedGoals(member_id) {
    return __awaiter(this, void 0, void 0, function* () {
        const memberGoals = yield db_1.db
            .selectFrom("member_goals")
            .where("member_id", "=", member_id)
            .where("deleted", "=", true)
            .selectAll()
            .execute();
        return memberGoals;
    });
}
exports.getDeletedGoals = getDeletedGoals;
function getActiveGoals(member_id) {
    return __awaiter(this, void 0, void 0, function* () {
        const memberGoals = yield db_1.db
            .selectFrom("member_goals")
            .where("member_id", "=", member_id)
            .where("deleted", "=", false)
            .where("achieved_date", "=", null)
            .selectAll()
            .execute();
        return memberGoals;
    });
}
exports.getActiveGoals = getActiveGoals;
