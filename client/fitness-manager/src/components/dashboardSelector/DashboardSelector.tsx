import MemberDashboard from "../memberDashboard/MemberDashboard"
import TrainerDashboard from "../trainerDashboard/TrainerDashboard"
import AdminDashboard from "../adminDashboard/AdminDashboard"

type UserType = "Trainer" | "Member" | "Admin" | "none" | undefined

type DashboardSelectorProps = {
	type: UserType
}

export default function DashboardSelector({ type }: DashboardSelectorProps) {
	if (type === "none") {
		type = "Trainer"
	}

	const dashboardComponents = {
		Trainer: <TrainerDashboard />,
		Member: <MemberDashboard memberId={1} />,
		Admin: <AdminDashboard />,
		undefined: <div>No valid user type provided</div>,
	}

	const selectedDashboard = type ? (
		dashboardComponents[type]
	) : (
		<div>No valid user type provided</div>
	)

	return selectedDashboard
}
