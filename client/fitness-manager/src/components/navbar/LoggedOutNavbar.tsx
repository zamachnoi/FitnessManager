import { Dialog, DialogTrigger, DialogContent } from "../ui/dialog"
import { Button } from "../ui/button"
import LoginCard from "../login/LoginCard"
import { Link } from "react-router-dom"
export default function LoggedOutNavbar() {
	return (
		<nav className="flex items-center justify-between w-full p-4 text-white bg-gray-800">
			<div className="flex flex-row items-center justify-between w-full space-x-4">
				<h1 className="text-2xl font-bold">
					<Link to="/">Fitness Manager</Link>
				</h1>
				<Dialog>
					<DialogTrigger>
						<Button>Login</Button>
					</DialogTrigger>
					<DialogContent>
						<LoginCard />
					</DialogContent>
				</Dialog>
			</div>
		</nav>
	)
}
