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
exports.trainerRoute = void 0;
const express_1 = require("express");
const trainersController = __importStar(require("../controllers/trainersController"));
exports.trainerRoute = (0, express_1.Router)();
// GET
exports.trainerRoute.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield trainersController.generateAllTrainersGetResponse();
    res.status(data.status).json(data);
}));
exports.trainerRoute.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id);
    const data = yield trainersController.generateTrainerByIdGetResponse(id);
    res.status(data.status).json(data);
}));
exports.trainerRoute.get("/username/:username", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const username = req.params.username;
    const data = yield trainersController.generateTrainerByUsernameGetResponse(username);
    res.status(data.status).json(data);
}));
// POST
exports.trainerRoute.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield trainersController.generateTrainerPostResponse(req.body);
    res.status(data.status).json(data);
}));
// PATCH
exports.trainerRoute.patch("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id);
    const data = yield trainersController.generateTrainerPatchResponse(id, req.body);
    res.status(data.status).json(data);
}));
