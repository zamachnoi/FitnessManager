import {
	MemberArrayApiResponse,
	MemberApiResponse,
	MemberDataInsert,
} from "../models/io/memberIo"
import {
	getMemberById,
	getMemberByUsername,
	getAllMembers,
	createMember,
	updateMember,
	SearchMembersProfileFullName,
	SearchMembersProfilePartName
} from "../data/memberData"

export async function generateMemberByIdGetResponse(
	id: number
): Promise<MemberApiResponse> {
	try {
		const member = await getMemberById(id)
		let res: MemberApiResponse = {
			message: `success`,
			status: 200,
			data: member,
		}
		return res
	} catch (e) {
		return { message: "Could not find member", status: 404, data: null }
	}
}

export async function generateMemberByUsernameGetResponse(
	username: string
): Promise<MemberApiResponse> {
	try {
		const member = await getMemberByUsername(username)
		let res: MemberApiResponse = {
			message: `success`,
			status: 200,
			data: member,
		}
		return res
	} catch (e) {
		return { message: "Could not find member", status: 404, data: null }
	}
}

export async function generateAllMembersGetResponse(): Promise<MemberArrayApiResponse> {
	try {
		const members = await getAllMembers()
		let res: MemberArrayApiResponse = {
			message: `success`,
			status: 200,
			data: members,
		}
		return res
	} catch (e) {
		return { message: "Could not find members", status: 404, data: [] }
	}
}

export async function generateMemberPostResponse(
	member: MemberDataInsert
): Promise<MemberApiResponse> {
	try {
		const newMember = await createMember(member)
		let res: MemberApiResponse = {
			message: `success`,
			status: 200,
			data: newMember,
		}
		return res
	} catch (e) {
		return { message: "Could not create member", status: 404, data: null }
	}
}

export async function generateMemberPatchResponse(
	memberId: number,
	member: MemberDataInsert
) {
	try {
		const updatedMember = await updateMember(memberId, member)
		let res: MemberApiResponse = {
			message: `success`,
			status: 200,
			data: updatedMember,
		}
		return res
	} catch (e) {
		return { message: "Could not update member", status: 404, data: null }
	}
}

export async function generateSearchMembersProfileFullNameGetResponse(
	firstName: string,
	lastName: string
): Promise<MemberArrayApiResponse> {
	try {
		const member = await SearchMembersProfileFullName(firstName,lastName)
		let res: MemberArrayApiResponse = {
			message: `success`,
			status: 200,
			data: member,
		}
		return res
	} catch (e) {
		return { message: "Could not find member", status: 404, data: null }
	}
}

export async function generateSearchMembersProfilePartNameGetResponse(
	Name: string
): Promise<MemberArrayApiResponse> {
	try {
		const member = await SearchMembersProfilePartName(Name)
		let res: MemberArrayApiResponse = {
			message: `success`,
			status: 200,
			data: member,
		}
		return res
	} catch (e) {
		return { message: "Could not find member", status: 404, data: null }
	}
}