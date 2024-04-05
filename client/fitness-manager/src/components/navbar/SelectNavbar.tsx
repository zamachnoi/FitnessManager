import LoggedInNavbar from "./LoggedInNavbar"
import { useUser } from "@/context/userContext"
import LoggedOutNavbar from "./LoggedOutNavbar"
export default function Navbar() {
	const user = useUser()
	const type = user.userType
	const loggedIn = type !== null
	return <div>{loggedIn ? <LoggedInNavbar /> : <LoggedOutNavbar />}</div>
}
