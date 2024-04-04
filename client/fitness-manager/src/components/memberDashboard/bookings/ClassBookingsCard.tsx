import DashboardCard from "@/components/util/DashboardCard"
import ClassBooking from "./ClassBooking"
type ClassBookingsProps = {
	classBookings: {
		class_id: number
		class_name: string
		price: number
		first_name: string
		last_name: string
		room_number: number
		booking_timestamp: Date
	}[]
}

export default function ClassBookingsCard(props: ClassBookingsProps) {
	return (
		<div className="w-fit">
			<DashboardCard
				title="Class"
				description="View all your class bookings here."
				footer={<div>Footer</div>}
			>
				{props.classBookings.map((booking) => (
					<ClassBooking {...booking} key={booking.class_id} />
				))}
			</DashboardCard>
		</div>
	)
}
