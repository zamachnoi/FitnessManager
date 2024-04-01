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
exports.generateAllUsersGetResponse = exports.generateUserByUsernameGetResponse = exports.generateUserByIdGetResponse = void 0;
const userData_1 = require("../data/userData");
function generateUserByIdGetResponse(id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const user = yield (0, userData_1.getUserById)(id);
            let res = {
                message: `success`,
                status: 200,
                data: user,
            };
            return res;
        }
        catch (e) {
            return { message: "Could not find user", status: 404, data: null };
        }
    });
}
exports.generateUserByIdGetResponse = generateUserByIdGetResponse;
function generateUserByUsernameGetResponse(username) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const user = yield (0, userData_1.getUserByUsername)(username);
            let res = {
                message: `success`,
                status: 200,
                data: user,
            };
            return res;
        }
        catch (e) {
            return { message: "Could not find user", status: 404, data: null };
        }
    });
}
exports.generateUserByUsernameGetResponse = generateUserByUsernameGetResponse;
function generateAllUsersGetResponse() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const users = yield (0, userData_1.getAllUsers)();
            let res = {
                message: `success`,
                status: 200,
                data: users,
            };
            return res;
        }
        catch (e) {
            return { message: "Could not find users", status: 404, data: [] };
        }
    });
}
exports.generateAllUsersGetResponse = generateAllUsersGetResponse;
