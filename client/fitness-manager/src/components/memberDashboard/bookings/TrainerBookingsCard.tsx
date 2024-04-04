import DashboardCard from "@/components/util/DashboardCard"
import TrainerBooking from "./TrainerBooking"
import BookingDialog from "./BookingDialog"

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
				footer={
					<BookingDialog />
				}
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
