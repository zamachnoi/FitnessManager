import MemberDashboard from "../memberDashboard/MemberDashboard"
import TrainerDashboard from "../trainerDashboard/TrainerDashboard"
import AdminDashboard from "../adminDashboard/AdminDashboard"

type UserType = "Trainer" | "Member" | "Admin"

export default function DashboardSelector() {
	const userType: UserType = "Member" // Change this based on the logged in user type

	const dashboardComponents = {
		Trainer: <TrainerDashboard />,
		Member: <MemberDashboard memberId={1} />,
		Admin: <AdminDashboard />,
	}

	return (
		dashboardComponents[userType] || <div>No valid user type provided</div>
	)
}
