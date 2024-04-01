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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateTrainer = exports.createTrainer = exports.getAllTrainers = exports.getTrainerByUsername = exports.getTrainerById = void 0;
const db_1 = require("../lib/db");
const util = __importStar(require("./dataUtil"));
function getTrainerById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const trainer = yield db_1.db
            .selectFrom("trainers")
            .innerJoin("users", "trainers.trainer_id", "users.user_id")
            .where("trainers.trainer_id", "=", id)
            .selectAll()
            .executeTakeFirst();
        if (!trainer) {
            throw new Error("No such trainer found");
        }
        return util.removePassword(trainer);
    });
}
exports.getTrainerById = getTrainerById;
function getTrainerByUsername(username) {
    return __awaiter(this, void 0, void 0, function* () {
        const trainer = yield db_1.db
            .selectFrom("trainers")
            .innerJoin("users", "trainers.trainer_id", "users.user_id")
            .where("username", "=", username)
            .selectAll()
            .executeTakeFirst();
        if (!trainer) {
            throw new Error("No such trainer found");
        }
        return util.removePassword(trainer);
    });
}
exports.getTrainerByUsername = getTrainerByUsername;
function getAllTrainers() {
    return __awaiter(this, void 0, void 0, function* () {
        const trainers = yield db_1.db
            .selectFrom("trainers")
            .innerJoin("users", "trainers.trainer_id", "users.user_id")
            .selectAll()
            .execute();
        return yield Promise.all(trainers.map(util.removePassword));
    });
}
exports.getAllTrainers = getAllTrainers;
function createTrainer(trainer) {
    return __awaiter(this, void 0, void 0, function* () {
        const { start_availability, end_availability, rate } = trainer, userData = __rest(trainer
        // Insert into the users table and get the inserted user
        , ["start_availability", "end_availability", "rate"]);
        // Insert into the users table and get the inserted user
        const user = yield db_1.db
            .insertInto("users")
            .values(userData)
            .returningAll()
            .executeTakeFirst();
        if (!user) {
            throw new Error("Failed to create user");
        }
        const trainerData = {
            trainer_id: user.user_id,
            start_availability,
            end_availability,
            rate
        };
        // Insert into the trainers table and get the inserted trainer
        const newTrainer = yield db_1.db
            .insertInto("trainers")
            .values(trainerData)
            .returningAll()
            .executeTakeFirst();
        if (!newTrainer) {
            throw new Error("Failed to create trainer");
        }
        const newTrainerData = Object.assign(Object.assign({}, user), newTrainer);
        return util.removePassword(newTrainerData);
    });
}
exports.createTrainer = createTrainer;
// TODO: authorize
function updateTrainer(trainerId, newData) {
    return __awaiter(this, void 0, void 0, function* () {
        const { start_availability, end_availability, rate } = newData, userData = __rest(newData
        // Update the user data
        , ["start_availability", "end_availability", "rate"]);
        // Update the user data
        const user = yield db_1.db
            .updateTable("users")
            .set(userData)
            .where("user_id", "=", trainerId)
            .returningAll()
            .executeTakeFirst();
        if (!user) {
            throw new Error("Failed to update user");
        }
        // Update the trainer data
        const trainer = yield db_1.db
            .updateTable("trainers")
            .set({ start_availability, end_availability, rate })
            .where("trainer_id", "=", trainerId)
            .returningAll()
            .executeTakeFirst();
        if (!trainer) {
            throw new Error("Failed to update trainer");
        }
        return util.removePassword(Object.assign(Object.assign({}, user), trainer));
    });
}
exports.updateTrainer = updateTrainer;
