import DashboardCard from "@/components/util/DashboardCard"
import TrainerBooking from "./TrainerBooking"

type TrainerBookingsProps = {
	trainerBookings: {
		trainer_id: number
		first_name: string
		last_name: string
		rate: number
		booking_timestamp: Date
	}[]
}

export default function TrainerBookingsCard(props: TrainerBookingsProps) {
	return (
		<div className="w-fit">
			<DashboardCard
				title="Trainer Bookings"
				description="View all your trainer bookings here."
				footer={<div>Footer</div>}
			>
				<div>
					{props.trainerBookings.map((booking, index) => (
						<TrainerBooking {...booking} key={index} />
					))}
				</div>
			</DashboardCard>
		</div>
	)
}
