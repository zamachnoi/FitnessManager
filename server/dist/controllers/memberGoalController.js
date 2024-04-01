"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.generateMemberGoalDeletePatchResponse = exports.generateMemberGoalAchievePatchResponse = exports.generateMemberGoalByIdGetResponse = exports.generateMemberGoalsGetResponse = exports.generateMemberGoalPostResponse = void 0;
const memberGoalsData = __importStar(require("../data/memberGoalsData"));
function generateMemberGoalPostResponse(member_id, goal) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const memberGoal = yield memberGoalsData.createMemberGoal(member_id, goal);
            let res = {
                message: `success`,
                status: 200,
                data: memberGoal,
            };
            return res;
        }
        catch (e) {
            return {
                message: "Could not create member goal",
                status: 404,
                data: null,
            };
        }
    });
}
exports.generateMemberGoalPostResponse = generateMemberGoalPostResponse;
function generateMemberGoalsGetResponse(member_id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const memberGoals = yield memberGoalsData.getMemberGoals(member_id);
            let res = {
                message: `success`,
                status: 200,
                data: memberGoals,
            };
            return res;
        }
        catch (e) {
            return {
                message: "Could not find member goals",
                status: 404,
                data: [],
            };
        }
    });
}
exports.generateMemberGoalsGetResponse = generateMemberGoalsGetResponse;
function generateMemberGoalByIdGetResponse(member_id, goal_id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const memberGoal = yield memberGoalsData.getMemberGoalById(member_id, goal_id);
            let res = {
                message: `success`,
                status: 200,
                data: memberGoal,
            };
            return res;
        }
        catch (e) {
            return {
                message: "Could not find member goal",
                status: 404,
                data: null,
            };
        }
    });
}
exports.generateMemberGoalByIdGetResponse = generateMemberGoalByIdGetResponse;
function generateMemberGoalAchievePatchResponse(member_id, goal_id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const memberGoal = yield memberGoalsData.achieveMemberGoal(member_id, goal_id);
            let res = {
                message: `success`,
                status: 200,
                data: memberGoal,
            };
            return res;
        }
        catch (e) {
            return {
                message: "Could not achieve member goal",
                status: 404,
                data: null,
            };
        }
    });
}
exports.generateMemberGoalAchievePatchResponse = generateMemberGoalAchievePatchResponse;
function generateMemberGoalDeletePatchResponse(member_id, goal_id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const memberGoal = yield memberGoalsData.deleteMemberGoal(member_id, goal_id);
            let res = {
                message: `success`,
                status: 200,
                data: memberGoal,
            };
            return res;
        }
        catch (e) {
            return {
                message: "Could not delete member goal",
                status: 404,
                data: null,
            };
        }
    });
}
exports.generateMemberGoalDeletePatchResponse = generateMemberGoalDeletePatchResponse;
