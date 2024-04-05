import ClassManagerCard from "./classes/ClassManagerCard"
import PaymentsCard from "./payments/PaymentsCard"

export default function AdminDashboard() {
	return (
		<div>
			<ClassManagerCard />
			<PaymentsCard />
		</div>
	)
}
