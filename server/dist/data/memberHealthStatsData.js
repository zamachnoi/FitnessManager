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
exports.createMemberHealthStats = exports.getMemberHealthStatsById = exports.getAllMemberHealthStats = void 0;
const db_1 = require("../lib/db");
function getAllMemberHealthStats(memberId) {
    return __awaiter(this, void 0, void 0, function* () {
        const memberHealthStats = yield db_1.db
            .selectFrom("member_health_statistics")
            .where("member_id", "=", memberId)
            .selectAll()
            .execute();
        return memberHealthStats;
    });
}
exports.getAllMemberHealthStats = getAllMemberHealthStats;
function getMemberHealthStatsById(memberId, statId) {
    return __awaiter(this, void 0, void 0, function* () {
        const memberHealthStats = yield db_1.db
            .selectFrom("member_health_statistics")
            .where("member_id", "=", memberId)
            .where("stat_id", "=", statId)
            .selectAll()
            .executeTakeFirst();
        if (!memberHealthStats) {
            throw new Error("No member health stats found");
        }
        return memberHealthStats;
    });
}
exports.getMemberHealthStatsById = getMemberHealthStatsById;
function createMemberHealthStats(memberId, stats) {
    return __awaiter(this, void 0, void 0, function* () {
        const { heart_rate, systolic_bp, diastolic_bp } = stats;
        const recorded = new Date().toISOString();
        const memberHealthStats = yield db_1.db
            .insertInto("member_health_statistics")
            .values({
            member_id: memberId,
            heart_rate,
            systolic_bp,
            diastolic_bp,
            recorded,
        })
            .returningAll()
            .executeTakeFirst();
        if (!memberHealthStats) {
            throw new Error("Failed to create member health stats");
        }
        return memberHealthStats;
    });
}
exports.createMemberHealthStats = createMemberHealthStats;
