import ClassManagerCard from "./classes/ClassManagerCard"
import PaymentsCard from "./payments/PaymentsCard"
import EquipmentCard from "./equipment/EquipmentCard"

export default function AdminDashboard() {
	return (
		<div>
			<ClassManagerCard />
			<PaymentsCard />
			<EquipmentCard />
		</div>
	)
}
