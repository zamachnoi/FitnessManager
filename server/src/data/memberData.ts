import { db } from "../lib/db"
import { UserDataInsert } from "../models/io/userIo"
import { MemberDataResponse, MemberDataInsert } from "../models/io/memberIo"
import * as util from "./dataUtil"

export async function getMemberById(id: number): Promise<MemberDataResponse> {
	const member = await db
		.selectFrom("members")
		.innerJoin("users", "members.member_id", "users.user_id")
		.where("members.member_id", "=", id)
		.selectAll()
		.executeTakeFirst()

	if (!member) {
		throw new Error("No member found")
	}

	return util.removePassword(member)
}

export async function getMemberByUsername(
	username: string
): Promise<MemberDataResponse> {
	const member = await db
		.selectFrom("members")
		.innerJoin("users", "members.member_id", "users.user_id")
		.where("username", "=", username)
		.selectAll()
		.executeTakeFirst()

	if (!member) {
		throw new Error("No member found")
	}

	return util.removePassword(member)
}

export async function getAllMembers(): Promise<MemberDataResponse[]> {
	const members = await db
		.selectFrom("members")
		.innerJoin("users", "members.member_id", "users.user_id")
		.selectAll()
		.execute()
	return await Promise.all(members.map(util.removePassword))
}

export async function createMember(
	member: MemberDataInsert
): Promise<MemberDataResponse> {
	const { weight, ...userData } = member
	// Insert into the users table and get the inserted user
	const user = await db
		.insertInto("users")
		.values(userData)
		.returningAll()
		.executeTakeFirst()

	if (!user) {
		throw new Error("Failed to create user")
	}

	const memberData = {
		member_id: user.user_id,
		weight,
	}

	// Insert into the members table and get the inserted member
	const newMember = await db
		.insertInto("members")
		.values(memberData)
		.returningAll()
		.executeTakeFirst()

	if (!newMember) {
		throw new Error("Failed to create member")
	}

	const newMemberData = {
		...user,
		...newMember,
	}

	return util.removePassword(newMemberData)
}
