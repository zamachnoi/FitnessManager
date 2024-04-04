import { Button } from "../ui/button"
import { postData } from "@/utils/postData"
import { useNavigate } from "react-router-dom"
import { Link } from "react-router-dom"

export default function LoggedInNavbar() {
	const navigate = useNavigate()

	const handleLogout = async () => {
		const data = await postData("auth/logout", {})
		if (data.success) {
			navigate("/")
		}
	}

	return (
		<nav className="flex items-center justify-between w-full p-4 text-white bg-gray-800">
			<h1 className="text-2xl font-bold">Fitness Manager</h1>
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
