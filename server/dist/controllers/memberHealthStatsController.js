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
exports.generateMemberHealthStatsPostResponse = exports.generateMemberHealthStatsGetByIdResponse = exports.generateMemberHealthStatsGetResponse = void 0;
const memberHealthStatsData = __importStar(require("../data/memberHealthStatsData"));
// GET
function generateMemberHealthStatsGetResponse(member_id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const memberHealthStats = yield memberHealthStatsData.getAllMemberHealthStats(member_id);
            let res = {
                message: `success`,
                status: 200,
                data: memberHealthStats,
            };
            return res;
        }
        catch (e) {
            return {
                message: "Could not find member health stats",
                status: 404,
                data: [],
            };
        }
    });
}
exports.generateMemberHealthStatsGetResponse = generateMemberHealthStatsGetResponse;
function generateMemberHealthStatsGetByIdResponse(member_id, stat_id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const memberHealthStats = yield memberHealthStatsData.getMemberHealthStatsById(member_id, stat_id);
            let res = {
                message: `success`,
                status: 200,
                data: memberHealthStats,
            };
            return res;
        }
        catch (e) {
            return {
                message: "Could not find member health stats",
                status: 404,
                data: null,
            };
        }
    });
}
exports.generateMemberHealthStatsGetByIdResponse = generateMemberHealthStatsGetByIdResponse;
// POST
function generateMemberHealthStatsPostResponse(member_id, stats) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const memberHealthStats = yield memberHealthStatsData.createMemberHealthStats(member_id, stats);
            let res = {
                message: `success`,
                status: 200,
                data: memberHealthStats,
            };
            return res;
        }
        catch (e) {
            return {
                message: "Could not create member health stats",
                status: 404,
                data: null,
            };
        }
    });
}
exports.generateMemberHealthStatsPostResponse = generateMemberHealthStatsPostResponse;
