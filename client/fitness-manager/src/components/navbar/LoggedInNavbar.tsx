import { Button } from "../ui/button"
import { postData } from "@/utils/postData"
import { useNavigate } from "react-router-dom"

export default function LoggedInNavbar() {
	const navigate = useNavigate()

	// const handleLogout = async () => {
	// 	const data = await postData("/auth/logout", {})
	// 	if (data.success) {
	// 		navigate("/")
	// 	}
	// }

	return (
		<nav className="flex items-center justify-between p-4 text-white bg-gray-800">
			<div className="flex items-center space-x-4">
				<h1 className="text-2xl font-bold">Fitness Manager</h1>
			</div>
		</nav>
	)
}
