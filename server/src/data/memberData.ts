import { sql } from "kysely"
import { db } from "../lib/db"
import {
	MemberDataResponse,
	MemberDataCreateRequest,
	MemberDataUpdate,
	MemberDataCreate,
} from "../models/io/memberIo"
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

interface UserData {
	username: string
	password: string
	first_name: string
	last_name: string
	type: "Member"
}

export async function createMember(
	member: MemberDataCreate
): Promise<MemberDataResponse> {
	const { memberData, userData } = member

	const createdMember = await db.transaction().execute(async (trx) => {
		const createdUser = await trx
			.insertInto("users")
			.values(userData)
			.returningAll()
			.executeTakeFirstOrThrow()

		memberData.member_id = createdUser.user_id

		const newMember = await trx
			.insertInto("members")
			.values({
				member_id: memberData.member_id,
				weight: memberData.weight,
			})
			.returningAll()
			.executeTakeFirstOrThrow()

		const newMemberData = {
			...createdUser,
			...newMember,
		}

		return newMemberData
	})

	return util.removePassword(createdMember)
}

export async function updateMember(
	memberId: number,
	newData: MemberDataUpdate
): Promise<MemberDataResponse> {
	const { memberData, userData } = newData

	const updatedData = await db.transaction().execute(async (trx) => {
		let updatedUser
		let updatedMember

		const cleanedUserData = Object.fromEntries(
			Object.entries(userData).filter(
				([key, value]) => value !== undefined && value !== null
			)
		)

		const cleanedMemberData = Object.fromEntries(
			Object.entries(memberData).filter(
				([key, value]) => value !== undefined
			)
		)

		if (Object.values(cleanedUserData).length > 0) {
			updatedUser = await trx
				.updateTable("users")
				.set(cleanedUserData)
				.where("user_id", "=", memberId)
				.returningAll()
				.executeTakeFirstOrThrow()
		}

		if (Object.values(cleanedMemberData).length > 0) {
			updatedMember = await trx
				.updateTable("members")
				.set(cleanedMemberData)
				.where("member_id", "=", memberId)
				.returningAll()
				.executeTakeFirstOrThrow()
		}
		return
	})

	const updated = await db
		.selectFrom("members")
		.innerJoin("users", "members.member_id", "users.user_id")
		.where("members.member_id", "=", memberId)
		.selectAll()
		.executeTakeFirstOrThrow()

	return util.removePassword(updated)
}

export async function SearchMembersProfileFullName(
	firstName: string,
	lastName: string
): Promise<MemberDataResponse[]> {
	const fn = firstName.toUpperCase()
	const ln = lastName.toUpperCase()

	const members = await db
		.selectFrom("users")
		.innerJoin("members", "user_id", "member_id")
		.where((eb) =>
			eb.and([
				eb(sql<string>`upper(first_name)`, "like", "%" + fn + "%"),
				eb(sql<string>`upper(last_name)`, "like", "%" + ln + "%"),
			])
		)
		.where("type", "=", "Member")
		.selectAll()
		.execute()

	if (!members) {
		throw new Error("No member found")
	}

	return await Promise.all(members.map(util.removePassword))
}

export async function SearchMembersProfilePartName(
	Name: string
): Promise<MemberDataResponse[]> {
	Name = Name.toUpperCase()
	const members = await db
		.selectFrom("users")
		.innerJoin("members", "user_id", "member_id")
		.where((eb) =>
			eb.or([
				eb(sql<string>`UPPER(first_name)`, "like", "%" + Name + "%"),
				eb(sql<string>`UPPER(last_name)`, "like", "%" + Name + "%"),
			])
		)
		.where("type", "=", "Member")
		.selectAll()
		.execute()
	if (!members) {
		throw new Error("No members found")
	}

	return await Promise.all(members.map(util.removePassword))
}
