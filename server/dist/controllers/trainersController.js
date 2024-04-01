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
exports.generateTrainerPatchResponse = exports.generateTrainerPostResponse = exports.generateAllTrainersGetResponse = exports.generateTrainerByUsernameGetResponse = exports.generateTrainerByIdGetResponse = void 0;
const trainersData_1 = require("../data/trainersData");
function generateTrainerByIdGetResponse(id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const trainer = yield (0, trainersData_1.getTrainerById)(id);
            let res = {
                message: `success`,
                status: 200,
                data: trainer,
            };
            return res;
        }
        catch (e) {
            return { message: "Could not find trainer", status: 404, data: null };
        }
    });
}
exports.generateTrainerByIdGetResponse = generateTrainerByIdGetResponse;
function generateTrainerByUsernameGetResponse(username) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const trainer = yield (0, trainersData_1.getTrainerByUsername)(username);
            let res = {
                message: `success`,
                status: 200,
                data: trainer,
            };
            return res;
        }
        catch (e) {
            return { message: "Could not find trainer", status: 404, data: null };
        }
    });
}
exports.generateTrainerByUsernameGetResponse = generateTrainerByUsernameGetResponse;
function generateAllTrainersGetResponse() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const trainers = yield (0, trainersData_1.getAllTrainers)();
            let res = {
                message: `success`,
                status: 200,
                data: trainers,
            };
            return res;
        }
        catch (e) {
            return { message: "Could not find trainers", status: 404, data: [] };
        }
    });
}
exports.generateAllTrainersGetResponse = generateAllTrainersGetResponse;
function generateTrainerPostResponse(trainer) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const newTrainer = yield (0, trainersData_1.createTrainer)(trainer);
            let res = {
                message: `success`,
                status: 200,
                data: newTrainer,
            };
            return res;
        }
        catch (e) {
            console.log(e);
            return { message: "Could not create trainer", status: 404, data: null };
        }
    });
}
exports.generateTrainerPostResponse = generateTrainerPostResponse;
function generateTrainerPatchResponse(trainerId, trainer) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const updatedTrainer = yield (0, trainersData_1.updateTrainer)(trainerId, trainer);
            let res = {
                message: `success`,
                status: 200,
                data: updatedTrainer,
            };
            return res;
        }
        catch (e) {
            console.log(e);
            return { message: "Could not update trainer", status: 404, data: null };
        }
    });
}
exports.generateTrainerPatchResponse = generateTrainerPatchResponse;
