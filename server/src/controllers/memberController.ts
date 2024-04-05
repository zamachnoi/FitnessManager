import {
	MemberArrayApiResponse,
	MemberApiResponse,
	MemberDataUpdate,
	MemberDataCreate,
	MemberDataCreateRequest,
	MemberDataUpdateRequest,
} from "../models/io/memberIo"
import {
	getMemberById,
	getMemberByUsername,
	getAllMembers,
	createMember,
	updateMember,
	SearchMembersProfileFullName,
	SearchMembersProfilePartName,
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
	member: MemberDataCreateRequest
): Promise<MemberApiResponse> {
	try {
		const newMember = await createMember(
			transformMemberCreateRequest(member)
		)

		let res: MemberApiResponse = {
			message: `success`,
			status: 200,
			data: newMember,
		}
		return res
	} catch (e) {
		console.log(e)
		return { message: "Could not create member", status: 404, data: null }
	}
}

export async function generateMemberPatchResponse(
	memberId: number,
	memberRequest: MemberDataUpdateRequest
) {
	try {
		const memberUpdate = transformUpdateRequest(memberRequest)
		const updatedMember = await updateMember(memberId, memberUpdate)

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
	console.log(firstName, lastName)
	try {
		const member = await SearchMembersProfileFullName(firstName, lastName)
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
function transformMemberCreateRequest(
	member: MemberDataCreateRequest
): MemberDataCreate {
	return {
		userData: {
			username: member.username,
			password: member.password,
			first_name: member.first_name,
			last_name: member.last_name,
			type: "Member",
		},
		memberData: {
			weight: member.weight,
		},
	}
}

function transformUpdateRequest(
	member: MemberDataUpdateRequest
): MemberDataUpdate {
	return {
		memberData: {
			weight: member.weight,
		},
		userData: {
			first_name: member.first_name,
			last_name: member.last_name,
			username: member.username,
			password: member.password,
		},
	}
}
