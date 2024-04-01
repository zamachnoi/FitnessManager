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
exports.updateMember = exports.createMember = exports.getAllMembers = exports.getMemberByUsername = exports.getMemberById = void 0;
const db_1 = require("../lib/db");
const util = __importStar(require("./dataUtil"));
function getMemberById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const member = yield db_1.db
            .selectFrom("members")
            .innerJoin("users", "members.member_id", "users.user_id")
            .where("members.member_id", "=", id)
            .selectAll()
            .executeTakeFirst();
        if (!member) {
            throw new Error("No member found");
        }
        return util.removePassword(member);
    });
}
exports.getMemberById = getMemberById;
function getMemberByUsername(username) {
    return __awaiter(this, void 0, void 0, function* () {
        const member = yield db_1.db
            .selectFrom("members")
            .innerJoin("users", "members.member_id", "users.user_id")
            .where("username", "=", username)
            .selectAll()
            .executeTakeFirst();
        if (!member) {
            throw new Error("No member found");
        }
        return util.removePassword(member);
    });
}
exports.getMemberByUsername = getMemberByUsername;
function getAllMembers() {
    return __awaiter(this, void 0, void 0, function* () {
        const members = yield db_1.db
            .selectFrom("members")
            .innerJoin("users", "members.member_id", "users.user_id")
            .selectAll()
            .execute();
        return yield Promise.all(members.map(util.removePassword));
    });
}
exports.getAllMembers = getAllMembers;
function createMember(member) {
    return __awaiter(this, void 0, void 0, function* () {
        const { weight } = member, userData = __rest(member
        // Insert into the users table and get the inserted user
        , ["weight"]);
        // Insert into the users table and get the inserted user
        const user = yield db_1.db
            .insertInto("users")
            .values(userData)
            .returningAll()
            .executeTakeFirst();
        if (!user) {
            throw new Error("Failed to create user");
        }
        const memberData = {
            member_id: user.user_id,
            weight,
        };
        // Insert into the members table and get the inserted member
        const newMember = yield db_1.db
            .insertInto("members")
            .values(memberData)
            .returningAll()
            .executeTakeFirst();
        if (!newMember) {
            throw new Error("Failed to create member");
        }
        const newMemberData = Object.assign(Object.assign({}, user), newMember);
        return util.removePassword(newMemberData);
    });
}
exports.createMember = createMember;
// TODO: authorize
function updateMember(memberId, newData) {
    return __awaiter(this, void 0, void 0, function* () {
        const { weight } = newData, userData = __rest(newData
        // Update the user data
        , ["weight"]);
        // Update the user data
        const user = yield db_1.db
            .updateTable("users")
            .set(userData)
            .where("user_id", "=", memberId)
            .returningAll()
            .executeTakeFirst();
        if (!user) {
            throw new Error("Failed to update user");
        }
        // Update the member data
        const member = yield db_1.db
            .updateTable("members")
            .set({ weight })
            .where("member_id", "=", memberId)
            .returningAll()
            .executeTakeFirst();
        if (!member) {
            throw new Error("Failed to update member");
        }
        return util.removePassword(Object.assign(Object.assign({}, user), member));
    });
}
exports.updateMember = updateMember;
