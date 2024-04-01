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
exports.generateRoutinesByMemberIdGetResponse = exports.generateUnassignRoutineFromMemberPostResponse = exports.generateAssignRoutineToMemberPostResponse = exports.generateAllRoutinesGetResponse = exports.generateRoutineByIdGetResponse = void 0;
const routineData_1 = require("../data/routineData");
function generateRoutineByIdGetResponse(id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const routine = yield (0, routineData_1.getRoutineById)(id);
            let res = {
                message: `success`,
                status: 200,
                data: routine,
            };
            return res;
        }
        catch (e) {
            return { message: "Could not find routine", status: 404, data: null };
        }
    });
}
exports.generateRoutineByIdGetResponse = generateRoutineByIdGetResponse;
function generateAllRoutinesGetResponse() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const routines = yield (0, routineData_1.getAllRoutines)();
            let res = {
                message: `success`,
                status: 200,
                data: routines,
            };
            return res;
        }
        catch (e) {
            return { message: "Could not find routines", status: 404, data: [] };
        }
    });
}
exports.generateAllRoutinesGetResponse = generateAllRoutinesGetResponse;
function generateAssignRoutineToMemberPostResponse(memberId, routineId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const routine = yield (0, routineData_1.assignRoutineToMember)(memberId, routineId);
            let res = {
                message: `success`,
                status: 200,
                data: routine,
            };
            return res;
        }
        catch (e) {
            return { message: "Could not assign routine", status: 404, data: null };
        }
    });
}
exports.generateAssignRoutineToMemberPostResponse = generateAssignRoutineToMemberPostResponse;
function generateUnassignRoutineFromMemberPostResponse(memberId, routineId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const routine = yield (0, routineData_1.unassignRoutineFromMember)(memberId, routineId);
            let res = {
                message: `success`,
                status: 200,
                data: routine,
            };
            return res;
        }
        catch (e) {
            return { message: "Could not unassign routine", status: 404, data: null };
        }
    });
}
exports.generateUnassignRoutineFromMemberPostResponse = generateUnassignRoutineFromMemberPostResponse;
function generateRoutinesByMemberIdGetResponse(memberId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const routines = yield (0, routineData_1.getRoutinesByMemberId)(memberId);
            let res = {
                message: `success`,
                status: 200,
                data: routines,
            };
            return res;
        }
        catch (e) {
            return { message: "Could not find routines", status: 404, data: [] };
        }
    });
}
exports.generateRoutinesByMemberIdGetResponse = generateRoutinesByMemberIdGetResponse;
