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
exports.generateMemberPatchResponse = exports.generateMemberPostResponse = exports.generateAllMembersGetResponse = exports.generateMemberByUsernameGetResponse = exports.generateMemberByIdGetResponse = void 0;
const memberData_1 = require("../data/memberData");
function generateMemberByIdGetResponse(id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const member = yield (0, memberData_1.getMemberById)(id);
            let res = {
                message: `success`,
                status: 200,
                data: member,
            };
            return res;
        }
        catch (e) {
            return { message: "Could not find member", status: 404, data: null };
        }
    });
}
exports.generateMemberByIdGetResponse = generateMemberByIdGetResponse;
function generateMemberByUsernameGetResponse(username) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const member = yield (0, memberData_1.getMemberByUsername)(username);
            let res = {
                message: `success`,
                status: 200,
                data: member,
            };
            return res;
        }
        catch (e) {
            return { message: "Could not find member", status: 404, data: null };
        }
    });
}
exports.generateMemberByUsernameGetResponse = generateMemberByUsernameGetResponse;
function generateAllMembersGetResponse() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const members = yield (0, memberData_1.getAllMembers)();
            let res = {
                message: `success`,
                status: 200,
                data: members,
            };
            return res;
        }
        catch (e) {
            return { message: "Could not find members", status: 404, data: [] };
        }
    });
}
exports.generateAllMembersGetResponse = generateAllMembersGetResponse;
function generateMemberPostResponse(member) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const newMember = yield (0, memberData_1.createMember)(member);
            let res = {
                message: `success`,
                status: 200,
                data: newMember,
            };
            return res;
        }
        catch (e) {
            console.log(e);
            return { message: "Could not create member", status: 404, data: null };
        }
    });
}
exports.generateMemberPostResponse = generateMemberPostResponse;
function generateMemberPatchResponse(memberId, member) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const updatedMember = yield (0, memberData_1.updateMember)(memberId, member);
            let res = {
                message: `success`,
                status: 200,
                data: updatedMember,
            };
            return res;
        }
        catch (e) {
            console.log(e);
            return { message: "Could not update member", status: 404, data: null };
        }
    });
}
exports.generateMemberPatchResponse = generateMemberPatchResponse;
