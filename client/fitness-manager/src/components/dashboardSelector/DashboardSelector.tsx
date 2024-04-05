import MemberDashboard from "../memberDashboard/MemberDashboard"
import TrainerDashboard from "../trainerDashboard/TrainerDashboard"
import AdminDashboard from "../adminDashboard/AdminDashboard"
import { useUser } from "@/context/userContext"
type UserType = "Trainer" | "Member" | "Admin" | null | undefined

export default function DashboardSelector() {
	const user = useUser()
	let type: UserType = user.userType

	const dashboardComponents = {
		Trainer: <TrainerDashboard />,
		Member: <MemberDashboard />,
		Admin: <AdminDashboard />,
		null: <div>No valid user type provided</div>,
	}

	const selectedDashboard = type ? (
		dashboardComponents[type]
	) : (
		<div>No valid user type provided</div>
	)

	return selectedDashboard
}
