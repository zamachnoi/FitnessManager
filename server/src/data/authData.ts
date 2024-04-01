import { RegisterApiRequest } from "../models/io/authIo"

export default function createAccount(regDetails: RegisterApiRequest): any {
	const { username, password, first_name, last_name, type } = regDetails
	return {}
}
