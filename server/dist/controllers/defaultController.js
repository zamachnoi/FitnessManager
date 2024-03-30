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
exports.generateDefaultGetResponse = void 0;
const defaultData_1 = require("../data/defaultData");
function generateDefaultGetResponse() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const user = yield (0, defaultData_1.getDefaultDbData)();
            let res = {
                message: `Hello ${user.first_name} ${user.last_name}`,
                status: "success",
            };
            return res;
        }
        catch (e) {
            return { message: "Could not find user", status: "error" };
        }
    });
}
exports.generateDefaultGetResponse = generateDefaultGetResponse;
