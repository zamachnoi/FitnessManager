import { Dialog, DialogTrigger, DialogContent } from "../ui/dialog"
import { Button } from "../ui/button"
import LoginCard from "../login/LoginCard"

export default function LoggedOutNavbar() {
	return (
		<nav className="flex items-center justify-between p-4 text-white bg-gray-800">
			<div className="flex items-center space-x-4">
				<h1 className="text-2xl font-bold">Fitness Manager</h1>
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
