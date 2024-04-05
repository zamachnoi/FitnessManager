import { Button } from "../ui/button"
import { postData } from "@/utils/postData"
import { useNavigate } from "react-router-dom"
import { Link } from "react-router-dom"
import { useUser } from "@/context/userContext"
export default function LoggedInNavbar() {
	const navigate = useNavigate()
	const user = useUser()

	const handleLogout = async () => {
		const data = await postData("auth/logout", {})
		if (data.status === 200) {
			user.setUserId(null)
			user.setUserType(null)
			navigate("/")
		}
	}

	return (
		<nav className="flex items-center justify-between w-full p-4 text-white bg-gray-800">
			<h1 className="text-2xl font-bold">
				<Link to="/">Fitness Manager</Link>
			</h1>
			<ul className="flex flex-row items-center justify-around gap-4">
				<li>
					<Link to="/dashboard">Dashboard</Link>
				</li>
				<li>
					<Button
						className="hover:text-slate-900 hover:bg-white"
						onClick={handleLogout}
					>
						Logout
					</Button>
				</li>
			</ul>
		</nav>
	)
}
