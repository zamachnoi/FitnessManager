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
exports.memberGoalRoute = void 0;
const express_1 = require("express");
const memberGoalController = __importStar(require("../controllers/memberGoalController"));
exports.memberGoalRoute = (0, express_1.Router)();
// GET
exports.memberGoalRoute.get("/:memberId/goals", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const memberId = parseInt(req.params.memberId);
    const data = yield memberGoalController.generateMemberGoalsGetResponse(memberId);
    res.status(data.status).json(data);
}));
exports.memberGoalRoute.get("/:memberId/goals/:goalId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const memberId = parseInt(req.params.memberId);
    const goalId = parseInt(req.params.goalId);
    const data = yield memberGoalController.generateMemberGoalByIdGetResponse(memberId, goalId);
    res.status(data.status).json(data);
}));
// POST
exports.memberGoalRoute.post("/:memberId/goals", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const memberId = parseInt(req.params.memberId);
    const goal = req.body;
    const data = yield memberGoalController.generateMemberGoalPostResponse(memberId, goal);
    res.status(data.status).json(data);
}));
exports.memberGoalRoute.patch("/:memberId/goals/:goalId/achieve", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const memberId = parseInt(req.params.memberId);
    const goalId = parseInt(req.params.goalId);
    const data = yield memberGoalController.generateMemberGoalAchievePatchResponse(memberId, goalId);
    res.status(data.status).json(data);
}));
exports.memberGoalRoute.patch("/:memberId/goals/:goalId/delete", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const memberId = parseInt(req.params.memberId);
    const goalId = parseInt(req.params.goalId);
    const data = yield memberGoalController.generateMemberGoalDeletePatchResponse(memberId, goalId);
    res.status(data.status).json(data);
}));
