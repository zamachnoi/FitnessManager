import { db } from "../lib/db"
import { MemberDataResponse, MemberDataInsert, MemberApiResponse } from "../models/io/memberIo"
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

// TODO: authorize
export async function updateMember(
	memberId: number,
	newData: MemberDataInsert
) {
	const { weight, ...userData } = newData

	// Update the user data
	const user = await db
		.updateTable("users")
		.set(userData)
		.where("user_id", "=", memberId)
		.returningAll()
		.executeTakeFirst()

	if (!user) {
		throw new Error("Failed to update user")
	}

	// Update the member data
	const member = await db
		.updateTable("members")
		.set({ weight })
		.where("member_id", "=", memberId)
		.returningAll()
		.executeTakeFirst()

	if (!member) {
		throw new Error("Failed to update member")
	}

	return util.removePassword({ ...user, ...member })
}

export async function SearchMembersProfileFullName(
	firstName: string,
	lastName: string
): Promise<MemberDataResponse[]>{
	const members = await db
		.selectFrom("users")
		.innerJoin("members","user_id", 'member_id')
		.where("first_name", "like", firstName)
		.where("last_name", "like", lastName)
		.where("type", "=", "Member")
		.selectAll()
		.execute()

	if (!members) {
		throw new Error("No member found")
	}

	return await Promise.all(members.map(util.removePassword))
}

export async function SearchMembersProfilePartName(
	Name: string,
): Promise<MemberDataResponse[]> {
	const members = await db
		.selectFrom("users")
		.innerJoin("members","user_id", 'member_id')
		.where("first_name", "like", Name)
		.where("last_name", "like", Name)
		.where("type", "=", "Member")
		.selectAll()
		.execute()
	
	if (!members) {
		throw new Error("No members found")
	}

	return await Promise.all(members.map(util.removePassword))
}